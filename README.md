# Airline Reservation System

A COMP47660 Secure Software Engineering web app project built using React, Spring-Boot, and MySQL by a team of three following the Scrum methodology.

## Getting Started

### Running the project

1. [Download](https://github.com/bryansng/airline-reservation-system) or run `git clone https://github.com/bryansng/airline-reservation-system.git` for this project
2. In order to enforce the use of HTTPs for localhost in the browser, the browser must be configured to use the newly created local certificate. The certificate will need to be added to your computer’s Trusted Root Certification Authorities. Google and follow the browser’s instructions to add the local certificate. The local certificate is called ars.p12, and can found in /backend/src/main/resources/keystore. Further details on generating and the use of this certificate can be found in "3. Enforce the use of HTTPS" in the attached report.
3. Go to the root of this project and open two (2) terminals
4. On the first terminal run
   ```
   cd backend &&
   mvn install &&
   mvn spring-boot:run
   ```
5. On the second terminal run
   ```
   cd frontend &&
   npm install &&
   npm start
   ```

### Testing the project

We inserted some fake data (see `data.sql` in `backend\src\main\resources`) to facilitate testing.

1. Searching for available flights: Try `KUL to KCH on tomorrow's date` or `KUL to KCH on 16/04`. Search returns all flights from the date specified onwards, as there are limited flights in our database.
2. Cancelling reservations within 24hrs: Book a flight under **TST 0001** (KUL to KCH on tomorrow's date) for both guest and member accounts to test this feature.
3. Registering with an email you used to book guest flights will link the guest flights to the member account.
4. Logging in with the following details will allow you to test Executive Club Member features quickly as it already has booked flights and saved credit cards recorded.
   ```
   Email address: hong.sng@ucdconnect.ie
   Password: root
   ```
5. You can also login as admin to test admin features, e.g. modifying flights and reservations. The admin's login credentials are:
   ```
   Email address: admin@admin.com
   Password: root
   ```

### Frontend usage notes

- Clicking cancel when booking a flight cancels the entire booking process, therefore users will have to restart the booking process from scratch.

### Admin create/update/delete flights & reservations notes
- Admins have access to pages `/flight` and `/reservation` to view all flights and reservations, they can create/update/delete flights/reservations from this page.
- Creating reservations as an admin does not require payment methods.
- Editing reservation comes in three flavours: changing the reservation status, editing existing passenger details, and adding/deleting passengers and changing flights.
- Deleting flights: Flights with existing reservations cannot be removed from the database.
- Deleting reservations: Reservations are marked as cancelled instead of being removed from the database.

## Built With

- [Spring-Boot](https://spring.io/projects/spring-boot) - The application framework used
- [Maven](https://maven.apache.org/) - Dependency Management
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [npm](https://www.npmjs.com/) - A package manager for JavaScript
- [MySQL](https://www.mysql.com/) - Relational Database

---

## Acknowledgments

- Professor Liliana Pasquale
- TA Déaglán Connolly Bree

Built by @bryansng, @lxemily, and @yeohbraddy in Feb 2021 - May 2021
