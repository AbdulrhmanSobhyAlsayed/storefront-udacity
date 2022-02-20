import supertest from "supertest";
import { User } from "../models/user";
import app from "../server";

const request = supertest(app);
let user: User;
let accessToken: string;
beforeAll(async () => {
  const res = await request.post("/users").send({
    id: 2,
    firstname: "test1",
    lastname: "test",
    password: "test",
  });

  user = res.body.user;
  accessToken = res.body.accessToken;
});
describe("test Product API", () => {
  const body = {
    name: "testProduct1",
    price: 20,
    category: "testCategory1",
  };
  it("should return 200 product when create new product", async () => {
    const result = await request
      .post("/products")
      .set("Authorization", "Bearer " + accessToken)
      .send(body);

    expect(result.status).toEqual(200);
  });
  it("should return all products with status 200 ", async () => {
    const result = await request.get("/products");

    expect(result.status).toEqual(200);
  });
  it("should return product with id 2 with status 200 ", async () => {
    const result = await request.get("/products/2");

    expect(result.status).toEqual(200);
  });
  it("should return all products with category  testCategory with status 200", async () => {
    const result = await request.get("/products-by-category");

    expect(result.status).toEqual(200);
  });
});
describe("test User API", () => {
  const body = {
    firstname: "testFirst1",
    lastname: "testLast1",
    password: "test1",
  };
  it("should return created user with status 200", async () => {
    const result = await request.post("/users").send(body);

    expect(result.status).toEqual(200);
  });
  it("should return all users with status 200 ", async () => {
    const result = await request
      .get("/users")
      .set("Authorization", "Bearer " + accessToken);

    expect(result.status).toEqual(200);
  });
  it("should return user with id 1 with status 200", async () => {
    const result = await request
      .get("/users/1")
      .set("Authorization", "Bearer " + accessToken);

    expect(result.status).toEqual(200);
  });
  it("should return access token with login with status 200", async () => {
    const result = await request.post("/login").send({
      firstname: "test1",
      lastname: "test",
      password: "test",
    });

    expect(result.status).toEqual(200);
  });
});

describe("test Order API", () => {
  it("should return created order when create new order with status 200", async () => {
    const result = await request
      .post("/orders")
      .set("Authorization", "Bearer " + accessToken)
      .send({ user_id: 1 });

    expect(result.status).toEqual(200);
  });
  it("should return the orders_products object when add product to order with status 200 ", async () => {
    const result = await request
      .post("/add-product")
      .set("Authorization", "Bearer " + accessToken)
      .send({ quantity: 1, product_id: 1, order_id: 1 });

    expect(result.status).toEqual(200);
  });
  it("should return current order  with status 200", async () => {
    const result = await request
      .get("/current-order?user_id=1")
      .set("Authorization", "Bearer " + accessToken);

    expect(result.status).toEqual(200);
  });
});
