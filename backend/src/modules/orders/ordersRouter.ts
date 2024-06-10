import { Router } from "express";
import OrdersController from "./ordersController";
OrdersController
const router = Router();

router.post("/", OrdersController.createOrder);
router.get("/", OrdersController.getOrders);
router.patch("/:id/status", OrdersController.updateOrderStatus);
router.delete("/:id", OrdersController.deleteOrder);

const ordersRouter = router;
export default ordersRouter;