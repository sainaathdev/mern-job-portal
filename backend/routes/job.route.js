import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.middleware.js";
import { getAdminCreatedJobs, getAllJobs, getJobsById, postJob } from "../controllers/job.controller.js";


const router = express.Router();

router.route("/post").post(isAuthenticated, postJob)
router.route("/get").get(isAuthenticated, getAllJobs)
router.route("/getadminjobs").get(isAuthenticated, getAdminCreatedJobs)
router.route("/get/:id").get(isAuthenticated, getJobsById)

export default router;