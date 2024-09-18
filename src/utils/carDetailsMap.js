
const mapCarDetails = async(carsData) => {
    console.log(carsData)
    const mapedCarData = carsData.map((car) => {
        return {

            title: car.title,
            lot_id: car.lot_id,
            vin: car.vin,
            status: car.status,
            location: car.location,
            base_site:car.base_site,
            auction_date:car.auction_date,
            vehicle_type:car.vehicle_type,
            image: car.link_img_hd[0] || car.link_img_small[0] || null,

            images: car.link_img_small ? 
                        car.link_img_small.length > 0 ? 
                        car.link_img_small : 
                        car.link_img_hd || null 
                    : car.link_img_hd || null,

            sale_history:   car.sale_history ?
                            car.sale_history : 
                            null

        }
        
    })

    return mapedCarData
}

module.exports = {
    mapCarDetails
}
