/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

// Load environment variables from .env file
require("dotenv").config();

// Import database client
const database = require("./database/client");

const seed = async () => {
  try {
    // Declare an array to store the query promises
    // See why here: https://eslint.org/docs/latest/rules/no-await-in-loop
    const queries = [];

    /* ************************************************************************* */

    // Generating Seed Data

    // Insert Initial data into the database db_event_planner

    await database.query("delete from events");
    queries.push(
      database.query(
        "insert into events (event_type, event_date_start, event_date_end, start_time, end_time, event_location, guests_number,childs_number, budget, important_note) values ('wedding', '2024-04-21', '2024-04-21', '10:00', '23:00', 'Montpellier', 100, 20, 20000, 'Cérémonie laïque dans le jardin, cocktail dans la galerie des glaces, dîner dans la galerie des batailles, soirée dansante dans la galerie des batailles')"
      )
    );
    queries.push(
      database.query(
        "insert into events (event_type, event_date_start, event_date_end, start_time, end_time, event_location, guests_number,childs_number, budget, important_note) values ('anniversary', '2024-03-15', '2024-03-15', '10:00', '22:00', 'Montpellier', 25, 5, 2000, 'test anniversaire')"
      )
    );

    await database.query("delete from customers");
    queries.push(
      database.query(
        "insert into customers (event_id, prospect_source, customer_type, civility, lastname, firstname, email, phone, job, date_of_birth,  place_of_birth, nationality, address, zip_code, city, country) values (1, 'instagram', 'couple', 'mr', 'Doe', 'John', 'johndoe@mail.com', '0600000000', 'Ingénieur', '1980-01-01', 'Paris', 'Française', '1 rue de la paix', '75000', 'Paris', 'France')"
      )
    );
    queries.push(
      database.query(
        "insert into customers (event_id, prospect_source, customer_type, civility, lastname, firstname, email, phone, job, date_of_birth,  place_of_birth, nationality, address, zip_code, city, country) values (1, 'instagram', 'couple', 'mrs', 'Connor', 'Jane', 'janeconnor@mail.com', '0600000000', 'Design', '1985-05-02', 'Paris', 'Française', '1 rue de la paix', '75000', 'Paris', 'France')"
      )
    );
    queries.push(
      database.query(
        "insert into customers (event_id, prospect_source, customer_type, civility, lastname, firstname, email, phone, job, date_of_birth,  place_of_birth, nationality, address, zip_code, city, country) values (2, 'facebook', 'single', 'mr', 'Proust', 'Charles', 'pixelperfect@mail.com', '0612121212', 'webDev', '1989-06-12', 'Bordeaux', 'Française', '12 rue du pixel', '33000', 'Bordeaux', 'France')"
      )
    );

    await database.query("delete from todolist");
    queries.push(
      database.query(
        "insert into todolist (title, description, status) values ('Cérémonie laïque', 'Cérémonie laïque dans le jardin', 'todo')"
      )
    );
    queries.push(
      database.query(
        "insert into todolist (title, description, status) values ('Cocktail', 'Cocktail dans la galerie des glaces', 'todo')"
      )
    );
    queries.push(
      database.query(
        "insert into todolist (title, description, status) values ('Dîner', 'Dîner dans la galerie des batailles', 'todo')"
      )
    );

    /* ************************************************************************* */

    // Wait for all the insertion queries to complete
    await Promise.all(queries);

    // Close the database connection
    database.end();

    console.info(`${database.databaseName} filled from ${__filename} 🌱`);
  } catch (err) {
    console.error("Error filling the database:", err.message);
  }
};

// Run the seed function
seed();
