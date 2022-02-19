import { ProductModel } from "../models/product";
import { UserModel } from "../models/user";
import { OrderModel } from "../models/order";

const product = new ProductModel();
const user = new UserModel();
const order = new OrderModel();

describe("test Product Model", () => {
  const body = {
    id: 1,
    name: "testProduct",
    price: 20,
    category: "testCategory",
  };
  it("should return created product when create new product", async () => {
    const result = await product.create(body);

    expect(result).toEqual(body);
  });
  it("should return all products ", async () => {
    const result = await product.index();

    expect(result).toEqual([body]);
  });
  it("should return product with id 1  ", async () => {
    const result = await product.show("1");

    expect(result).toEqual(body);
  });
  it("should return all products with category  testCategory", async () => {
    const result = await product.indexByCategory("testCategory");

    expect(result).toEqual([body]);
  });
});
describe("test User Model", () => {
  const body = {
    id: 1,
    firstname: "testFirst",
    lastname: "testLast",
    password: "test",
  };
  it("should return created user when create new user", async () => {
    const result = await user.create(body);

    expect(result).toEqual(body);
  });
  it("should return all users ", async () => {
    const result = await user.index();

    expect(result).toEqual([body]);
  });
  it("should return user with id 1", async () => {
    const result = await user.show("1");

    expect(result).toEqual(body);
  });
});

describe("test Order Model", () => {
  it("should return created order when create new order", async () => {
    const result = await order.create("1");

    expect(result).toEqual({
      id: 1,
      user_id: "1",
      status: "active",
    });
  });
  it("should return the orders_products object when add product to order ", async () => {
    const result = await order.addProduct(3, "1", "1");

    expect(result).toEqual({
      id: 1,
      order_id: "1",
      product_id: "1",
      quantity: 3,
    });
  });
  it("should return current order ", async () => {
    const result = await order.currentOrder("1");

    expect(result).toEqual({
      id: 1,
      products: [
        {
          product_id: "1",
          quantity: 3,
        },
      ],
      user_id: "1",
      status: "active",
    });
  });
});
