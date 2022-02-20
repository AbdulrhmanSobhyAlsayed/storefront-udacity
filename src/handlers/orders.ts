import express, { Request, Response } from "express";
import { OrderModel } from "../models/order";

const orderRoutes = (app: express.Application) => {
  app.get("/current-order", currentOrder);
  app.post("/orders", createOrder);
  app.post("/add-product", addProduct);
};

const order = new OrderModel();

const currentOrder = async (req: Request, res: Response) => {
  try {
    const displayedOrder = await order.currentOrder(
      req.query.user_id as string
    );

    res.status(200).json(displayedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.body.user_id;
    const createdOrder = await order.create(userId);

    res.status(200).json(createdOrder);
  } catch (err) {
    res.status(500).json(err);
  }
};

const addProduct = async (req: Request, res: Response) => {
  try {
    const orderId = req.body.order_id;
    const productId = req.body.product_id;
    const quantity = req.body.quantity;

    const addedProduct = await order.addProduct(quantity, orderId, productId);

    res.status(200).json(addedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

export default orderRoutes;
