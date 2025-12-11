import express from "express"
import {downloadCertificate} from "../controllers/certificate.controller.js";
const router = express.Router()

router.get("/:id", downloadCertificate);

export default router