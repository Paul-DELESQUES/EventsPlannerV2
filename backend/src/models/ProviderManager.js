const AbstractManager = require("./AbstractManager");

class ProviderManager extends AbstractManager {
  constructor() {
    super({ table: "providers" });
  }

  // C

  async create({
    civility,
    lastname,
    firstname,
    name,
    providerType,
    email,
    phone,
    address,
    zipCode,
    city,
    country,
  }) {
    const [rows] = await this.database.query(
      `insert into ${this.table} ( 
        civility,
        name,
        lastname,
        firstname,
        provider_type,
        email,
        phone,
        address,
        zip_code,
        city,
        country,
        created_date) values (?,?,?,?,?,?,?,?,?,?,?,NOW())`,
      [
        civility,
        name,
        lastname,
        firstname,
        providerType,
        email,
        phone,
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

  async readAll() {
    const [rows] = await this.database.query(`select * from ${this.table}`);

    return rows;
  }

  // U

  async update({
    civility,
    name,
    lastname,
    firstname,
    providerType,
    email,
    phone,
    address,
    zipCode,
    city,
    country,
  }) {
    const [rows] = await this.database.query(
      `update ${this.table} set civility=?, name=?, lastname=?, firstname=?, provider_type=?, email=?, phone=?, address=?, zip_code=?, city=?, country=?`,
      [
        civility,
        name,
        lastname,
        firstname,
        providerType,
        email,
        phone,
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
}

module.exports = ProviderManager;
