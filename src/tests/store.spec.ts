import { ProductModel } from "../models/product";
import { UserModel } from "../models/user";
import { OrderModel } from "../models/order";

const product = new ProductModel();
const user = new UserModel();
const order = new OrderModel();

let productId: number;
let userId: number;
let orderId: number;
describe("test Product Model", () => {
  const body = {
    id: 2,
    name: "testProduct",
    price: 20,
    category: "testCategory",
  };
  it("should return created product when create new product", async () => {
    const result = await product.create(body);
    productId = result.id;
    expect(result.name).toEqual(body.name);
  });
  it("should return all products ", async () => {
    const result = await product.index();

    expect(result.length).toBeGreaterThan(0);
  });
  it("should return product with id 1  ", async () => {
    const result = await product.show(productId as unknown as string);

    expect(result.name).toEqual(body.name);
  });
  it("should return all products with category  testCategory", async () => {
    const result = await product.indexByCategory(body.category);

    expect(result[0].name).toEqual(body.name);
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
    userId = result.id;
    expect(result.firstname).toEqual(body.firstname);
  });
  it("should return all users ", async () => {
    const result = await user.index();

    expect(result.length).toBeGreaterThan(0);
  });
  it("should return user with id 1", async () => {
    const result = await user.show(userId as unknown as string);

    expect(result.firstname).toEqual(body.firstname);
  });
  it("should return user in login", async () => {
    const result = await user.authenticate(body.firstname, body.lastname);

    expect(result?.firstname).toEqual(body.firstname);
  });
});

describe("test Order Model", () => {
  it("should return created order when create new order", async () => {
    const result = await order.create(userId as unknown as string);
    orderId = result.id;
    expect(result.status).toEqual("active");
  });
  it("should return the orders_products object when add product to order ", async () => {
    const result = await order.addProduct(
      3,
      orderId as unknown as string,
      productId as unknown as string
    );

    expect(result.quantity).toEqual(3);
  });
  it("should return current order ", async () => {
    const result = await order.currentOrder(userId as unknown as string);

    expect(result.user_id).toEqual(userId);
  });
});
