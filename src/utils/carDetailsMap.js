
const mapCarDetails = async(carsData) => {
    const mapedCarData = carsData.map((car) => {
        //console.log(car)

        return {

            title: car.title,
            lot_id: car.lot_id,
            vin: car.vin,
            status: car.status,
            location: car.location,
            base_site:car.base_site,
            auction_date:car.auction_date,
            vehicle_type:car.vehicle_type,
            color: car.color,
            odometer: car.odometer,
            engine: car.engine,
            damage: car.damage_pr + "/" + car.damage_sec,
            auction_date: car.auction_date,
            vehicle_type: car.vehicle_type,
            body_type: car.body_type,
            make: car.make,
            image:  car.link_img_hd ? 
                    car.link_img_hd.length > 0 ? 
                    car.link_img_hd[0] : 
                    car.link_img_small ? 
                    car.link_img_small.length > 0 ? 
                    car.link_img_small[0] 
                    : null : null : null,

            images: car.link_img_small ? 
                    car.link_img_small.length > 0 ? 
                    car.link_img_small : 
                    car.link_img_hd || null 
                    : car.link_img_hd || null,

            sale_history:   car.sale_history ?
                            car.sale_history : 
                            null,

            currentBid: car.currentBid ?
                        car.currentBid :
                        null,

            noOfBids: car.noOfBids ?
                      car.noOfBids :
                      null  


        }
        
    })

    return mapedCarData
}

module.exports = {
    mapCarDetails
}
