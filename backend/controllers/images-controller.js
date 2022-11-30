const express = require("express");
const router = express.Router();
const axios = require("axios");

const KEY = "25540812-faf2b76d586c1787d2dd02736";

// get general images (no category chosen yet)
router.get("/:pageNum", async (request, response, next) => {
    let pageNum = request.params.pageNum;

    await axios.get(`https://pixabay.com/api/?key=${KEY}&page=${pageNum}&per_page=9`)
        .then(res => {
            let images = res.data.hits;

            // sort the images by id
            images.sort(function (a, b) {
                return a.id - b.id;
            });

            response.json(images);
        }).catch(error => {
            return next(error.response);
        });
});

// get images by category
router.get("/:category/:pageNum", async (request, response, next) => {
    let category = request.params.category;
    let pageNum = request.params.pageNum;

    await axios.get(`https://pixabay.com/api/?key=${KEY}&q=${category}&page=${pageNum}&per_page=9`)
        .then(res => {
            let images = res.data.hits;

            // sort the images by id
            images.sort(function (a, b) {
                return a.id - b.id;
            });

            response.json(images);
        }).catch(error => {
            return next(error.response);
        });
});

module.exports = router;