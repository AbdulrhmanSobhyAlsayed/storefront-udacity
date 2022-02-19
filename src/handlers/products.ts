import express, { Request, Response } from "express";
import { ProductModel } from "../models/product";

const productRoutes = (app: express.Application) => {
  app.get("/products", listProducts);
  app.get("/products/:id", showProduct);
  app.post("/products", createProduct);
  app.get("/products-by-category", productsByCategory);
};

const product = new ProductModel();

const listProducts = async (_req: Request, res: Response) => {
  try {
    const products = await product.index();

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};

const showProduct = async (req: Request, res: Response) => {
  try {
    const displayedProduct = await product.show(req.params.id);

    res.status(200).json(displayedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

const productsByCategory = async (req: Request, res: Response) => {
  try {
    const displayedProducts = await product.indexByCategory(
      req.query.category as string
    );

    res.status(200).json(displayedProducts);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createProduct = async (req: Request, res: Response) => {
  try {
    const createdProduct = await product.create(req.body);

    res.status(200).json(createdProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export default productRoutes;
