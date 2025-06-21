import express from "express";
import {
  authenticateUser,
  authorizePermissions,
} from "../../../middleware/authentication";
import { createOrder, getAllOrders, getCurrentUserOrders, getSingleOrder, updateOrder } from "../controllers/index.js";

const router = express.Router();

router.route("/").post(authenticateUser, createOrder).get(authenticateUser, authorizePermissions('admin'), getAllOrders);

router.route("/showAllMyOrders").get(authenticateUser, getCurrentUserOrders);

router.route("/:id").get(authenticateUser, getSingleOrder).patch(authenticateUser, updateOrder);

export default router;
