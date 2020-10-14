const geocoder = require('../utils/geocoder')
const Bootcamp = require('../models/Bootcamp');

const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async');

// @desc  Get all bootdcamps 
//@route  Get /api/v1/bootcamps
//@access Public
exports.getBootcamps = asyncHandler(async (req, res, next)=>{
        let query;

        //copy req.query
        const reqQuery = { ...req.query }

        //Fields to exclude
        const removeFields= ['select','sort'];

        //loop over removeFields and delete form requesy query
        removeFields.forEach(param => delete reqQuery[param]);

        console.log(reqQuery)

        //Create quey string
        let queryStr = JSON.stringify(reqQuery)

        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
        console.log(queryStr)

        query = Bootcamp.find(JSON.parse(queryStr))

        //select fields
        if(req.query.select){
            const fields = req.query.select.split(',').join(' ')
            query = query.select(fields)
        }
        //sort fields
        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ')
            query = query.sort(sortBy)
        }else {
            query = query.sort('-createdAt')
        }

       

        const bootcamps = await query
        res.status(200).json({
            success: true,
            count:bootcamps.length,
            data: bootcamps

        })
    
    
})


// @desc  Get single bootdcamps 
//@route  Get /api/v1/bootcamps/:id
//@access Public
exports.getBootcamp = asyncHandler(async (req, res, next)=>{
    
        const bootcamp = await Bootcamp.findById(req.params.id);

        if(!bootcamp){
            return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`,404));
        }
        res.status(200).json({
            success:true,
            data:bootcamp
        })



    
   
})

// @desc  Create new bootdcamps 
//@route  POST /api/v1/bootcamps
//@access Private
exports.createBootcamp = asyncHandler(async (req, res, next)=>{
    
        const bootcamp = await Bootcamp.create(req.body)

   res.status(201).json({
        success:true,
        data: bootcamp
   })
        
    
   
})

// @desc  Update new bootdcamps 
//@route  PUT /api/v1/bootcamps/:id
//@access Private
exports.updateBootcamp = asyncHandler(async (req, res, next)=>{
   
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
            runValidators: true
        })
        if(!bootcamp){
            return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`,404));
        }
   
    

   

    
})

// @desc  Delete new bootdcamps 
//@route  DELETE /api/v1/bootcamps/:id
//@access Private
exports.deleteBootcamp = asyncHandler(async (req, res, next)=>{
    
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)

        if(!bootcamp){
            return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`,404));
        }
        res.status(200).json({
            success:true,
            data:{}
        })
    
    

})

// @desc  Get bootcamps within a radius
//@route  Get /api/v1/bootcamps/radius/:zipcope/:distance
//@access Private
exports.getBootsInRadius = asyncHandler(async (req, res, next)=>{
  const { zipcode, distance } = req.params;

  // get lat/lng form geocoder
    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;

    //Calc radius using radians

    //Divide distance by radius of Earth
    // Earth Radius = 3,963 mi - 6,378 km
    const radius = distance / 3963;

    const bootcamps = await Bootcamp.find({
        location:{
            $geoWithin: { $centerSphere: [ [ lng, lat ], radius ] }
        }
    })

    res.status(200).json({
        success: true,
        count: bootcamps.length,
        data: bootcamps

    })
    
})