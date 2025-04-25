const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapasync.js");
const {validateReviews, isLoggedIn, isReviewAuther} = require("../middileware.js");
const reviewController = require("../controllers/reviews.js");


//POST Rout
router.post("/", isLoggedIn, validateReviews, wrapAsync(reviewController.createReview));


//Delete Rout
router.delete("/:reviewId", isLoggedIn, isReviewAuther, wrapAsync (reviewController.deleteReview));

module.exports = router;