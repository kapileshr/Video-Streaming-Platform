import express from "express";
import { getTrendingTv, getTvByCategory, getTvDetails, getTvSimilar, getTvTrailers } from "../controllers/tvshow.controller.js";

const router = express.Router();

router.get("/trending",getTrendingTv);
router.get("/:id/trailers",getTvTrailers);
router.get("/:id/details",getTvDetails);
router.get("/:id/similar",getTvSimilar);
router.get("/:category",getTvByCategory);

export default router;
