const Form = require("../models/formModel");
const axios = require("axios");

const createForm = async (req, res) => {
  const user_id = req.user._id;
  const {email, title, name} = req.body
  try {
    if (!email || !title || !name) {
      throw Error("all fields must be filled");
    }
   // if (email) {
      /*try{
        const response = await axios.get(
          `https://emailvalidation.abstractapi.com/v1/?api_key=eecf796c5c384c5a83820dd5741cb20d&email=${email}`
        );
        if (response.data.is_smtp_valid.value === false) {
          res.status(400).json({ error: "email not valid" });
          return
        }
      }catch(error){
        console.log(error)
      }*/
    //  console.log("email");
    //}
    const form = await Form.create({
      user_id,
      ...req.body,
    });
    res.status(200).json(form);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get single job
const getForm = async (req, res) => {
  const id = req.params.id;
  try {
    const form = await Form.findOne({ _id: id });
    res.status(200).json(form);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete job
const deleteForm = async (req, res) => {
  const id = req.params.id;
  try {
    const form = await Form.findOneAndDelete({ _id: id });
    if (!form) {
      return res.status(400).json({ error: "no such form" });
    }
    res.status(200).json(form);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const editForm = async (req, res) => {
  const id = req.params.id;
  const { email, heading, nameInput, emailInput, bodyInput } = req.body;
  try {
    /*if (!email || !heading) {
      res.status(400).json({ error: "please fill in all fields" });
      return;
    }*/
    /*try{
      const response = await axios.get(
        `https://emailvalidation.abstractapi.com/v1/?api_key=eecf796c5c384c5a83820dd5741cb20d&email=${email}`
      );
      if (response.data.is_smtp_valid.value === false) {
        res.status(400).json({ error: "email not valid" });
        return
      }
    }catch(error){
      console.log(error)
    }*/
    const form = await Form.findOneAndUpdate({ _id: id }, { $set: req.body });
    res.status(200).json(form);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get single job
const getForms = async (req, res) => {
  const id = req.params.id;
  try {
    const forms = await Form.find({ user_id: id });
    res.status(200).json(forms);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createForm,
  getForm,
  deleteForm,
  editForm,
  getForms,
};
