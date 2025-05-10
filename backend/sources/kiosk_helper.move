////////////////////////
// kiosk_helper.move — helper utilities for Sui Kiosk
////////////////////////

module gatecrash_backend::kiosk_helper {
    use sui::kiosk::{Kiosk, KioskOwnerCap};
    use sui::kiosk;                    // full module for functions
    use sui::object;
    use sui::transfer;
    use sui::tx_context;
    use std::vector;

    /*------------------------------------------------------------------*/
    /* 1. Create a kiosk and transfer both objects to the caller        */
    /*------------------------------------------------------------------*/
    public fun create_and_transfer_kiosk(ctx: &mut tx_context::TxContext) {
        let (k, cap) = kiosk::new(ctx);
        transfer::public_transfer(k,  tx_context::sender(ctx));
        transfer::public_transfer(cap, tx_context::sender(ctx));
    }

    /*------------------------------------------------------------------*/
    /* 2. Place an NFT into the kiosk and list it at a fixed `price`    */
    /*------------------------------------------------------------------*/
    public fun kiosk_place_and_list<T: key + store>(
        kiosk_obj: &mut Kiosk,
        cap:       &KioskOwnerCap,
        item:      T,
        price:     u64,
    ) {
        let id = object::id(&item);
        kiosk::place<T>(kiosk_obj, cap, item);
        kiosk::list<T>(kiosk_obj, cap, id, price);
    }

    /*------------------------------------------------------------------*/
    /* 3. Withdraw (cancel a listing)                                   */
    /*------------------------------------------------------------------*/
    public fun withdraw_item<T: key + store>(
        kiosk_obj: &mut Kiosk,
        cap:       &KioskOwnerCap,
        id:        object::ID,
        ctx:       &mut tx_context::TxContext,
    ) {
        let obj: T = kiosk::take<T>(kiosk_obj, cap, id);
        transfer::public_transfer(obj, tx_context::sender(ctx));
    }

    /*------------------------------------------------------------------*/
    /* 4. Bundle `tickets` and list each of them at `price`             */
    /*------------------------------------------------------------------*/
    public fun bundle_and_list<T: key + store>(
        mut tickets: vector<T>,
        kiosk_obj:   &mut Kiosk,
        cap:         &KioskOwnerCap,
        price:       u64,
    ) {
        let mut i = 0u64;
        let len = vector::length(&tickets);
        while (i < len) {
            let t = vector::pop_back(&mut tickets);
            let id = object::id(&t);
            kiosk::place<T>(kiosk_obj, cap, t);
            kiosk::list<T>(kiosk_obj, cap, id, price);
            i = i + 1;
        };
        // Consume the now‑empty vector so that no value lacking the
        // `drop` ability is left at the end of the function.
        vector::destroy_empty<T>(tickets);
    }
}
