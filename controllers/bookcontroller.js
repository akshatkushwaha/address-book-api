const Person = require("../models/person");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const getAllContact = asyncWrapper(async (req, res, next) => {
  const { firstName, lastName, tel, email } = req.query;
  var queryObject = {};
  if (firstName) {
    queryObject.firstName = firstName;
  }
  if (lastName) {
    queryObject.lastName = lastName;
  }
  if (tel) {
    queryObject.tel = tel;
  }
  if (email) {
    queryObject.email = email;
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const book = await Person.find(queryObject).skip(skip).limit(limit);
  res.status(200).json({ success: true, data: book, nbHits: book.length });
});

const getContact = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const person = await Person.findOne({ _id: id }).exec();
  if (!person) {
    return next(createCustomError(`No person found with id : ${id}`, 404));
  }
  res.status(200).json({ success: true, data: person });
});

const addContact = asyncWrapper(async (req, res, next) => {
  const person = await Person.create(req.body);
  res.status(201).json({ success: true, data: person });
});

const addContactBulk = asyncWrapper(async (req, res, next) => {
  const data = req.body.data;
  for (var i = 0; i < data.length; ++i) {
    await Person.create(data[i]);
  }
  res.status(201).json({ success: true, msg: "Successfully Added" });
});

const updateContact = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const person = await Person.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!person) {
    return next(createCustomError(`No person found with id : ${id}`, 404));
  }
  res.status(200).json({ success: true, data: person });
});

const deleteContact = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const person = await Person.findOneAndDelete({ _id: id });
  if (!person) {
    return next(createCustomError(`No person found with id : ${id}`, 404));
  }
  res.status(200).json({ success: true });
});

module.exports = {
  getAllContact,
  addContact,
  addContactBulk,
  getContact,
  updateContact,
  deleteContact,
};
