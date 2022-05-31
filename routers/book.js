const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authmiddleware");

const {
  getAllContact,
  getContact,
  addContact,
  addContactBulk,
  updateContact,
  deleteContact,
} = require("../controllers/bookcontroller");

router.get("/book/", authMiddleware, getAllContact);
router.get("/person/:id", authMiddleware, getContact);
router.post("/book/", authMiddleware, addContact);
router.post("/book/bulk", authMiddleware, addContactBulk);
router.patch("/person/:id", authMiddleware, updateContact);
router.delete("/person/:id", authMiddleware, deleteContact);

module.exports = router;
