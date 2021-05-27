import React, { useState, useEffect, useMemo } from "react";
import { useTable, useGlobalFilter, useAsyncDebounce } from "react-table";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import ErrorMessage from "../Common/ErrorMessage";
import Emoji from "../Common/Emoji";
import Button from "../Common/Button";
import * as dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { rest_endpoints } from "../../config/rest_endpoints.json";
const { reservation: reservation_apis } = rest_endpoints.admin;
dayjs.extend(isBetween);

const ShowAllReservations = ({ location }) => {
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
      fetch(reservation_apis.view_all)
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

  const isAllPassengerCheckedIn = (reservation) => {
    reservation.bookings.forEach((booking, index) => {
      if (booking.isCheckedIn === false) return false;
    });
    return true;
  };

  const numOfCheckedInPassengers = (reservation) => {
    var number = 0;
    reservation.bookings.forEach((booking, index) => {
      if (booking.isCheckedIn === true) number += 1;
    });
    return number;
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
        Header: "Edit",
        accessor: "edit",
        Cell: ({ row }) => (
          <Link
            to={{
              pathname: `/reservation/edit/${reservationsRetrieved[row.id].id}`,
              state: { reservation: reservationsRetrieved[row.id] },
            }}
          >
            <Emoji symbol="✏️" label="Edit" />
          </Link>
        ),
      },
      {
        Header: "Delete",
        accessor: "delete",
        Cell: ({ row }) => (
          <Link onClick={handleDelete(reservationsRetrieved[row.id].id)}>
            <Emoji symbol="🗑" label="Delete" />
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
    console.log(reservationId);
    console.log(reservation_apis.delete + `${reservationId}`);

    fetch(reservation_apis.delete + `${reservationId}`, { method: "DELETE" })
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
            `Deleted reservation ${resp.reservation.id} successfully.`
          );
          setIsErrorMessage(false);
          setReservationsRetrieved(
            reservationsRetrieved.filter(
              (reservation) => reservation.id !== reservationId
            )
          );
        } else throw new Error(`Delete reservation response incorrect.`);
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
