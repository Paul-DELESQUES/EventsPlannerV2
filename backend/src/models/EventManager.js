const AbstractManager = require("./AbstractManager");

class EventManager extends AbstractManager {
  constructor() {
    super({ table: "events" });
  }

  // C

  async createEvent({
    eventType,
    eventDate,
    eventLocation,
    guestsNumber,
    childsNumber,
    budget,
    importantNote,
  }) {
    const [rows] = await this.database.query(
      `insert into ${this.table} (
          event_type,
          event_date_start,
          event_location,
          guests_number,
          childs_number,
          budget,
          important_note) values (?,?,?,?,?,?,?)`,
      [
        eventType,
        eventDate,
        eventLocation,
        guestsNumber,
        childsNumber,
        budget,
        importantNote,
      ]
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

    return rows;
  }

  // U

  async update({
    eventType,
    eventDate,
    eventLocation,
    guestsNumber,
    childsNumber,
    budget,
    importantNote,
  }) {
    const [rows] = await this.database.query(
      `update ${this.table} set event_type=?, event_date=?, event_location=?, guests_number=?, childs_number=?, budget=?, important_note=?`,
      [
        eventType,
        eventDate,
        eventLocation,
        guestsNumber,
        childsNumber,
        budget,
        importantNote,
      ]
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
