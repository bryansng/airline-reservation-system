import React, { useState, useEffect, useMemo } from "react";
import { useTable, useGlobalFilter, useAsyncDebounce } from "react-table";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import ErrorMessage from "../Common/ErrorMessage";
import Emoji from "../Common/Emoji";
import Button from "../Common/Button";
import Dropdown from "react-bootstrap/Dropdown";
import * as dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { rest_endpoints } from "../../config/rest_endpoints.json";
const { reservation: reservation_apis } = rest_endpoints.admin;
dayjs.extend(isBetween);

const ShowAllReservations = ({ location, token }) => {
  const [isErrorMessage, setIsErrorMessage] = useState(
    location.state && location.state.isErrorResponse ? true : false
  );
  const [errorMessage, setErrorMessage] = useState(
    location.state && location.state.responseMessage
      ? location.state.responseMessage
      : ""
  );
  const [reservationsRetrieved, setReservationsRetrieved] = useState(null);

  useEffect(() => {
    if (!reservationsRetrieved) {
      fetch(reservation_apis.view_all, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((resp) => {
          if (resp.ok) return resp.json();
          else throw new Error(`Error retrieving reservation.`);
        })
        .then((resp) => {
          setReservationsRetrieved(resp.reservations);
        })
        .catch((error) => {
          console.log(error);
          setIsErrorMessage(true);
          setErrorMessage(`Error: ${error.message}`);
        });
    }
  }, [reservationsRetrieved]);

  const numOfCheckedInPassengers = (reservation) => {
    var number = 0;
    reservation.bookings.forEach((booking, index) => {
      if (booking.isCheckedIn === true) number += 1;
    });
    return number;
  };

  const StatusDropdown = ({ currReservation, currStatus }) => {
    const STATUS_LIST = useMemo(
      () => ["SCHEDULED", "CANCELLED", "PAST", "UNPAID"],
      []
    );

    const handleEditStatus = (newStatus) => (e) => {
      e.preventDefault();

      const request = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          reservationStatus: newStatus,
          totalCost: currReservation.totalCost,
          bookings: currReservation.bookings,
          customer: currReservation.customer,
          flightId: currReservation.flight.id,
        }),
      };

      fetch(reservation_apis.edit + `${currReservation.id}`, request)
        .then((resp) => {
          console.log(resp);
          if (resp.ok) {
            return resp.json();
          }
          throw new Error(`Error editing reservation status.`);
        })
        .then((resp) => {
          if (resp.reservation.id === currReservation.id) {
            setErrorMessage(
              `Edited status of reservation ${resp.reservation.id} successfully.`
            );
            setIsErrorMessage(false);

            let updatedReservations = [...reservationsRetrieved];
            updatedReservations[
              updatedReservations.findIndex(
                (reservation) => reservation.id === currReservation.id
              )
            ].reservationStatus = newStatus;

            setReservationsRetrieved(updatedReservations);
          } else throw new Error(`Edit reservation status response incorrect.`);
        })
        .catch((error) => {
          console.log(error);
          setErrorMessage(`Error: ${error.message}`);
          setIsErrorMessage(true);
        });
    };

    return (
      <>
        <Dropdown>
          <Dropdown.Toggle as={Button}>{currStatus}</Dropdown.Toggle>

          <Dropdown.Menu>
            {STATUS_LIST.map((status, index) => (
              <Dropdown.Item
                key={index}
                eventKey={index}
                active={status === currStatus}
                onClick={handleEditStatus(status)}
              >
                {status}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </>
    );
  };

  const reservationData = useMemo(() => {
    if (reservationsRetrieved) {
      return reservationsRetrieved.map((reservation) => {
        return {
          ...reservation,
          bookingNum: reservation.id,
          bookingName: reservation.customer.lastName,
          bookingEmail: reservation.customer.email,
          status: reservation.reservationStatus,
          checkInsVSPassengers: `${numOfCheckedInPassengers(reservation)} / ${
            reservation.bookings.length
          }`,
          flightName: reservation.flight.flightName,
          departureArrivalAirport: `${reservation.flight.departureAirport} — ${reservation.flight.arrivalAirport}`,
          departureArrivalDateTime: `${dayjs(
            reservation.flight.departureDateTime
          ).format("DD/MM/YYYY")}, ${dayjs(
            reservation.flight.departureDateTime
          ).format("HH:mm")} — ${dayjs(
            reservation.flight.arrivalDateTime
          ).format("DD/MM/YYYY")}, ${dayjs(
            reservation.flight.arrivalDateTime
          ).format("HH:mm")}`,
          totalCost: `\u20AC ${reservation.totalCost}`,
        };
      });
    }
    return [];
  }, [reservationsRetrieved]);

  const reservationColumns = useMemo(() => {
    return [
      {
        Header: "ID",
        accessor: "bookingNum",
      },
      {
        Header: "Booking Name",
        accessor: "bookingName",
      },
      {
        Header: "Booking Email",
        accessor: "bookingEmail",
      },
      {
        Header: "Booking Status",
        accessor: "status",
        Cell: ({ row }) => (
          <StatusDropdown
            currReservation={reservationsRetrieved[row.id]}
            currStatus={reservationsRetrieved[row.id].reservationStatus}
          />
        ),
      },
      {
        Header: "Check Ins / Passengers",
        accessor: "checkInsVSPassengers",
      },
      {
        Header: "Total Cost",
        accessor: "totalCost",
      },
      {
        Header: "Flight Name",
        accessor: "flightName",
      },
      {
        Header: "Airports",
        accessor: "departureArrivalAirport",
      },
      {
        Header: "Duration",
        accessor: "departureArrivalDateTime",
      },
      {
        Header: "Edit Flight",
        accessor: "edit_flight",
        Cell: ({ row }) => (
          <Link
            to={{
              pathname: `/reservation/edit/${reservationsRetrieved[row.id].id}`,
              state: {
                isEditMode: true,
                reservation: reservationsRetrieved[row.id],
              },
            }}
          >
            <Emoji symbol="✈" label="Edit flights" />
          </Link>
        ),
      },
      {
        Header: "Edit Passengers",
        accessor: "edit_passenger",
        Cell: ({ row }) => (
          <Link
            to={{
              pathname: `/reservation/edit/${
                reservationsRetrieved[row.id].id
              }/passenger`,
              state: {
                isEditMode: true,
                reservation: reservationsRetrieved[row.id],
                flightId: reservationsRetrieved[row.id].flight.id,
                numPassengers: reservationsRetrieved[row.id].bookings.length,
              },
            }}
          >
            <Emoji symbol="🧍" label="Edit passenger details" />
          </Link>
        ),
      },
      {
        Header: "Cancel",
        accessor: "cancel",
        Cell: ({ row }) =>
          reservationsRetrieved[row.id].reservationStatus === "CANCELLED" ? (
            ""
          ) : (
            <Link onClick={handleDelete(reservationsRetrieved[row.id].id)}>
              <Emoji symbol="🗑" label="Cancel reservation" />
            </Link>
          ),
      },
    ];
  }, [reservationsRetrieved]);

  const {
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { globalFilter },
    setGlobalFilter,
  } = useTable(
    {
      columns: reservationColumns,
      data: reservationData,
    },
    useGlobalFilter
  );

  const handleDelete = (reservationId) => (e) => {
    e.preventDefault();
    // console.log(reservationId);
    // console.log(reservation_apis.delete + `${reservationId}`);

    fetch(reservation_apis.delete + `${reservationId}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((resp) => {
        console.log(resp);
        if (resp.ok) {
          return resp.json();
        }
        throw new Error(`Error deleting reservation.`);
      })
      .then((resp) => {
        if (resp.reservation.id === reservationId) {
          setErrorMessage(
            `Cancelled reservation ${resp.reservation.id} successfully.`
          );
          setIsErrorMessage(false);

          let updatedReservations = [...reservationsRetrieved];
          updatedReservations[
            updatedReservations.findIndex(
              (reservation) => reservation.id === reservationId
            )
          ].reservationStatus = "CANCELLED";

          setReservationsRetrieved(updatedReservations);
        } else throw new Error(`Cancel reservation response incorrect.`);
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(`Error: ${error.message}`);
        setIsErrorMessage(true);
      });
  };

  return (
    <>
      <div
        style={{
          marginLeft: "-10vw",
          marginRight: "-10vw",
          textAlign: "center",
        }}
        className="mb5"
      >
        {errorMessage && (
          <ErrorMessage error={isErrorMessage} success={!isErrorMessage}>
            {errorMessage}
          </ErrorMessage>
        )}

        <div className="ma0 flex flex-wrap justify-center">
          <Search
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
          <Link to={`/reservation/create`}>
            <Button type="button">Create reservation</Button>
          </Link>
        </div>

        <Table responsive striped bordered hover size="sm">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {reservationsRetrieved && (
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          )}
        </Table>
      </div>
    </>
  );
};

const Search = ({ globalFilter, setGlobalFilter }) => {
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <div className="mb2 pr2 w-80">
      <Form.Control
        type="text"
        placeholder={`Search...`}
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
    </div>
  );
};

export default ShowAllReservations;
