const Form = require('../models/formModel')

//get single job
const getForm = async (req, res) =>{
    const _id = req.params.id
    try{
        const form = await Form.findOne({_id})
        if(form){
            res.status(200).json(form)
        }else{
            res.status(400).json({error : 'form does not exist'})
        }

    }catch(error){
        res.status(400).json({error : error.message})
    }
}

module.exports = {
    getForm
}