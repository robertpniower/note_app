import pool from '../db/pool.js';
import {
  findUserByEmailQuery,
  findUserByIdQuery,
  createUserQuery,
} from "../queries/userQueries.js";

class UserRepository {

  // find a user using their email address.
  async findUserByEmail(email) {
    // Execute the sql query and pass the email as parameter.
    const result = await pool.query(findUserByEmailQuery, [email]);

    // return the first matching user or null when no user exists.
    return result.rows[0] ?? null;
  }

  // find a user using their id
  async findUserById(user_id) {
    const result = await pool.query(findUserByIdQuery, [user_id]);

    return result.rows[0] ?? null
  }

  // create a new user
  async createUser(name, email, passwordHash) {
    const result = pool.query(createUserQuery, [
      name,
      email,
      passwordHash
    ]);

    return result.rows[0];
  }
}

export default new UserRepository();
