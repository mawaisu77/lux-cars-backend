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
        Fuel Type: ${bidCar.fuel_type}
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
        Fuel Type: ${bidCar.fuel_type}
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


module.exports = {
    bidExpirationNoteBidCar,
    auctionWinsNoteBidCar
}