const Person = require("../models/person");
const jwt = require("jsonwebtoken");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

function decodeToken(req) {
  const token = req.headers.authorization.split(" ")[1];
  const userData = jwt.verify(token, process.env.SECRET);
  return userData;
}

//only return contact created by the user who is accessing them
const getAllContact = asyncWrapper(async (req, res, next) => {
  const userData = decodeToken(req);
  const { firstName, lastName, tel, email } = req.query;
  var queryObject = { createdBy: userData.id };
  if (firstName) {
    queryObject.firstName = new RegExp(firstName, "i");
  }
  if (lastName) {
    queryObject.lastName = new RegExp(lastName, "i");
  }
  if (tel) {
    queryObject.tel = new RegExp(tel, "i");
  }
  if (email) {
    queryObject.email = new RegExp(email, "i");
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const book = await Person.find(queryObject)
    .sort("firstName")
    .skip(skip)
    .limit(limit);
  res.status(200).json({ success: true, data: book, nbHits: book.length });
});

const getContact = asyncWrapper(async (req, res, next) => {
  const userData = decodeToken(req);
  const { id } = req.params;
  const person = await Person.findOne({
    _id: id,
    createdBy: userData.id,
  }).exec();
  if (!person) {
    return next(createCustomError(`No person found with id : ${id}`, 404));
  }
  res.status(200).json({ success: true, data: person });
});

const addContact = asyncWrapper(async (req, res, next) => {
  const userData = decodeToken(req);
  const person = await Person.create({
    ...req.body,
    ...{ createdBy: userData.id },
  });
  res.status(201).json({ success: true, data: person });
});

const addContactBulk = asyncWrapper(async (req, res, next) => {
  const userData = decodeToken(req);
  const data = req.body.data;
  for (var i = 0; i < data.length; ++i) {
    await Person.create({ ...data[i], ...{ createdBy: userData.id } });
  }
  res.status(201).json({
    success: true,
    msg: `Successfully Added ${data.length} contact(s)`,
  });
});

const updateContact = asyncWrapper(async (req, res, next) => {
  const userData = decodeToken(req);
  const { id } = req.params;
  const person = await Person.findOneAndUpdate(
    { _id: id, createdBy: userData.id },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!person) {
    return next(createCustomError(`No person found with id : ${id}`, 404));
  }
  res.status(200).json({ success: true, data: person });
});

const deleteContact = asyncWrapper(async (req, res, next) => {
  const userData = decodeToken(req);
  const { id } = req.params;
  const person = await Person.findOneAndDelete({
    _id: id,
    createdBy: userData.id,
  });
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
