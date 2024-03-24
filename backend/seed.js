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
    queries.push(
      database.query(
        "insert into events (event_type, event_date_start, event_date_end, start_time, end_time, event_location, guests_number,childs_number, budget, important_note) values ('baby_shower', '2024-06-01', '2024-06-01', '14:00', '18:00', 'Lyon', 30, 10, 1500, 'Baby shower pour une petite fille')"
      )
    );
    queries.push(
      database.query(
        "insert into events (event_type, event_date_start, event_date_end, start_time, end_time, event_location, guests_number,childs_number, budget, important_note) values ('baptism', '2024-07-15', '2024-07-15', '10:00', '15:00', 'Marseille', 50, 15, 3000, 'Baptême traditionnel en église')"
      )
    );
    queries.push(
      database.query(
        "insert into events (event_type, event_date_start, event_date_end, start_time, end_time, event_location, guests_number,childs_number, budget, important_note) values ('gender_reveal', '2024-08-20', '2024-08-20', '16:00', '20:00', 'Toulouse', 20, 5, 1000, 'Révélation du genre avec ballons')"
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
        "insert into customers (event_id, prospect_source, customer_type, civility, lastname, firstname, email, phone, job, date_of_birth,  place_of_birth, nationality, address, zip_code, city, country) values (2, 'facebook', 'single', 'mr', 'Proust', 'Charles', 'charlesproust@mail.com', '0612121212', 'webDev', '1989-06-12', 'Bordeaux', 'Française', '12 rue du pixel', '33000', 'Bordeaux', 'France')"
      )
    );
    queries.push(
      database.query(
        "insert into customers (event_id, prospect_source, customer_type, civility, lastname, firstname, email, phone, job, date_of_birth,  place_of_birth, nationality, address, zip_code, city, country) values (3, 'instagram', 'couple', 'mr', 'Smith', 'Robert', 'robertsmith@mail.com', '0600000000', 'Ingénieur', '1980-01-01', 'Paris', 'Française', '1 rue de la paix', '75000', 'Paris', 'France')"
      )
    );
    queries.push(
      database.query(
        "insert into customers (event_id, prospect_source, customer_type, civility, lastname, firstname, email, phone, job, date_of_birth,  place_of_birth, nationality, address, zip_code, city, country) values (3, 'instagram', 'couple', 'mrs', 'Smith', 'Emily', 'emilysmith@mail.com', '0600000000', 'Design', '1985-05-02', 'Paris', 'Française', '1 rue de la paix', '75000', 'Paris', 'France')"
      )
    );
    queries.push(
      database.query(
        "insert into customers (event_id, prospect_source, customer_type, civility, lastname, firstname, email, phone, job, date_of_birth,  place_of_birth, nationality, address, zip_code, city, country) values (4, 'instagram', 'couple', 'mr', 'Johnson', 'Michael', 'michaeljohnson@mail.com', '0600000000', 'Ingénieur', '1980-01-01', 'Paris', 'Française', '1 rue de la paix', '75000', 'Paris', 'France')"
      )
    );
    queries.push(
      database.query(
        "insert into customers (event_id, prospect_source, customer_type, civility, lastname, firstname, email, phone, job, date_of_birth,  place_of_birth, nationality, address, zip_code, city, country) values (4, 'instagram', 'couple', 'mrs', 'Johnson', 'Linda', 'lindajohnson@mail.com', '0600000000', 'Design', '1985-05-02', 'Paris', 'Française', '1 rue de la paix', '75000', 'Paris', 'France')"
      )
    );
    queries.push(
      database.query(
        "insert into customers (event_id, prospect_source, customer_type, civility, lastname, firstname, email, phone, job, date_of_birth,  place_of_birth, nationality, address, zip_code, city, country) values (5, 'facebook', 'couple', 'mr', 'Brown', 'David', 'davidbrown@mail.com', '0612121212', 'webDev', '1989-06-12', 'Bordeaux', 'Française', '12 rue du pixel', '33000', 'Bordeaux', 'France')"
      )
    );
    queries.push(
      database.query(
        "insert into customers (event_id, prospect_source, customer_type, civility, lastname, firstname, email, phone, job, date_of_birth,  place_of_birth, nationality, address, zip_code, city, country) values (5, 'facebook', 'couple', 'mrs', 'Brown', 'Susan', 'susanbrown@mail.com', '0612121212', 'webDev', '1989-06-12', 'Bordeaux', 'Française', '12 rue du pixel', '33000', 'Bordeaux', 'France')"
      )
    );

    await database.query("delete from providers");
    queries.push(
      database.query(
        "insert into providers (civility, name, lastname, firstname, provider_type, email, phone, address, zip_code, city, country) values ('mr', 'la bonne fourchette', 'Jean', 'Jean', 'traiteur', 'test@mail.com', '0600000000', '1 rue de la paix', '75000', 'Paris', 'France')"
      )
    );
    queries.push(
      database.query(
        "insert into providers (civility, name, lastname, firstname, provider_type, email, phone, address, zip_code, city, country) values ('mr', 'la belle rose', 'Jean', 'Jean', 'fleuriste', 'test2@mail.com', '0600000000', '1 rue de la paix', '75000', 'Paris', 'France')"
      )
    );
    queries.push(
      database.query(
        "insert into providers (civility, name, lastname, firstname, provider_type, email, phone, address, zip_code, city, country) values ('mr', 'DJ', 'Jean', 'Jean', 'DJ sound', 'test3@mail.com', '0600000000', '1 rue de la paix', '75000', 'Paris', 'France')"
      )
    );
    queries.push(
      database.query(
        "insert into providers (civility, name, lastname, firstname, provider_type, email, phone, address, zip_code, city, country) values ('mr', 'Le Bon Gâteau', 'Pierre', 'Pierre', 'pâtissier', 'pierre@mail.com', '0600000001', '1 rue de la paix', '75000', 'Paris', 'France')"
      )
    );
    queries.push(
      database.query(
        "insert into providers (civility, name, lastname, firstname, provider_type, email, phone, address, zip_code, city, country) values ('mr', 'Les Belles Décorations', 'Paul', 'Paul', 'décorateur', 'paul@mail.com', '0600000002', '1 rue de la paix', '75000', 'Paris', 'France')"
      )
    );
    queries.push(
      database.query(
        "insert into providers (civility, name, lastname, firstname, provider_type, email, phone, address, zip_code, city, country) values ('mr', 'Lumière et Son', 'Jacques', 'Jacques', 'technicien', 'jacques@mail.com', '0600000003', '1 rue de la paix', '75000', 'Paris', 'France')"
      )
    );
    queries.push(
      database.query(
        "insert into providers (civility, name, lastname, firstname, provider_type, email, phone, address, zip_code, city, country) values ('mr', 'Photographe Pro', 'Robert', 'Robert', 'photographe', 'robert@mail.com', '0600000004', '1 rue de la paix', '75000', 'Paris', 'France')"
      )
    );
    queries.push(
      database.query(
        "insert into providers (civility, name, lastname, firstname, provider_type, email, phone, address, zip_code, city, country) values ('mr', 'Vidéaste', 'Simon', 'Simon', 'vidéaste', 'simon@mail.com', '0600000005', '1 rue de la paix', '75000', 'Paris', 'France')"
      )
    );
    queries.push(
      database.query(
        "insert into providers (civility, name, lastname, firstname, provider_type, email, phone, address, zip_code, city, country) values ('mr', 'Le Bon Gâteau', 'Pierre', 'Pierre', 'pâtissier', 'pierre@mail.com', '0600000001', '1 rue de la paix', '75000', 'Paris', 'France')"
      )
    );
    queries.push(
      database.query(
        "insert into providers (civility, name, lastname, firstname, provider_type, email, phone, address, zip_code, city, country) values ('mr', 'Les Belles Décorations', 'Paul', 'Paul', 'décorateur', 'paul@mail.com', '0600000002', '1 rue de la paix', '75000', 'Paris', 'France')"
      )
    );
    queries.push(
      database.query(
        "insert into providers (civility, name, lastname, firstname, provider_type, email, phone, address, zip_code, city, country) values ('mr', 'Lumière et Son', 'Jacques', 'Jacques', 'technicien', 'jacques@mail.com', '0600000003', '1 rue de la paix', '75000', 'Paris', 'France')"
      )
    );
    queries.push(
      database.query(
        "insert into providers (civility, name, lastname, firstname, provider_type, email, phone, address, zip_code, city, country) values ('mr', 'Photographe Pro', 'Robert', 'Robert', 'photographe', 'robert@mail.com', '0600000004', '1 rue de la paix', '75000', 'Paris', 'France')"
      )
    );
    queries.push(
      database.query(
        "insert into providers (civility, name, lastname, firstname, provider_type, email, phone, address, zip_code, city, country) values ('mr', 'Vidéaste', 'Simon', 'Simon', 'vidéaste', 'simon@mail.com', '0600000005', '1 rue de la paix', '75000', 'Paris', 'France')"
      )
    );
    queries.push(
      database.query(
        "insert into providers (civility, name, lastname, firstname, provider_type, email, phone, address, zip_code, city, country) values ('mr', 'Le Bon Vin', 'François', 'François', 'sommelier', 'francois@mail.com', '0600000006', '1 rue de la paix', '75000', 'Paris', 'France')"
      )
    );
    queries.push(
      database.query(
        "insert into providers (civility, name, lastname, firstname, provider_type, email, phone, address, zip_code, city, country) values ('mr', 'Les Belles Tables', 'Louis', 'Louis', 'location de matériel', 'louis@mail.com', '0600000007', '1 rue de la paix', '75000', 'Paris', 'France')"
      )
    );
    queries.push(
      database.query(
        "insert into providers (civility, name, lastname, firstname, provider_type, email, phone, address, zip_code, city, country) values ('mr', 'Animation Fun', 'Nicolas', 'Nicolas', 'animateur', 'nicolas@mail.com', '0600000008', '1 rue de la paix', '75000', 'Paris', 'France')"
      )
    );
    queries.push(
      database.query(
        "insert into providers (civility, name, lastname, firstname, provider_type, email, phone, address, zip_code, city, country) values ('mr', 'Photographe Pro Plus', 'Olivier', 'Olivier', 'photographe', 'olivier@mail.com', '0600000009', '1 rue de la paix', '75000', 'Paris', 'France')"
      )
    );
    queries.push(
      database.query(
        "insert into providers (civility, name, lastname, firstname, provider_type, email, phone, address, zip_code, city, country) values ('mr', 'Vidéaste Pro', 'Patrick', 'Patrick', 'vidéaste', 'patrick@mail.com', '0600000010', '1 rue de la paix', '75000', 'Paris', 'France')"
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
