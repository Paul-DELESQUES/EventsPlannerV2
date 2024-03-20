const AbstractManager = require("./AbstractManager");

class EventManager extends AbstractManager {
  constructor() {
    super({ table: "events" });
  }

  // C

  async createEvent({
    eventType,
    eventStartDate,
    eventEndDate,
    startTime,
    endTime,
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
            event_date_end,
            start_time, 
            end_time, 
            event_location,
            guests_number,
            childs_number,
            budget,
            important_note) values (?,?,?,?,?,?,?,?,?,?)`,
      [
        eventType,
        eventStartDate,
        eventEndDate,
        startTime,
        endTime,
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
    eventStartDate,
    eventEndDate,
    startTime,
    endTime,
    eventLocation,
    guestsNumber,
    childsNumber,
    budget,
    importantNote,
    id,
  }) {
    const startDate =
      new Date(eventStartDate).toISOString().split("T")[0] + " " + startTime;
    const endDate =
      new Date(eventEndDate).toISOString().split("T")[0] + " " + endTime;
    const result = await this.database.query(
      `update ${this.table} set event_type=?, event_date_start=?, event_date_end=?, start_time=?, end_time=?, event_location=?, guests_number=?, childs_number=?, budget=?, important_note=? where id=?`,
      [
        eventType,
        startDate,
        endDate,
        startTime,
        endTime,
        eventLocation,
        guestsNumber,
        childsNumber,
        budget,
        importantNote,
        id,
      ]
    );
    return result;
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
