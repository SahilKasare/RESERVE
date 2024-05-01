const express = require("express");
const { nanoid } = require("nanoid");
const router = express.Router();
const { verifyToken } = require("../middleware/auth.js");
const User = require("../models/User.js");
const Manager = require("../models/Manager.js");
const jwt = require("jsonwebtoken");
const path = require("path");
const upload = require("./multer.js");
const { decode } = require("punycode");
const { getusers } = require("../middleware/User");
const user = require("../controllers/User");
const { addmoney } = require("../controllers/User.js");
const { userLogout } = require("../controllers/auth.js");
const TransactionModel = require("../models/Transaction.js");
const BookingsModel = require("../models/Booking.js");

router.get("/profile", verifyToken, getusers, async (req, res) => {
  req.session.destroy(function (err) {
    if (err) throw err;
    console.log("Session completed successfully");
  });
  res.render("user_service", { user: req.user });
});

router.post(
  "/fileupload",
  verifyToken,
  upload.single("image"),
  async function (req, res) {
    const token = req.cookies.authorization;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userobj = await User.findById(decoded.id).select("-password");
    if (!userobj) {
      return res.status(404).json({ error: "User not found" });
    }
    userobj.profile_pic = req.file.filename;
    await userobj.save();
    res.redirect("/users/profile");
  }
);

router.get("/user_park", verifyToken, getusers, async function (req, res) {
  res.render("user_parking", { user: req.user });
});

router.get(
  "/user_current_bookings",
  verifyToken,
  getusers,
  async function (req, res) {
    res.render("user_current-bookings", { user: req.user });
  }
);

router.get("/user_wallet", verifyToken, getusers, async function (req, res) {
  res.render("user_wallet", { user: req.user });
});

router.post("/user_wallet", getusers, addmoney);

router.get("/carwash", verifyToken, getusers, async function (req, res) {
  const locations = await Manager.distinct("location");
  res.render("searcwash", { user: req.user, locations });
});

router.get("/carevcharge", verifyToken, getusers, async function (req, res) {
  const locations = await Manager.distinct("location");
  res.render("searchev", { user: req.user, locations });
});

router.get("/carpark", verifyToken, getusers, async function (req, res) {
  const locations = await Manager.distinct("location");
  res.render("searchpark", { user: req.user, locations });
});

router.get("/carinsp", verifyToken, getusers, async function (req, res) {
  const locations = await Manager.distinct("location");
  res.render("searchinsp", { user: req.user, locations });
});

router.get("/carpaint", verifyToken, getusers, async function (req, res) {
  const locations = await Manager.distinct("location");
  res.render("searchpaint", { user: req.user, locations });
});

router.post("/carwash", user.getcarwashService);
router.post("/carevcharge", user.getcarchargeService);
router.post("/carpark", user.getcarparkService);
router.post("/carinsp", user.getcarinspectionService);
router.post("/carpaint", user.getcarpaintingService);
router.get("/got_centers", verifyToken, getusers, async function (req, res) {
  const managers = req.session.managers || [];
  const service = req.session.service;
  res.render("user_got_centers", {
    user: req.user,
    managers: managers,
    service: service,
  });
});

router.get("/logout", userLogout);
router.get("/payment", verifyToken, getusers, async function (req, res) {
  const managerId = req.query.managerId;

  try {
    // Assuming Manager.findById is a function to find a manager by their ID
    const selectedManager = await Manager.findById(managerId);
    const servicecentre = req.session.servicecentre;
    const service = req.session.service;
    if (!selectedManager) {
      // Handle case where manager with given ID is not found
      return res.status(404).send("Manager not found");
    }
    req.session.selectedManager = selectedManager;
    // Render the payment page with the selected manager's data
    res.render("user_payment", {
      user: req.user,
      selectedManager,
      servicecentre,
      service,
    });
  } catch (error) {
    // Handle errors
    console.error("Error fetching manager:", error);
    res.status(500).send("Error fetching manager");
  }
});

router.get(
  "/paymentSuccessful",
  verifyToken,
  getusers,
  async function (req, res) {
    let service = req.session.service; // parking
    const manager = await Manager.findById(req.session.selectedManager);
    const servicecentre = req.session.servicecentre; // address location date park&evcharge ->from and to time  baki time
    const user = req.user;

    console.log(manager);
    console.log(servicecentre);
    console.log(req.user);

    let totime = 0; // var used for knowing which time the service ends
    let fromtime = 0; // var used for knowing at which time service starts
    let price = 0; // for getting the price of the service
    let parkslotnum = 0; // getting the slotting number booked when it is only parking as service

    if (service === "park") {
      service = "parking";
      price = manager.services.parking.parking_price;
      totime = servicecentre.to;
      fromtime = servicecentre.from;
      parkslotnum = manager.service.parking.parking_slot_number;
    } else if (service === "wash") {
      service = "cleaning";
      price = manager.services.cleaning.price_carwash;
      fromtime = servicecentre.time;
    } else if (service === "charge") {
      service = "ev charging";
      price = manager.services.charging.charging_price;
      totime = servicecentre.to;
      fromtime = servicecentre.from;
    } else if (service === "inspection") {
      price = manager.services.inspection.inspection_price;
      fromtime = servicecentre.time;
    } else if (service === "painting") {
      price = manager.services.paiting.painting_price;
      fromtime = servicecentre.time;
    }
    const admingettingmoney = 0.15 * price;
    const managergettingmoney = price - admingettingmoney;

    if (user.wallet < price) {
      res.json("Insufficient balance");
    }
    user.wallet = user.wallet - price;
    manager.wallet = manager.wallet + managergettingmoney;

    const booking_id = nanoid(6);
    const transaction_id = nanoid(6);
    // booking between any
    const bookingobj = await BookingsModel.create({
      booking_id: booking_id,
      manager: manager._id,
      service: service,
      cost: price,
      date: servicecentre.date,
      from_time: fromtime,
      to_time: totime,
      parking_slot_number: parkslotnum,
    });
    // user to admin
    const transactionobject = await TransactionModel.create({
      user: user._id,
      manager: manager._id,
      transaction_id: transaction_id,
      amount: admingettingmoney,
      from: user.username,
      to: "Admin",
      booking_id: booking_id,
      incoming_user: false, // user is giving
      incoming_manager: false, // manager is not getting money
      incoming_admin: true, // adming  getting money
      manager_refund: false,
      user_refund: false,
    });

    // user to manager
    const transactionobject2 = await TransactionModel.create({
      user: user._id,
      manager: manager._id,
      transaction_id: transaction_id,
      amount: managergettingmoney,
      from: user.username,
      to: manager.companyName,
      booking_id: booking_id,
      incoming_user: false, // user is giving
      incoming_manager: true, // manager is getting money
      incoming_admin: false, // adming not  getting money
      manager_refund: false,
      user_refund: false,
    });

    await user.save();
    await manager.save();
    await bookingobj.save();
    await transactionobject.save();
    await transactionobject2.save();

    res.render("success", { user: req.user });
  }
);

router.get("/user_preview", verifyToken, async function (req, res) {
  const token = req.cookies.authorization;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id).select("-password");

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.render("user_preview", { user });
});

router.post("/user_preview", verifyToken, async function (req, res) {
  const token = req.cookies.authorization;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id).select("-password");

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const { review, stars } = req.body;

  user.allreview.push({ review, stars });
  await user.save();

  res.redirect("/users/profile");
});

module.exports = router;
