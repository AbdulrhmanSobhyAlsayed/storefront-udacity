// @ts-ignore
import db from "../database";

export type Order = {
  id: number;
  user_id: string;
  status: string;
};

export class OrderModel {
  async currentOrder(userId: string): Promise<any> {
    try {
      // @ts-ignore

      const conn = await db.connect();
      const getIdSql =
        "SELECT id FROM orders where status = 'active' and user_id = ($1)";
      const result = await conn.query(getIdSql, [userId]);
      const currentOrderId = result.rows[0].id;
      if (currentOrderId) {
        const getProductsSql =
          "SELECT product_id, quantity FROM orders_products where order_id = ($1)";
        const productsResult = await conn.query(getProductsSql, [
          currentOrderId,
        ]);
        return {
          id: currentOrderId,
          products: productsResult.rows,
          user_id: userId,
          status: "active",
        };
      }
      conn.release();
      return {};
    } catch (err) {
      throw new Error(`Could not get active Order. Error: ${err}`);
    }
  }

  async addProduct(
    quantity: number,
    orderId: string,
    productId: string
  ): Promise<any> {
    try {
      const sql =
        "INSERT INTO orders_products(quantity, order_id,product_id) VALUES($1,$2,$3) RETURNING *";
      // @ts-ignore
      const conn = await db.connect();

      const result = await conn.query(sql, [quantity, orderId, productId]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not add product with id  ${productId}. Error: ${err}`
      );
    }
  }

  async create(userId: string): Promise<Order> {
    try {
      const sql =
        "INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *";
      // @ts-ignore
      const conn = await db.connect();

      const result = await conn.query(sql, [userId, "active"]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not add new Order for user with id ${userId}. Error: ${err}`
      );
    }
  }

  async setOrderComplete(orderId: string): Promise<Order> {
    try {
      const sql =
        "UPDATE orders SET status = complete WHERE id=($1) RETURNING *";
      // @ts-ignore
      const conn = await db.connect();

      const result = await conn.query(sql, [orderId]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not set order with id ${orderId} as complete. Error: ${err}`
      );
    }
  }
}
