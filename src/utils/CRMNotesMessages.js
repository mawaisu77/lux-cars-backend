const bidExpirationNoteBidCar = async (userName, lot_id, bidPrice, date, bidCar) => {

    const noteData = {
        body: `**USER BID EXPIRED** \n${userName}'s bid is expired on the lot:${lot_id}, the bid was made for ${bidPrice}$ on ${date}
        
    Car Details: 
        Make: ${bidCar.make}
        Model: ${bidCar.model}
        Year: ${bidCar.year}
        Mileage: ${bidCar.mileage}
        Transmission: ${bidCar.transmission}
        Engine: ${bidCar.engine}
        Fuel Type: ${bidCar.fuel}
        Body Type: ${bidCar.body_type}
        Color: ${bidCar.color}
        Auction Date: ${bidCar.auction_date}
        Current Bid: ${bidCar.currentBid}$
        Number of Bids: ${bidCar.noOfBids}
        Link: ${bidCar.link},
        LuxCars Webiste Link: ${process.env.LUXCARS_BASE_URL}/vehicle-detail/${lot_id}
        `
    }

    return noteData

}

const auctionWinsNoteBidCar = async (userName, lot_id, bidPrice, date, bidCar) => {

    const noteData = {
        body: `**USER WINS AUCTION** \n${userName} has won the auction on the lot:${lot_id}, the bid was made for ${bidPrice}$ on ${date}
        
    Car Details: 
        Make: ${bidCar.make}
        Model: ${bidCar.model}
        Year: ${bidCar.year}
        Mileage: ${bidCar.mileage}
        Transmission: ${bidCar.transmission}
        Engine: ${bidCar.engine}
        Fuel Type: ${bidCar.fuel}
        Body Type: ${bidCar.body_type}
        Color: ${bidCar.color}
        Auction Date: ${bidCar.auction_date}
        Current Bid: ${bidCar.currentBid}$
        Number of Bids: ${bidCar.noOfBids}
        Link: ${bidCar.link},
        LuxCars Webiste Link: ${process.env.LUXCARS_BASE_URL}/vehicle-detail/${lot_id}
        `
    }

    return noteData
    
}

const bidExpirationNoteLocalCar = async (userName, bidPrice, date, localCar) => {

    const noteData = {
        body: `**USER BID EXPIRED** \n${userName}'s bid is expired, the bid was made for ${bidPrice}$ on ${date}
        
    Car Details: 
        VIN: ${localCar.vin}
        Year: ${localCar.year}
        Make: ${localCar.make}
        Model: ${localCar.model}
        Transmission: ${localCar.transmission}
        Mileage: ${localCar.mileage}
        Description: ${localCar.description}
        Modification: ${localCar.modification}
        SignificantFlaws: ${localCar.significantFlaws},
        CarLocation: ${localCar.carLocation},
        CarState: ${localCar.carState},
        Zip: ${localCar.zip},
        CarForSaleAT: ${localCar.isCarForSale},
        CarTitledAt: ${localCar.carTitledAt},
        CarTitledInfo: ${localCar.carTitledInfo},
        MinPrice: ${localCar.minPrice},
        TitlesStatus: ${localCar.titlesStatus},
        Referral: ${localCar.referral},
        Status: ${localCar.status},
        Auction Date: ${localCar.auction_date}
        Current Bid: ${localCar.currentBid}$
        Number of Bids: ${localCar.noOfBids}
        LuxCars Webiste Link: ${process.env.LUXCARS_BASE_URL}/local-vehicle-detail/${localCar.id}
        `
    }

    return noteData

}

const auctionWinsNoteLocalCar = async (userName, bidPrice, date, localCar) => {

    const noteData = {
        body: `**USER AUCTION WON** \n${userName} has won the auction, the bid was made for ${bidPrice}$ on ${date}
        
    Car Details: 
        VIN: ${localCar.vin}
        Year: ${localCar.year}
        Make: ${localCar.make}
        Model: ${localCar.model}
        Transmission: ${localCar.transmission}
        Mileage: ${localCar.mileage}
        Description: ${localCar.description}
        Modification: ${localCar.modification}
        SignificantFlaws: ${localCar.significantFlaws},
        CarLocation: ${localCar.carLocation},
        CarState: ${localCar.carState},
        Zip: ${localCar.zip},
        CarForSaleAT: ${localCar.isCarForSale},
        CarTitledAt: ${localCar.carTitledAt},
        CarTitledInfo: ${localCar.carTitledInfo},
        MinPrice: ${localCar.minPrice},
        TitlesStatus: ${localCar.titlesStatus},
        Referral: ${localCar.referral},
        Status: ${localCar.status},
        Auction Date: ${localCar.auction_date}
        Current Bid: ${localCar.currentBid}$
        Number of Bids: ${localCar.noOfBids}
        LuxCars Webiste Link: ${process.env.LUXCARS_BASE_URL}/local-vehicle-detail/${localCar.id}
        `
    }

    return noteData
    
}


const refundRequestNote = async (userName, refundAmount, date) => {

    const noteData = {
        body: `**REFUND REQUEST** \n${userName} has requested a refund of ${refundAmount}$ on ${date}`
    }

    return noteData
}


module.exports = {
    bidExpirationNoteBidCar,
    auctionWinsNoteBidCar,
    bidExpirationNoteLocalCar,
    refundRequestNote,
    auctionWinsNoteLocalCar,
}