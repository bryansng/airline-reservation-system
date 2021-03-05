INSERT INTO auth
  (email, hash)
VALUES
  ('hong.sng@ucdconnect.ie', '$2a$10$9d4mara/LTmT97YLHGLU3.8phlLxcCTTuO5LX2PwqGn22jDOjKIWa'),
  ('bond.james@ucdconnect.ie', '$2a$10$9d4mara/LTmT97YLHGLU3.8phlLxcCTTuO5LX2PwqGn22jDOjKIWa'),
  ('wan.obi@ucdconnect.ie', '$2a$10$9d4mara/LTmT97YLHGLU3.8phlLxcCTTuO5LX2PwqGn22jDOjKIWa'),
  ('jobs.steve@ucdconnect.ie', '$2a$10$9d4mara/LTmT97YLHGLU3.8phlLxcCTTuO5LX2PwqGn22jDOjKIWa'),
  ('xuan.liew@ucdconnect.ie', '$2a$10$9d4mara/LTmT97YLHGLU3.8phlLxcCTTuO5LX2PwqGn22jDOjKIWa'),
  ('braddy.yeoh@ucdconnect.ie', '$2a$10$9d4mara/LTmT97YLHGLU3.8phlLxcCTTuO5LX2PwqGn22jDOjKIWa'),
  ('a@a.com', '$2a$10$vEnY95B1hUYQFhz5TXYxCeAmSO/ZxDC792kGmID0p8LnYwnjAwJIG'),
  ('u@u.com', '$2a$10$vEnY95B1hUYQFhz5TXYxCeAmSO/ZxDC792kGmID0p8LnYwnjAwJIG');

INSERT INTO customers
  (first_name, last_name, email, phone_num, address, type, born_on, joined_on, roles, auth_email)
VALUES
  ('Bryan', 'Sng', 'hong.sng@ucdconnect.ie', '339', 'Somewhere on Earth', 'librarian', '1998-01-01', NOW(), 'ADMIN', 'hong.sng@ucdconnect.ie'),
  ('James', 'Bond', 'bond.james@ucdconnect.ie', '007', 'MI6', 'member', '1998-01-01', NOW(), 'USER', 'bond.james@ucdconnect.ie'),
  ('Obi', 'Wan', 'wan.obi@ucdconnect.ie', '69', 'The High Ground', 'member', '1998-01-01', NOW(), 'USER', 'wan.obi@ucdconnect.ie'),
  ('Steve', 'Jobs', 'jobs.steve@ucdconnect.ie', '1234', 'Silicon Valley', 'member', '1998-01-01', NOW(), 'USER', 'jobs.steve@ucdconnect.ie'),
  ('Emily', 'Liew Xuan', 'xuan.liew@ucdconnect.ie', '6954', 'Somewhere in the Universe', 'librarian', '1998-01-01', NOW(), 'ADMIN', 'xuan.liew@ucdconnect.ie'),
  ('Braddy', 'Yeoh', 'braddy.yeoh@ucdconnect.ie', '7749', 'Somewhere in Ireland', 'librarian', '1998-01-01', NOW(), 'ADMIN', 'braddy.yeoh@ucdconnect.ie'),
  ('A', 'A', 'a@a.com', '7749', 'Somewhere in Ireland', 'librarian', '1998-01-01', NOW(), 'ADMIN', 'a@a.com'),
  ('U', 'U', 'u@u.com', '7749', 'Somewhere in Ireland', 'member', '1998-01-01', NOW(), 'USER', 'u@u.com');

INSERT INTO flights
  (id, flight_name, departure_airport, arrival_airport, departure_date_time, arrival_date_time, flight_price, num_of_seats)
