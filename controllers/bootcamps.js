const Bootcamp = require('../models/Bootcamp');
const bootcamp = require('../models/Bootcamp');

// @desc  Get all bootdcamps 
//@route  Get /api/v1/bootcamps
//@access Public
exports.getBootcamps = (req, res, next)=>{
    res.status(200).json({success: true, msg: 'show all bootcamps'})
}


// @desc  Get single bootdcamps 
//@route  Get /api/v1/bootcamps/:id
//@access Public
exports.getBootcamp = (req, res, next)=>{
    res.status(200).json({success: true, msg: `show bootcamp ${req.params.id}`})
}

// @desc  Create new bootdcamps 
//@route  POST /api/v1/bootcamps
//@access Private
exports.createBootcamp = async (req, res, next)=>{
    try {
        const bootcamp = await Bootcamp.create(req.body)

   res.status(201).json({
        success:true,
        data: bootcamp
   })
        
    } catch (error) {
        res.status(400).json({
            success: false
        })
    }
   
}

// @desc  Update new bootdcamps 
//@route  PUT /api/v1/bootcamps/:id
//@access Private
exports.updateBootcamp = (req, res, next)=>{
    res.status(200).json({success: true, msg: `Update bootcamp ${req.params.id}`})
}

// @desc  Delete new bootdcamps 
//@route  DELETE /api/v1/bootcamps/:id
//@access Private
exports.deleteBootcamp = (req, res, next)=>{
    res.status(200).json({success: true, msg: `delete bootcamp ${req.params.id}`})
}