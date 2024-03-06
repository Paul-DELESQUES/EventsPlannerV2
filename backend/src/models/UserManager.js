const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "users" });
  }

  // C

  async create({ email, hashPassword, lastname, firstname }) {
    const [rows] = await this.database.query(
      `insert into ${this.table} (email, hash_password, lastname, firstname) values (?,?,?,?)`,
      [email, hashPassword, lastname, firstname]
    );

    return rows.insertId;
  }

  // R

  async read(id) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    return rows[0];
  }

  async readAll() {
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of items
    return rows;
  }

  async readByEmailWithPassword(email) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where email = ?`,
      [email]
    );
    return rows[0];
  }

  // U

  async update({ email, hashPassword, lastname, firstname }) {
    const [rows] = await this.database.query(
      `update ${this.table} set email=?, hash_password=?, lastname=?, firstname=?`,
      [email, hashPassword, lastname, firstname]
    );
    return rows;
  }

  // D

  async delete(id) {
    const [rows] = await this.database.query(
      `delete from ${this.table} where id=?`,
      [id]
    );
    return [rows];
  }
}

module.exports = UserManager;
