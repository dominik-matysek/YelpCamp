const express = require('express');
const router = express.Router({mergeParams: true}); // mergeParams potrzebne żeby móc korzystać z id campgroundów chyba czy coś

const Review = require('../models/review');
const Campground = require('../models/campground');

const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');
const reviews = require('../controllers/reviews');

const {validateReview, isLoggedIn, isReviewAuthor} = require('../middleware.js');

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;