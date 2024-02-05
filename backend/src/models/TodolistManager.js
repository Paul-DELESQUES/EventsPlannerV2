const AbstractManager = require("./AbstractManager");

class EventManager extends AbstractManager {
  constructor() {
    super({ table: "todolist" });
  }

  // C

  async create({ title, description, status }) {
    const [rows] = await this.database.query(
      `insert into ${this.table} (title, description, status) values (?,?,?)`,
      [title, description, status]
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

  async update({ title, description, status }) {
    const [rows] = await this.database.query(
      `update ${this.table} set title=?, description=?, status=?`,
      [title, description, status]
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

module.exports = EventManager;
