INSERT INTO auth(email, hash) VALUES
	('hong.sng@ucdconnect.ie', '$2a$10$9d4mara/LTmT97YLHGLU3.8phlLxcCTTuO5LX2PwqGn22jDOjKIWa'),
	('bond.james@ucdconnect.ie', '$2a$10$9d4mara/LTmT97YLHGLU3.8phlLxcCTTuO5LX2PwqGn22jDOjKIWa'),
	('wan.obi@ucdconnect.ie', '$2a$10$9d4mara/LTmT97YLHGLU3.8phlLxcCTTuO5LX2PwqGn22jDOjKIWa'),
	('jobs.steve@ucdconnect.ie', '$2a$10$9d4mara/LTmT97YLHGLU3.8phlLxcCTTuO5LX2PwqGn22jDOjKIWa'),
	('xuan.liew@ucdconnect.ie', '$2a$10$9d4mara/LTmT97YLHGLU3.8phlLxcCTTuO5LX2PwqGn22jDOjKIWa'),
	('braddy.yeoh@ucdconnect.ie', '$2a$10$9d4mara/LTmT97YLHGLU3.8phlLxcCTTuO5LX2PwqGn22jDOjKIWa'),
	('a@a.com', '$2a$10$vEnY95B1hUYQFhz5TXYxCeAmSO/ZxDC792kGmID0p8LnYwnjAwJIG'),
	('u@u.com', '$2a$10$vEnY95B1hUYQFhz5TXYxCeAmSO/ZxDC792kGmID0p8LnYwnjAwJIG');

INSERT INTO customers(full_name, email, mobile_number, address, type, born_on, joined_on, roles, auth_email) VALUES
	('Bryan Sng', 'hong.sng@ucdconnect.ie', '339', 'Somewhere on Earth', 'librarian', '1998-01-01', NOW(), 'ADMIN', 'hong.sng@ucdconnect.ie'),
	('James Bond', 'bond.james@ucdconnect.ie', '007', 'MI6', 'member', '1998-01-01', NOW(), 'USER', 'bond.james@ucdconnect.ie'),
	('Obi Wan', 'wan.obi@ucdconnect.ie', '69', 'The High Ground', 'member', '1998-01-01', NOW(), 'USER', 'wan.obi@ucdconnect.ie'),
	('Steve Jobs', 'jobs.steve@ucdconnect.ie', '1234', 'Silicon Valley', 'member', '1998-01-01', NOW(), 'USER', 'jobs.steve@ucdconnect.ie'),
	('Emily Liew Xuan', 'xuan.liew@ucdconnect.ie', '6954', 'Somewhere in the Universe', 'librarian', '1998-01-01', NOW(), 'ADMIN', 'xuan.liew@ucdconnect.ie'),
	('Braddy Yeoh', 'braddy.yeoh@ucdconnect.ie', '7749', 'Somewhere in Ireland', 'librarian', '1998-01-01', NOW(), 'ADMIN', 'braddy.yeoh@ucdconnect.ie'),
	('A A', 'a@a.com', '7749', 'Somewhere in Ireland', 'librarian', '1998-01-01', NOW(), 'ADMIN', 'a@a.com'),
	('U U', 'u@u.com', '7749', 'Somewhere in Ireland', 'member', '1998-01-01', NOW(), 'USER', 'u@u.com');

INSERT INTO flights(id, flight_price) VALUES ('42069', '13.3');