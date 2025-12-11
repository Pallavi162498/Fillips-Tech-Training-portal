import express from "express"
import {downloadCertificate} from "../controllers/certificate.controller.js";
import { authenticate } from "../middlewares/authenticate.middleware.js";
const router = express.Router()

router.get("/:id", authenticate, downloadCertificate);

export default router