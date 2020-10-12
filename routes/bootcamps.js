const express = require('express');


const { getBootcamps, getBootcamp,  createBootcamp, updateBootcamp, deleteBootcamp, getBootsInRadius } = require('../controllers/bootcamps');

const router = express.Router();

router.route('/radius/:zipcode/:distance').get(getBootsInRadius)

router.route('/').get(getBootcamps).post(createBootcamp);

router.route('/:id').get(getBootcamp).post(createBootcamp).put(updateBootcamp).delete(deleteBootcamp)


module.exports = router; 