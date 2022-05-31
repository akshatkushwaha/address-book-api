const express = require("express");
const router = express.Router();

const {
  getAllContact,
  getContact,
  addContact,
  addContactBulk,
  updateContact,
  deleteContact,
} = require("../controllers/bookcontroller");

router.get("/book/", getAllContact);
router.get("/person/:id", getContact);
router.post("/book/", addContact);
router.post("/book/bulk", addContactBulk);
router.patch("/person/:id", updateContact);
router.delete("/person/:id", deleteContact);

module.exports = router;
