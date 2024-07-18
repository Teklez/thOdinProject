const Genre = require("../models/genre");
const asyncHandler = require("express-async-handler");


// Display list of all Genre;
exports.genre_list = asyncHandler(async (req, res, next) =>{
    genreList = await Genre.find().exec();

    res.render("genre_list", {title:"Genre List", genre_list:genreList});
});

// Display detail page for a specific Genre.
exports.genre_detail = asyncHandler(async (req, res, next) =>{
    res.send(`NOT IMPLEMENTED: Genre detail $(req.params.id)`);
});

//Display Genere create form on GET.
exports.genre_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Genre create GET ");
});

// Handle Genre crate on POST.
exports.genre_create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Genre create POST");
});

// Display Genere delete form on GET.
exports.genre_delete_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Genre delete GET");
});

// Handle Genre delte on POST.
exports.genre_delete_post = asyncHandler(async (req, res, next) =>{
    res.send("NOT IMPLEMENTED: Genre delete POST");
});

// Display Genre update form on GET.
exports.genre_update_get = asyncHandler(async (req,res, next) => {
    res.send("NOT IMPLEMENTED: Genre update GET");
});

// Handle Genre update on POST.
exports.genre_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Genre update POST");
});