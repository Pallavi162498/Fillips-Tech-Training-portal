import express from "express"
import {createBatch, getAllBatch, getBatchById, updatebatch, deleteBatch} from "../controllers/batch.controller.js";
const router = express.Router()

router.post("/", createBatch);
router.get("/", getAllBatch);
router.get("/:id", getBatchById);
router.put("/:id", updatebatch);
router.delete("/:id", deleteBatch)
export default router;