const Listing = require("../models/listing.js");

//Index Rout
module.exports.index = async (req, res) => {
    let allListing = await Listing.find({});
    res.render("listing/index.ejs", { allListing });
}

//New Rout
module.exports.renderNewForm = (req, res) => {
    res.render("listing/new.ejs")
}

//Show Rout
module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate(
        {
            path: "review",
            populate: {
                path: "author",
            },
        }).populate("owner");
        
    if (!listing) {
        req.flash("error", "Listing you requested for does not exsit!");
        return res.redirect("/listings");
    }
    res.render("listing/show.ejs", { listing })
}

//Create Rout
module.exports.createListing = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename}
    await newListing.save()
    req.flash("success", "New Listing Created")
    res.redirect("/listings");
}

//Edit Rout
module.exports.editListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for does not exsit!");
        return res.redirect("/listings");
    }

    let orignal = listing.image.url;
    orignal = orignal.replace("/upload", "/upload/w_250");

    res.render("listing/edit.ejs", { listing, orignal })
}

//Update Rout
module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if(typeof req.file != "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url, filename};
    await listing.save();
    }

    req.flash("success", "Listing updated successfuly")
    res.redirect(`/listings/${id}`)
}

//Delete Rout
module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("err", "This Listing was deleted!")
    res.redirect("/listings")
}