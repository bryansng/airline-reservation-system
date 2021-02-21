INSERT INTO auth(email, hash) VALUES
	('hong.sng@ucdconnect.ie', '$2a$10$9d4mara/LTmT97YLHGLU3.8phlLxcCTTuO5LX2PwqGn22jDOjKIWa'),
	('bond.james@ucdconnect.ie', '$2a$10$9d4mara/LTmT97YLHGLU3.8phlLxcCTTuO5LX2PwqGn22jDOjKIWa'),
	('wan.obi@ucdconnect.ie', '$2a$10$9d4mara/LTmT97YLHGLU3.8phlLxcCTTuO5LX2PwqGn22jDOjKIWa'),
	('jobs.steve@ucdconnect.ie', '$2a$10$9d4mara/LTmT97YLHGLU3.8phlLxcCTTuO5LX2PwqGn22jDOjKIWa'),
	('xuan.liew@ucdconnect.ie', '$2a$10$9d4mara/LTmT97YLHGLU3.8phlLxcCTTuO5LX2PwqGn22jDOjKIWa'),
	('braddy.yeoh@ucdconnect.ie', '$2a$10$9d4mara/LTmT97YLHGLU3.8phlLxcCTTuO5LX2PwqGn22jDOjKIWa'),
	('a@a.com', '$2a$10$vEnY95B1hUYQFhz5TXYxCeAmSO/ZxDC792kGmID0p8LnYwnjAwJIG'),
	('u@u.com', '$2a$10$vEnY95B1hUYQFhz5TXYxCeAmSO/ZxDC792kGmID0p8LnYwnjAwJIG');

INSERT INTO customers(full_name, email, mobile_number, address, type, born_on, joined_on, last_active_on, roles, auth_email) VALUES
	('Bryan Sng', 'hong.sng@ucdconnect.ie', '339', 'Somewhere on Earth', 'librarian', '1998-01-01', NOW(), NOW(), 'ADMIN', 'hong.sng@ucdconnect.ie'),
	('James Bond', 'bond.james@ucdconnect.ie', '007', 'MI6', 'member', '1998-01-01', NOW(), NOW(), 'USER', 'bond.james@ucdconnect.ie'),
	('Obi Wan', 'wan.obi@ucdconnect.ie', '69', 'The High Ground', 'member', '1998-01-01', NOW(), NOW(), 'USER', 'wan.obi@ucdconnect.ie'),
	('Steve Jobs', 'jobs.steve@ucdconnect.ie', '1234', 'Silicon Valley', 'member', '1998-01-01', NOW(), NOW(), 'USER', 'jobs.steve@ucdconnect.ie'),
	('Emily Liew Xuan', 'xuan.liew@ucdconnect.ie', '6954', 'Somewhere in the Universe', 'librarian', '1998-01-01', NOW(), NOW(), 'ADMIN', 'xuan.liew@ucdconnect.ie'),
	('Braddy Yeoh', 'braddy.yeoh@ucdconnect.ie', '7749', 'Somewhere in Ireland', 'librarian', '1998-01-01', NOW(), NOW(), 'ADMIN', 'braddy.yeoh@ucdconnect.ie'),
	('A A', 'a@a.com', '7749', 'Somewhere in Ireland', 'librarian', '1998-01-01', NOW(), NOW(), 'ADMIN', 'a@a.com'),
	('U U', 'u@u.com', '7749', 'Somewhere in Ireland', 'member', '1998-01-01', NOW(), NOW(), 'USER', 'u@u.com');

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