VALUES
  ( 1, 'BA 5978', 'DUB', 'LHR', '2021-02-26T18:30:00', '2021-02-26T19:50:00', 158, 24),
  ( 2, 'BA 5954', 'DUB', 'LHR', '2021-02-27T07:30:00', '2021-02-27T09:00:00', 213, 5),
  ( 3, 'BA 5954', 'DUB', 'LHR', '2021-02-28T07:30:00', '2021-02-28T09:00:00', 143, 16),
  ( 4, 'BA 5964', 'DUB', 'LHR', '2021-02-28T12:30:00', '2021-02-28T13:25:00', 143, 7),
  ( 5, 'BA 0827', 'DUB', 'LHR', '2021-02-28T17:10:00', '2021-02-28T18:35:00', 143, 8),
  ( 6, 'BA 0827', 'DUB', 'LHR', '2021-02-28T17:10:00', '2021-02-28T18:35:00', 260, 9),
  ( 7, 'BA 5978', 'DUB', 'LHR', '2021-02-28T18:30:00', '2021-02-28T19:50:00', 213, 22),
  ( 8, 'FR  272', 'DUB', 'LON', '2021-04-01T20:20:00', '2021-04-01T21:35:00', 22, 15),
  ( 9, 'BA  831', 'DUB', 'LON', '2021-04-01T07:30:00', '2021-04-01T09:10:00', 22, 5),
  (10, 'CJ 4461', 'DUB', 'LCY', '2021-04-01T07:00:00', '2021-04-01T08:30:00', 53, 6),

  (11, 'MH 2542', 'KUL', 'KCH', '2021-04-16T07:30:00', '2021-04-16T09:15:00', 57, 9),
  (12, 'AK 5206', 'KUL', 'KCH', '2021-04-16T18:15:00', '2021-04-16T20:00:00', 44, 21),
  (13, 'MH 2536', 'KUL', 'KCH', '2021-04-16T14:05:00', '2021-04-16T15:50:00', 57, 7),
  (14, 'AK 5206', 'KUL', 'KCH', '2021-04-17T18:15:00', '2021-04-17T20:00:00', 44, 25),
  (15, 'AK 5212', 'KUL', 'KCH', '2021-04-18T10:10:00', '2021-04-18T12:00:00', 53, 6),
  (16, 'AK 5212', 'KUL', 'KCH', '2021-04-19T10:10:00', '2021-04-19T12:00:00', 53, 19),
  (17, 'MH 2520', 'KUL', 'KCH', '2021-04-20T11:00:00', '2021-04-20T12:45:00', 57, 13),
  (18, 'AK 5206', 'KUL', 'KCH', '2021-04-21T18:15:00', '2021-04-21T20:00:00', 44, 24),
  (19, 'AK 5206', 'KUL', 'KCH', '2021-04-23T18:15:00', '2021-04-23T20:00:00', 44, 5),
  (20, 'AK 5206', 'KUL', 'KCH', '2021-04-24T18:15:00', '2021-04-24T20:00:00', 44, 15),
  (21, 'AK 5206', 'KUL', 'KCH', '2021-04-26T18:15:00', '2021-04-26T20:00:00', 44, 7),
  (22, 'AK 5212', 'KUL', 'KCH', '2021-04-28T10:10:00', '2021-04-28T12:00:00', 53, 12),

  (23, 'AK 6113', 'PEN', 'KUL', '2021-03-21T09:25:00', '2021-03-21T10:30:00', 25, 13),
  (24, 'AK 6113', 'PEN', 'KUL', '2021-03-22T09:25:00', '2021-03-22T10:30:00', 25, 17),
  (25, 'AK 6129', 'PEN', 'KUL', '2021-03-19T20:45:00', '2021-03-19T21:50:00', 25, 7),
  (26, 'AK 6129', 'PEN', 'KUL', '2021-03-18T20:45:00', '2021-03-18T21:50:00', 25, 10),
  (27, 'SL 1173', 'PEN', 'SZB', '2021-03-18T20:40:00', '2021-03-18T21:40:00', 31, 12),
  (28, 'SL 1181', 'PEN', 'SZB', '2021-03-18T09:40:00', '2021-03-18T10:40:00', 31, 34),
  (29, 'SL 1167', 'PEN', 'SZB', '2021-03-18T17:50:00', '2021-03-18T18:50:00', 31, 23),
  (30, 'SL 1173', 'PEN', 'SZB', '2021-03-15T20:40:00', '2021-03-15T21:40:00', 31, 3),

  (31, 'AA 1249', 'LGA', 'MIA', '2021-04-01T06:00:00', '2021-04-01T09:04:00', 58, 4),
  (32, 'F9 2879', 'LGA', 'MIA', '2021-04-01T22:45:00', '2021-04-02T01:46:00', 40, 23);

INSERT INTO credit_card_details
  (customer_id, name_on_card, card_number, expiry_date, security_code)
VALUES
  (1, 'Braddy Yeoh', '4319123412341234', '04/20', '123'),
  (1, 'Braddy Yeoh', '4319432143214321', '05/23', '321'),
  (2, 'Cao Cao', '4319567834532343', '01/24', '345'),
  (3, 'Liu Bei', '5230132245653455', '04/22', '456');
  -- (1, 'Braddy Yeoh', '4319 1234 1234 1234', '04/20', '123'),
  -- (1, 'Braddy Yeoh', '4319 4321 4321 4321', '05/23', '321'),
  -- (2, 'Cao Cao', '4319 5678 3453 2343', '01/24', '345'),
  -- (3, 'Liu Bei', '5230 1322 4565 3455', '04/22', '456');

-- --
-- INSERT INTO books(id, book_name, isbn)
-- VALUES (1, "Thinking Fast", "1234");
-- INSERT INTO books(id, book_name, isbn)
-- VALUES (2, "Harry Potter", "1235");
-- INSERT INTO books(id, book_name, isbn)
-- VALUES (3, "Madame Bovary", "1010");

-- -- Create and Populate the New Tables
-- /* create table authors(
-- id INT NOT NULL AUTO_INCREMENT,
-- author_first_name VARCHAR(20) NOT NULL,
-- author_last_name VARCHAR(20) NOT NULL, PRIMARY KEY (id)); */
-- INSERT INTO authors(id, author_first_name, author_last_name)
-- VALUES (1, "Daniel", "Kanheman");
-- INSERT INTO authors(id, author_first_name, author_last_name)
-- VALUES (2, "Gustav", "Flaubert");
-- INSERT INTO authors(id, author_first_name, author_last_name)
-- VALUES (3, "Joanne K.", "Rowling");
-- INSERT INTO authors(id, author_first_name, author_last_name)
-- VALUES (4, "Amos", "Tversky");


-- -- Create and Populate the “authorship” table
-- /* create table authorship(
-- id_book INT NOT NULL,
-- id_author INT NOT NULL,
-- PRIMARY KEY (id_book, id_author)); */
-- INSERT INTO authorship(id_book, id_author) VALUES (3,1);
-- INSERT INTO authorship(id_book, id_author) VALUES (3,4);
-- INSERT INTO authorship(id_book, id_author) VALUES (5,3);
-- INSERT INTO authorship(id_book, id_author) VALUES (6,2);
