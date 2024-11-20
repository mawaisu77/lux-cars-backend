const { Router } = require("express");
const {
    getAllOrdersOfUser
} = require("../controllers/order.controller");
const { isAuthenticatedUser } = require("../middlewares/auth");
const router = Router();


router.get("/orders/get-user-all-orders", isAuthenticatedUser, getAllOrdersOfUser);



module.exports = router;
