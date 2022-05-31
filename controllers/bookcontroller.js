const Person = require("../models/person");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const getAllContact = asyncWrapper(async (req, res) => {
  const persons = await Person.find({});
  res.status(200).json({ persons });
});

const getContact = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const person = await Person.findOne({ _id: id }).exec();
  if (!person) {
    return next(createCustomError(`No person found with id : ${id}`, 404));
  }
  res.status(200).json({ person });
});

const addContact = asyncWrapper(async (req, res) => {
  const person = await Person.create(req.body);
  res.status(201).json({ person });
});

const addContactBulk = asyncWrapper(async (req, res) => {
  const data = req.body.data;
  for (var i = 0; i < data.length; ++i) {
    await Person.create(data[i]);
  }
  res.status(201).json({ msg: "Successfully Added" });
});

const updateContact = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const person = await Person.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!person) {
    return next(createCustomError(`No person found with id : ${id}`, 404));
  }
  res.status(200).json({ person });
});

const deleteContact = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const person = await Person.findOneAndDelete({ _id: id });
  if (!person) {
    return next(createCustomError(`No person found with id : ${id}`, 404));
  }
  res.status(200).json({ person });
});

module.exports = {
  getAllContact,
  addContact,
  addContactBulk,
  getContact,
  updateContact,
  deleteContact,
};
