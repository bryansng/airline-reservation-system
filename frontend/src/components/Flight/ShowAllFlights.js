import React, { useState, useEffect, useMemo } from "react";
import { useTable, useGlobalFilter, useAsyncDebounce } from "react-table";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import ErrorMessage from "../Common/ErrorMessage";
import Emoji from "../Common/Emoji";
import Button from "../Common/Button";
import { Redirect } from "react-router";
import * as dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { rest_endpoints } from "../../config/rest_endpoints.json";
const { flight: flight_apis } = rest_endpoints.admin;
dayjs.extend(isBetween);

const ShowAllFlights = ({ location }) => {
  const [isErrorMessage, setIsErrorMessage] = useState(
    location.state && location.state.isErrorResponse ? true : false
  );
  const [errorMessage, setErrorMessage] = useState(
    location.state && location.state.responseMessage
      ? location.state.responseMessage
      : ""
  );
  const [flightsRetrieved, setFlightsRetrieved] = useState(null);

  useEffect(() => {
    if (!flightsRetrieved) {
      fetch(flight_apis.view_all)
        .then((resp) => {
          if (resp.ok) return resp.json();
          else throw new Error(`Error retrieving flight.`);
        })
        .then((resp) => {
          setFlightsRetrieved(resp.flight);
        })
        .catch((error) => {
          console.log(error);
          setIsErrorMessage(true);
          setErrorMessage(`Error: ${error.message}`);
        });
    }
  }, [flightsRetrieved]);

  const flightData = useMemo(() => {
    if (flightsRetrieved) {
      return flightsRetrieved.map((flight) => {
        return {
          ...flight,
          id: flight.id,
          name: flight.flightName,
          departureAirport: flight.departureAirport,
          departureDateTime: dayjs(flight.departureDateTime).format(
            "YYYY-MM-DD  HH:mm"
          ),
          arrivalAirport: flight.arrivalAirport,
          arrivalDateTime: dayjs(flight.arrivalDateTime).format(
            "YYYY-MM-DD  HH:mm"
          ),
          pricePerTicket: `\u20AC ${flight.flightPrice}`,
        };
      });
    }
    return [];
  }, [flightsRetrieved]);

  const flightColumns = useMemo(() => {
    return [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Flight Name",
        accessor: "name",
      },
      {
        Header: "Departure Airport",
        accessor: "departureAirport",
      },
      {
        Header: "Departure Date & Time",
        accessor: "departureDateTime",
      },
      {
        Header: "Arrival Airport",
        accessor: "arrivalAirport",
      },
      {
        Header: "Arrival Date & Time",
        accessor: "arrivalDateTime",
      },
      {
        Header: "Price per ticket",
        accessor: "pricePerTicket",
      },
      {
        Header: "Edit",
        accessor: "edit",
        Cell: ({ row }) => (
          <Link
            to={{
              pathname: `/flight/edit/${flightsRetrieved[row.id].id}`,
              state: { flight: flightsRetrieved[row.id] },
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
          <Link
            // to={{
            //   pathname: `/flight/delete/${flightsRetrieved[row.id].id}`,
            //   state: { flightId: flightsRetrieved[row.id].id },
            // }}
            onClick={handleDelete(flightsRetrieved[row.id].id)}
          >
            <Emoji symbol="🗑" label="Delete" />
          </Link>
        ),
      },
    ];
  }, [flightsRetrieved]);

  const {
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { globalFilter },
    setGlobalFilter,
  } = useTable(
    {
      columns: flightColumns,
      data: flightData,
    },
    useGlobalFilter
  );

  const handleDelete = (flightId) => (e) => {
    e.preventDefault();
    console.log(flightId);
    console.log(flight_apis.delete + `${flightId}`);

    fetch(flight_apis.delete + `${flightId}`, { method: "DELETE" })
      .then((resp) => {
        console.log(resp);
        if (resp.ok) {
          return resp.json();
        }
        throw new Error(`Error deleting flight.`);
      })
      .then((resp) => {
        if (resp.flight.id === flightId) {
          setErrorMessage(`Deleted flight ${resp.flight.id} successfully.`);
          setIsErrorMessage(false);
          setFlightsRetrieved(
            flightsRetrieved.filter((flight) => flight.id !== flightId)
          );
        } else throw new Error(`Delete flight response incorrect.`);
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
          <Link to={`/flight/create`}>
            <Button type="button">Create flight</Button>
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
          {flightsRetrieved && (
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

export default ShowAllFlights;
