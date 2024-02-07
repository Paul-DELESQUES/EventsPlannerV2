const EventRules = require("../utils/eventsValidator");
const AbstractManager = require("./AbstractManager");

class CustomerManager extends AbstractManager {
  constructor() {
    super({ table: "customers" });
  }

  // C

  async create({
    eventId,
    prospectSource,
    customerType,
    civility,
    lastname,
    firstname,
    email,
    phone,
    job,
    dateOfBirth,
    placeOfBirth,
    nationality,
    address,
    zipCode,
    city,
    country,
  }) {
    const [rows] = await this.database.query(
      `insert into ${this.table} ( 
        event_id,
        prospect_source,
        customer_type,
        civility,
        lastname,
        firstname,
        email,
        phone,
        job,
        date_of_birth,
        place_of_birth,
        nationality,
        address,
        zip_code,
        city,
        country,
        created_date) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,NOW())`,
      [
        eventId,
        prospectSource,
        customerType,
        civility,
        lastname,
        firstname,
        email,
        phone,
        job,
        dateOfBirth,
        placeOfBirth,
        nationality,
        address,
        zipCode,
        city,
        country,
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

  async readForCustomersList() {
    const [rows] = await this.database.query(`select * from ${this.table}`);
    return rows.map((customer) => ({
      id: customer.id,
      firstname: customer.firstname,
      lastname: customer.lastname,
      source: customer.prospect_source,
      createdAt: customer.created_date,
    }));
  }

  async readAll() {
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of items
    return rows;
  }

  async readForCalendar() {
    const [rows] = await this.database.query(`
      SELECT events.id, events.event_type, events.event_location, events.event_date_start, events.event_date_end, events.start_time, events.end_time, GROUP_CONCAT(customers.firstname SEPARATOR ' & ') as customerNames
      FROM events
      INNER JOIN ${this.table} ON events.id = ${this.table}.event_id
      GROUP BY events.id
    `);

    return rows.map((event) => ({
      id: event.id,
      eventType: event.event_type,
      eventLocation: event.event_location,
      startDate: event.event_date_start,
      endDate: event.event_date_end,
      startTime: event.start_time,
      endTime: event.end_time,
      customerNames: event.customerNames,
    }));
  }

  async readForEventPage() {
    const [rows] = await this.database.query(`
        SELECT customers.firstname, events.id, events.event_date_start, events.event_type, events.event_location 
        FROM ${this.table} 
        INNER JOIN events ON ${this.table}.event_id = events.id
    `);

    return rows.map((e) => ({
      id: e.id,
      customerName: e.firstname,
      eventDateStart: e.event_date_start,
      eventType: e.event_type,
      eventLocation: e.event_location,
    }));
  }

  // U

  async update({
    prospectSource,
    customerType,
    lastname,
    firstname,
    email,
    phone,
    job,
    dateOfBirth,
    placeOfBirth,
    nationality,
    address,
    zipCode,
    city,
    country,
  }) {
    const [rows] = await this.database.query(
      `update ${this.table} set prospect_source=?, customer_type=?, lastname=?, firstname=?, email=?, phone=?, job=?, date_of_birth=?, place_of_birth=?, nationality=?, address=?, zip_code=?, city=?, country=?`,
      [
        prospectSource,
        customerType,
        lastname,
        firstname,
        email,
        phone,
        job,
        dateOfBirth,
        placeOfBirth,
        nationality,
        address,
        zipCode,
        city,
        country,
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

  async getEventTypeByEventId(eventId) {
    const [rows] = await this.database.query(
      `select event_type from events where id = ?`,
      [eventId]
    );
    return rows[0].event_type;
  }

  async getNbCustomersPerEvent(eventId) {
    const [rows] = await this.database.query(
      `select count(*) as count from customers where event_id = ?`,
      [eventId]
    );
    return rows[0].count;
  }

  async isEventComplete(eventId) {
    const eventType = await this.getEventTypeByEventId(eventId);
    const { nbCustomers } = EventRules[eventType];
    const nbCustomersPerEvent = await this.getNbCustomersPerEvent(eventId);
    return nbCustomersPerEvent === nbCustomers;
  }
}

module.exports = CustomerManager;
