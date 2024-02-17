const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "users" });
  }

  // C

  async create({
    email,
    hashPassword,
    lastname,
    firstname,
    createdDate,
    lastConnection,
  }) {
    const [rows] = await this.database.query(
      `insert into ${this.table} (email, hash_password, lastname, firstname, created_date, last_connection) values (?,?,?,?,?,?)`,
      [email, hashPassword, lastname, firstname, createdDate, lastConnection]
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

  // U

  async update({
    email,
    hashPassword,
    lastname,
    firstname,
    createdDate,
    lastConnection,
  }) {
    const [rows] = await this.database.query(
      `update ${this.table} set email=?, hash_password=?, lastname=?, firstname=?, created_date=?, last_connection=?`,
      [email, hashPassword, lastname, firstname, createdDate, lastConnection]
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
