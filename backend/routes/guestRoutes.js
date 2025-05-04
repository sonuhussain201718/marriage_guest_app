const express = require("express");
const {
  getGuests,
  getGuestByID,
  addGuest,
  updateGuest,
  deleteGuest,
} = require("../controllers/guestController");

const router = express.Router();

router.get("/get_all_guests", getGuests);
router.get("/get_guest_by_id", getGuestByID);
router.post("/create_guest", addGuest);
router.put("/update_guest", updateGuest);
router.put("/delete_guest", deleteGuest);

module.exports = router;
