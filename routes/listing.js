const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapasync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middileware.js")
const listingController = require("../controllers/listings.js");
const multer  = require('multer')
const { storage } = require("../cloudeconfig.js");
const upload = multer({ storage });



router.route("/")
//Index Rout
.get(wrapAsync(listingController.index))

//Create Rout
.post(isLoggedIn, upload.single("listing[image]"), validateListing, wrapAsync(listingController.createListing))


//New Rout
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
//Show Rout
.get(wrapAsync(listingController.showListing))

//Update Rout
.put(isLoggedIn, isOwner, upload.single("listing[image]"), validateListing, wrapAsync(listingController.updateListing))

//Delete Rout
.delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing))

//Edit Rout
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.editListing));


module.exports = router
