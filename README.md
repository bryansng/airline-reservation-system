# Airline Reservation System

A COMP47660 Secure Software Engineering web app project built using React, Spring-Boot, and MySQL by a team of three following the Scrum methodology.

## Getting Started

### Running the project

1. [Download](https://github.com/bryansng/airline-reservation-system) or run `git clone https://github.com/bryansng/airline-reservation-system.git` for this project
2. Go to the root of this project and open two (2) terminals
3. On the first terminal run
   ```
   cd backend &&
   mvn install &&
   mvn spring-boot:run
   ```
4. On the second terminal run
   ```
   cd frontend &&
   npm install &&
   npm start
   ```
### Testing the project

We inserted some fake data (see `data.sql` in `backend\src\main\resources`) to facilitate testing.

1. Searching for available flights: Try `KUL to KCH on tomorrow's date` or `KUL to KCH on 16/04`. Search returns all flights from the date specified onwards, as there are limited flights in our db.
2. Cancelling reservations within 24hrs: Book **TST 0001** (KUL to KCH on tomorrow's date) to for both guest and member accounts.
3. Registering with an email you used to book guest flights will link the guest flights to the member account.
4. Logging in with the following details will allow you to test Executive Club Member features quickly as it already has booked flights and saved credit cards recorded.
   ```
   Email address: hong.sng@ucdconnect.ie
   Password: root
   ```


## Built With

- [Spring-Boot](https://spring.io/projects/spring-boot) - The application framework used
- [Maven](https://maven.apache.org/) - Dependency Management
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [npm](https://www.npmjs.com/) - A package manager for JavaScript
- [MySQL](https://www.mysql.com/) - Relational Database

## Diary

---

### **Braddy**

#### Tasks

- Designed Executive Club Member and credit card frontend wireframe
- Implemented Executive Club Member and credit card related entities
- Implemented Executive Club Member and credit card endpoints
- Implemented frontend for Executive Club Member profile

#### Percentage of Contribution

- Bryan - 33.34
- Emily - 33.33
- Braddy - 33.33

---

### **Bryan**

#### Tasks

- Designed API and endpoints
- Implemented booking and reservation related entities
- Implemented booking and reservation endpoints
- Implemented frontend for booking and reservation
- Implemented authentication
- Implemented login and register endpoints
- Reworked add/edit credit cards from Executive Club Member portal
  - existsByCardNumber returns a credit card object or null, causing add/edit credit card details endpoint to show internal server error
  - add/edit credit card details forms on Executive Member club portal do not show appropriate error messages and wipes the form on submit

#### Percentage of Contribution

- Bryan - 33.34
- Emily - 33.33
- Braddy - 33.33

---

### **Emily**

#### Tasks

- Designed flights, booking, and reservation frontend wireframes
- Implemented flight and search related entities
- Implemented search and flight endpoints
- Implemented flight and search frontend
- Reworked Executive Club Member profile frontend
  - edit personal details form unable does not show appropriate error messages and wipes the form on submit

#### Percentage of Contribution

- Bryan - 33.34
- Emily - 33.33
- Braddy - 33.33

---

## Acknowledgments

- Professor Liliana Pasquale
- TA Déaglán Connolly Bree

Built by @bryansng, @lxemily, and @yeohbraddy in Feb 2021 - Mar 2021
