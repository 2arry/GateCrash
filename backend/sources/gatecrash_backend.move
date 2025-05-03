module gatecrash_backend::ticket {
    use sui::object::{UID, ID, new};
    use sui::tx_context::TxContext;
    use sui::transfer;

    /// NFT struct with metadata that references image by ID
    public struct NFT has key, store {
        id: UID,
        name: vector<u8>,
        description: vector<u8>,
        image_id: ID,
    }

    /// Mint an NFT that references an on-chain stored image by object ID
    public fun mint_ticket(
        recipient: address,
        name: vector<u8>,
        description: vector<u8>,
        image_id: ID,
        ctx: &mut TxContext
    ) {
        let nft = NFT {
            id: new(ctx),
            name,
            description,
            image_id,
        };
        transfer::public_transfer(nft, recipient);
    }
}

module gatecrash_backend::assets {
    use sui::object::{UID, ID, new, id};
    use sui::tx_context::TxContext;

    /// Stores full image data (e.g. base64 or raw PNG) as a standalone object
    public struct TicketImage has key, store {
        id: UID,
        data: vector<u8>,
    }

    /// Create and return a new TicketImage object on-chain
    public fun store_image(data: vector<u8>, ctx: &mut TxContext): TicketImage {
        TicketImage {
            id: new(ctx),
            data,
        }
    }

    /// Get the object ID of the TicketImage object
    public fun get_image_id(image: &TicketImage): ID {
        id(image)
    }
}
