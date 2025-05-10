////////////////////////
// gatecrash_backend.move — 2024.beta‑edition
////////////////////////

module gatecrash_backend::ticket {
    /*-----------------------------------------------------------------
      Imports — only what we *really* use (the compiler pre‑loads many
      core modules already).
    -----------------------------------------------------------------*/
    use sui::coin;                                 // coin helpers
    use sui::coin::Coin;
    use sui::transfer;                             // public_transfer
    use sui::dynamic_field as df;                  // dynamic‑field helpers
    use sui::tx_context::TxContext;
    use sui::object;                               // object::new / UID

    use std::string::{String, utf8};               // utf8 literal helper
    use std::vector;                               // vector helpers
    use sui::sui::SUI;                             // base‑coin type

    /*---------------------------------------------------------------*/
    /* Constants                                                     */
    /*---------------------------------------------------------------*/
    /// Treasury address that receives mint‑fees
    const TREASURY: address =
        @0xa56147ac80c76571f19a2a4df1f3242b873ad98fd9d5aae986a4208adeccac93;

    /*---------------------------------------------------------------*/
    /* Ticket (NFT) definition                                       */
    /*---------------------------------------------------------------*/
    public struct NFT has key, store {
        id:            object::UID,
        name:          String,
        description:   String,
        image_url:     String,
        /// Event UNIX‑timestamp (seconds); 0 = never expires
        event_ts:      u64,
        /// true → may be resold once
        enable_resell: bool,
    }

    /// Zero‑sized key used for the display dynamic‑field
    public struct DisplayKey has copy, drop, store {}

    /// Human‑readable metadata
    public struct DisplayField has copy, drop, store {
        key:   String,
        value: String,
    }

    /*---------------------------------------------------------------*/
    /* Error codes                                                   */
    /*---------------------------------------------------------------*/
    const EDisplayMissing: u64 = 0;
    const EResellDisabled: u64 = 1;
    const EAlreadyResold:  u64 = 2;
    const EExpiredTicket:  u64 = 3;
    const EWrongFee:       u64 = 4;

    /*---------------------------------------------------------------*/
    /* PUBLIC API                                                    */
    /*---------------------------------------------------------------*/

    /// Mint `num_tickets` identical NFTs and either return them to the
    /// caller (to be placed in a kiosk) or transfer directly to
    /// `recipient`. A mint fee of `10 × gas_budget` SUI is paid from
    /// `fee_coin` to the project treasury; any remainder is returned to
    /// `recipient`.
    public fun mint_event_tickets(
        recipient:      address,
        name:           String,
        description:    String,
        image_url:      String,
        event_ts:       u64,
        num_tickets:    u64,
        enable_resell:  bool,
        enable_kiosk:   bool,
        gas_budget:     u64,
        mut fee_coin:   Coin<SUI>,
        ctx:            &mut TxContext,
    ): vector<NFT> {
        /* ---------- 0. charge the mint fee ---------------------- */
        let mint_fee = gas_budget * 10;
        assert!(coin::value(&fee_coin) >= mint_fee, EWrongFee);

        // `split` returns a new coin holding `mint_fee` SUI.
        let fee_part = coin::split(&mut fee_coin, mint_fee, ctx);
        // Send the actual fee to the treasury and the remaining balance
        // (if any) back to the recipient.
        transfer::public_transfer(fee_part, TREASURY);
        transfer::public_transfer(fee_coin,  recipient);

        /* ---------- 1. mint the NFTs ---------------------------- */
        if (num_tickets == 0) {
            return vector::empty<NFT>()
        };

        let mut tickets = vector::empty<NFT>();
        let mut i = 0u64;
        while (i < num_tickets) {
            let mut nft = NFT {
                id:            object::new(ctx),
                name:          copy name,
                description:   copy description,
                image_url:     copy image_url,
                event_ts,
                enable_resell,
            };
            add_display(&mut nft);
            vector::push_back(&mut tickets, nft);
            i = i + 1;
        };

        /* ---------- 2. deliver ---------------------------------- */
        if (!enable_kiosk) {
            let mut j = 0u64;
            let total = vector::length(&tickets);
            while (j < total) {
                let t = vector::pop_back(&mut tickets);
                transfer::public_transfer(t, recipient);
                j = j + 1;
            };
        };

        tickets
    }

    /// Check if an NFT is already expired with respect to `now_sec`.
    public fun is_expired(nft: &NFT, now_sec: u64): bool {
        nft.event_ts != 0 && now_sec >= nft.event_ts
    }

    /// Guard used by a custom `TransferPolicy` (external) that wants to
    /// allow a *single* resale. The caller supplies the current
    /// timestamp to avoid relying on `clock` helpers that may vary
    /// between Sui versions.
    public fun validate_resell(
        nft:    &NFT,
        resold: bool,
        now_sec: u64,
    ) {
        assert!(nft.enable_resell, EResellDisabled);
        assert!(!resold,           EAlreadyResold);
        assert!(!is_expired(nft, now_sec), EExpiredTicket);
    }

    /*--------------------------------------------------------------*/
    /* INTERNAL HELPERS                                             */
    /*--------------------------------------------------------------*/
    fun add_display(nft: &mut NFT) {
        let v = build_display(nft);
        df::add<DisplayKey, vector<DisplayField>>(&mut nft.id, DisplayKey {}, v);
    }

    fun build_display(nft: &NFT): vector<DisplayField> {
        let mut v = vector::empty<DisplayField>();
        vector::push_back(
            &mut v,
            DisplayField { key: utf8(b"name"),        value: copy nft.name },
        );
        vector::push_back(
            &mut v,
            DisplayField { key: utf8(b"description"), value: copy nft.description },
        );
        vector::push_back(
            &mut v,
            DisplayField { key: utf8(b"image_url"),   value: copy nft.image_url },
        );
        v
    }

    public fun has_display(nft: &NFT): bool {
        df::exists_<DisplayKey>(&nft.id, DisplayKey {})
    }

    public fun borrow_display(nft: &NFT): &vector<DisplayField> {
        assert!(has_display(nft), EDisplayMissing);
        df::borrow<DisplayKey, vector<DisplayField>>(&nft.id, DisplayKey {})
    }
}
