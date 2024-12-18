const ApiError = require("../utils/ApiError");
const sendEmail = require("../utils/sendMail");
const orderRepository = require("../repositories/order.repository");
const bidRepository = require("../repositories/bids.repository");
const authRepository = require("../repositories/auth.repository");
const bidService = require("../services/bids.service");
const bidCarsService = require("../services/bidCars.service");
const bidCarsRepository = require("../repositories/bidCars.repository")
const CRMService = require("../services/crm.service.js")


const generateOrderByAdmin = async (bidID) => {
  const order = await orderRepository.findOrderByBidId(bidID);

  const bid = await bidRepository.findUserByBidId(bidID);
  const userId = bid.userID;

  const user = await authRepository.findUserById(userId);
  const userName = user.username;
  const email = user.email;

  const status = "Pending";

  const orderData = {
    bidID,
    status,
  };

  if (!order) {
    await orderRepository.createOrder(orderData);

    const message = `Hello ${userName},\n\nWe are Pleasure to announce that you won the highest bid. So, your order has been processed. If you have any query please contact`;

    await sendEmail(
      {
        email,
        subject: "LUX CARS Bid Information",
        message,
      },
      "text"
    );

    // CRM Note in User Contact in the CRM will be created on 
    // Order creation to further procceed the Order in the CRM
    let note
    const type = "AuctionWon"
    try{
        note = await CRMService.createUserCRMContactNotes(userId, bid.lot_id, bid.createdAt, bid.bidPrice, type)
    }catch(error){
        console.log(error.response)
    }

    return;
  } else {
    throw new ApiError(404, "Order Already Exist exist!");
  }
};

const getAllOrdersByAdmin = async () => {
  const order = await orderRepository.findOrders();
  const bidsOnCarData = await Promise.all(
    order.map(async (order) => {
      const bidId = order.bidID;
      const user = await bidService.getUserByBidIdByAdmin(bidId);
      const bid = await bidService.getBidsByBidId(bidId);

      const lot_id = bid.lot_id;

      const car = await bidCarsService.getCarDetailsByLotID(lot_id);
      const carParsedData = JSON.parse(car.carDetails);

      const CarData = {
        lot_id: carParsedData.lot_id,
        title: carParsedData.title,
        currentBid: car.currentBid,
        noOfBids: car.noOfBids,
      };

      return {
        order: order,
        user: { userID: user.id, username: user.username, email: user.email},
        car: CarData,
      };
    })
  );

  if (!bidsOnCarData) {
    throw new ApiError(404, "No Orders found");
  } else {
    return bidsOnCarData;
  }
};

const changeOrderStatus = async (orderID, status) => {

    let order = await orderRepository.findOrderById(orderID);
    if (!order) throw new ApiError(404, "Order not found");

    const bidId = order.bidID;
    const user = await bidService.getUserByBidIdByAdmin(bidId);
    if (!user) throw new ApiError(404, "User not found for bid");

    const userName = user.username;
    const bid = await bidRepository.findUserByBidId(bidId);
    if (!bid) throw new ApiError(404, "Bid not found");

    const lot_id = bid.lot_id;
    const car = await bidCarsService.getCarDetailsByLotID(lot_id);
    if (!car) throw new ApiError(404, "Car details not found");

    const carParsedData = JSON.parse(car.carDetails);
    if (carParsedData === null) throw new ApiError(400, "Error parsing car details");

    const carData = {
      lot_id: carParsedData.lot_id,
      title: carParsedData.title,
      currentBid: car.currentBid,
    };


    order.status = status;
    const newStatus = await order.save();

    const message = `Hello ${userName},\n\nIt is to inform you that your order status for the car with below details has been updated to ${status}. \n\nOrder Details:\n\tCar Title: ${carData.title}\n\tCar Lot_ID: ${carData.lot_id}\n\tOrder Price: ${carData.currentBid}\n\nKindly Contact us for any further queries, Thanks`;

    await sendEmail(
        {
          email: user.email,
          subject: "LUX CARS Order Status",
          message,
        },
        "text"
    );
    
    if (!newStatus) {
        throw new ApiError(404, "Order Status not Updated Successfully");
    } else {
        return newStatus;
    }


};

const getOrderByID = async (req) => {

    const { orderID } = req.query
    if(!orderID) throw new ApiError(401, "Order ID required!")
    const order = await orderRepository.findOrderById(orderID);
    if(!order) throw new ApiError(401, "No Order found against the provided ID")

    const bidID = order.bidID
    const bid = await bidRepository.findUserByBidId(bidID)
    if(!bid) throw new ApiError(401, "No bid found against BidID")
    
    const userID = bid.userID
    if (!userID) throw new ApiError(401, "No UserID Found")
    const user = await authRepository.findUserById(userID)
    if(!user) throw new ApiError(401, "No User Found")
    
    const lot_id = bid.lot_id
    var bidCar = await bidCarsRepository.getBidCarByLotID(lot_id)
    if(!bidCar) throw new ApiError(401, "No BidCar Found")
    // converting the JSON carDetails to String
    bidCar.carDetails = await JSON.parse(bidCar.carDetails)
    // getting the current bid and the number of bids
    const currentBid = bidCar.currentBid
    const noOfBids = bidCar.noOfBids
    // returning the car and the current bid and the number of bids
    bidCar =  {...bidCar.carDetails, currentBid, noOfBids}


    return {
      user,
      order,
      bid,
      bidCar
    }
}

const getAllOrdersOfUser = async (userID) => {
    const orders = await orderRepository.findOrders();
    var detailedOrders = await Promise.all(orders.map(async (order) => {
        const bid = await bidRepository.findUserByBidId(order.bidID);
        if(userID === bid.userID){
            const user = await authRepository.findUserById(bid.userID);
            var bidCar = await bidCarsRepository.getBidCarByLotID(bid.lot_id);
                // converting the JSON carDetails to String
            bidCar.carDetails = await JSON.parse(bidCar.carDetails)
            // getting the current bid and the number of bids
            const currentBid = bidCar.currentBid
            const noOfBids = bidCar.noOfBids
            // returning the car and the current bid and the number of bids
            bidCar =  {...bidCar.carDetails, currentBid, noOfBids}

            return {
                title: bidCar.title,
                lot_id: bidCar.lot_id,
                image: bidCar.link_img_hd[0] ? bidCar.link_img_hd[0]:
                      bidCar.link_img_small[0] ? bidCar.link_img_small[0] : null,
                orderStatus: order.status,
                orderPrice: bid.bidPrice,
                placedAt: order.createdAt,
                locationFrom: bidCar.location,
                locationTo: user.address || "To be Decided!"
            };
        }else {
          return null
        }

    }));

    detailedOrders = detailedOrders.filter(order => order !== null);
    return detailedOrders
}



module.exports = {
  generateOrderByAdmin,
  getAllOrdersByAdmin,
  changeOrderStatus,
  getOrderByID,
  getAllOrdersOfUser
};
