import express from "express";
import Controller from "../controllers/developer";
const router = express.Router();
const controller = new Controller();

router.get("/developers?", controller.findAll);
router.get("/developers/:_id", controller.findId);
router.post("/developers", controller.create);
router.put("/developers/:_id", controller.update);
router.delete("/developers/:_id", controller.delete);

export = router;
