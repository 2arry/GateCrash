module gatecrash_backend::kiosk_helper {
    use sui::kiosk;
    use sui::transfer;
    use sui::tx_context;

    public fun create_and_transfer_kiosk(ctx: &mut tx_context::TxContext) {
        let (kiosk, cap) = kiosk::new(ctx);
        transfer::public_transfer(kiosk, tx_context::sender(ctx));
        transfer::public_transfer(cap, tx_context::sender(ctx));
    }
}
