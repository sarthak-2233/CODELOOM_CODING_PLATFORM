const express = require('express');
const adminMiddleware = require('../Middleware/adminMiddleware');
const videoRouter =  express.Router();
const {generateUploadSignature,saveVideoMetadata,deleteVideo,getVideoByProblem,getUserVideos} = require("../controllers/videoSection")

videoRouter.get("/create/:problemId",adminMiddleware,generateUploadSignature);
videoRouter.post("/save",adminMiddleware,saveVideoMetadata);
videoRouter.delete("/delete/:problemId",adminMiddleware,deleteVideo);

videoRouter.get("/problem/:problemId", getVideoByProblem);
videoRouter.get("/my-videos",  getUserVideos);

module.exports = videoRouter;