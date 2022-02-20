import { ProductModel } from "../models/product";
import { UserModel } from "../models/user";
import { OrderModel } from "../models/order";

const product = new ProductModel();
const user = new UserModel();
const order = new OrderModel();

describe("test Product Model", () => {
  const body = {
    id: 2,
    name: "testProduct",
    price: 20,
    category: "testCategory",
  };
  it("should return created product when create new product", async () => {
    const result = await product.create(body);
    expect(result.name).toEqual("testProduct");
  });
  it("should return all products ", async () => {
    const result = await product.index();

    expect(result[1]).toEqual(body);
  });
  it("should return product with id 1  ", async () => {
    const result = await product.show("2");

    expect(result).toEqual(body);
  });
  it("should return all products with category  testCategory", async () => {
    const result = await product.indexByCategory("testCategory");

    expect(result).toEqual([body]);
  });
});
describe("test User Model", () => {
  const body = {
    id: 3,
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

    expect(result[2]).toEqual(body);
  });
  it("should return user with id 1", async () => {
    const result = await user.show("3");

    expect(result).toEqual(body);
  });
  it("should return user in login", async () => {
    const result = await user.authenticate("testFirst", "testLast");

    expect(result).toEqual(body);
  });
});

describe("test Order Model", () => {
  it("should return created order when create new order", async () => {
    const result = await order.create("3");

    expect(result).toEqual({
      id: 2,
      user_id: "3",
      status: "active",
    });
  });
  it("should return the orders_products object when add product to order ", async () => {
    const result = await order.addProduct(3, "2", "1");

    expect(result).toEqual({
      id: 2,
      order_id: "2",
      product_id: "1",
      quantity: 3,
    });
  });
  it("should return current order ", async () => {
    const result = await order.currentOrder("3");

    expect(result).toEqual({
      id: 2,
      products: [
        {
          product_id: "1",
          quantity: 3,
        },
      ],
      user_id: "3",
      status: "active",
    });
  });
});
