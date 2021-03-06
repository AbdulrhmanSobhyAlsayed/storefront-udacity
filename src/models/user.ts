// @ts-ignore
import db from "../database";

export type User = {
  id: number;
  firstname: string;
  lastname: string;
  password: string;
};

export class UserModel {
  async index(): Promise<User[]> {
    try {
      // @ts-ignore
      const conn = await db.connect();
      const sql = "SELECT * FROM users";
      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sql = "SELECT * FROM users WHERE id=($1)";
      // @ts-ignore
      const conn = await db.connect();

      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      const sql =
        "INSERT INTO users (firstname, lastname, password) VALUES($1, $2, $3) RETURNING *";
      // @ts-ignore
      const conn = await db.connect();

      const result = await conn.query(sql, [
        u.firstname,
        u.lastname,
        u.password,
      ]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not add new user ${u.firstname} ${u.lastname}. Error: ${err}`
      );
    }
  }

  async productsByCategory(category: string): Promise<User> {
    try {
      const sql = "SELECT * FROM users WHERE category=($1)";
      // @ts-ignore
      const conn = await db.connect();

      const result = await conn.query(sql, [category]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not find users with category ${category}. Error: ${err}`
      );
    }
  }

  async authenticate(
    firstname: string,
    lastname: string
  ): Promise<User | null> {
    const conn = await db.connect();
    const sql = "SELECT * FROM users WHERE firstname=($1) and lastname=($2)";

    const result = await conn.query(sql, [firstname, lastname]);

    return result.rows.length ? result.rows[0] : null;
  }
}
