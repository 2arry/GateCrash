module gatecrash_backend::ticket {

    use sui::object::{UID, new};
    use sui::tx_context::TxContext;
    use sui::transfer;
    use sui::event;

    /// Ticket struct — stored as an NFT object on-chain
    public struct Ticket has key, store {
        id: UID,
        event_name: vector<u8>,
        used: bool,
    }

    /// Event to log ticket usage
    public struct TicketUsedEvent has copy, drop, store {
        event_name: vector<u8>,
    }

    /// Mint a new ticket and transfer it to a recipient's wallet
    public fun mint_ticket(recipient: address, event_name: vector<u8>, ctx: &mut TxContext) {
        let ticket = Ticket {
            id: new(ctx),
            event_name,
            used: false,
        };
        transfer::transfer(ticket, recipient);
    }

    /// Use the ticket — marks as used and emits event
    public fun use_ticket(ticket: &mut Ticket) {
        assert!(!ticket.used, 0);
        ticket.used = true;
        event::emit(TicketUsedEvent {
            event_name: ticket.event_name,
        });
    }

    /// Return whether a ticket has been used (can be queried by UI/API)
    public fun is_used(ticket: &Ticket): bool {
        ticket.used
    }

    /// Return event name of ticket
    public fun get_event_name(ticket: &Ticket): vector<u8> {
        ticket.event_name
    }
}
