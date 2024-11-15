const bidExpiration = async (lot_id) => {
    return {
        message: `Your bid on car of lot_Id:${lot_id} has been expired, Someone else has outbid you with a higher bid! Thanks`,
        link: `vehicle-detail/${lot_id}`
    }
}

const bidPlacement = async (bid_price, lot_id) => {
    return {
        message: `You have successfully place a bid of price:${bid_price} on lot_Id:${lot_id}`,
        link: `vehicle-detail/${lot_id}`
    }
}

const bidOnCar = (bid_price, lot_id) => {
    return {
        message: `A new bid has been place on this Car of lot_id: ${lot_id}!`,
        bid_price: bid_price
    }
}

const newBidder = (bidder_name, lot_id) => {
    return {
        message: `A new bidder ${bidder_name} has joined the auction for lot_Id:${lot_id}`,
        lot_id: lot_id
    }
}

const bidUpdate = (bid_price, lot_id) => {
    return {
        message: `The current bid for lot_Id:${lot_id} has been updated to ${bid_price}`,
        lot_id: lot_id
    }
}

const auctionStart = (lot_id) => {
    return {
        message: `The auction for lot_Id:${lot_id} has started`,
        lot_id: lot_id
    }
}

const auctionEnd = (lot_id) => {
    return {
        message: `The auction for lot_Id:${lot_id} has ended`,
        lot_id: lot_id
    }
}

const winnerAnnouncement = (winner_name, lot_id) => {
    return {
        message: `The winner of the auction for lot_Id:${lot_id} is ${winner_name}`,
        lot_id: lot_id
    }
}

const bidRemoval = (lot_id) => {
    return {
        message: `A bid has been removed from the auction for lot_Id:${lot_id}`,
        lot_id: lot_id
    }
}

const auctionPause = (lot_id) => {
    return {
        message: `The auction for lot_Id:${lot_id} has been paused`,
        lot_id: lot_id
    }
}

const auctionResume = (lot_id) => {
    return {
        message: `The auction for lot_Id:${lot_id} has been resumed`,
        lot_id: lot_id
    }
}

const bidExtension = (lot_id) => {
    return {
        message: `The auction for lot_Id:${lot_id} has been extended`,
        lot_id: lot_id
    }
}

const bidWithdrawal = (bidder_name, lot_id) => {
    return {
        message: `Bidder ${bidder_name} has withdrawn their bid from the auction for lot_Id:${lot_id}`,
        lot_id: lot_id
    }
}

const auctionCancellation = (lot_id) => {
    return {
        message: `The auction for lot_Id:${lot_id} has been cancelled`,
        lot_id: lot_id
    }
}

const systemMaintenance = () => {
    return {
        message: `The system is undergoing maintenance. Please try again later.`,
    }
}

const newMessage = (message, sender_name) => {
    return {
        message: `New message from ${sender_name}: ${message}`,
    }
}

const newFollower = (follower_name) => {
    return {
        message: `${follower_name} is now following you`,
    }
}

const newLike = (liker_name, lot_id) => {
    return {
        message: `${liker_name} has liked your lot ${lot_id}`,
        lot_id: lot_id
    }
}






module.exports = {
    bidExpiration,
    bidPlacement
}
