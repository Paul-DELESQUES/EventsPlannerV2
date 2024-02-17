drop table if exists calendar;
drop table if exists customers;
drop table if exists events;
drop table if exists todolist;
drop table if exists types;
drop table if exists users;

create table users (
  id int auto_increment primary key,
  email varchar(100) unique not null,
  hash_password text not null,
  lastname varchar(80) not null,
  firstname varchar(80) not null,
  created_date datetime,
  last_connection datetime,
  constraint unique_email unique (email)
);

create table events (
  id int auto_increment primary key,
  event_type enum('wedding', 'baptism', 'gender_reveal', 'baby_shower', 'anniversary', 'evjf', 'evg', 'other') not null,
  event_date_start date,
  event_date_end date,
  start_time time,
  end_time time,
  event_location varchar(100),
  guests_number int,
  childs_number int,
  budget int,
  important_note text
);

create table customers (
  id int auto_increment primary key,
  user_id int unique,
  event_id int not null,
  prospect_source enum('word_of_mouth', 'instagram', 'facebook', 'mariage.net', 'linkedin') not null,
  customer_type enum('single', 'couple', 'professional') not null,
  civility enum('mr', 'mrs') not null,
  lastname varchar(80) not null,
  firstname varchar(80) not null,
  email varchar(100) not null,
  phone varchar(15) not null,
  job varchar(100),
  date_of_birth datetime,
  place_of_birth varchar(100),
  nationality varchar(80),
  address varchar(255),
  zip_code varchar(5),
  city varchar(100),
  country varchar(100),
  created_date datetime
);

create table calendar (
  id int auto_increment primary key,
  event_id int not null,
  user_id int unique,
  title varchar(100),
  description text
);

create table todolist (
  id int auto_increment primary key,
  user_id int unique,
  title varchar(100) not null,
  description text not null,
  status enum('todo', 'in progress', 'completed') not null
);