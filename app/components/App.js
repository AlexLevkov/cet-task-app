  "use client";
  import React, { useEffect } from "react";
  //cmps
  import AddTicket from "./AddTicket";
  import List from "./List";
  //redux
  import { useSelector, useDispatch } from "react-redux";
  import { updateTickets } from "../redux/tickets";
  //services
  import { getItems } from "@/app/storae-service/storage.js";

  const App = () => {
    const dispatch = useDispatch();
    const tickets = useSelector((state) => state.tickets.tickets); // Ensure correct path to tickets

    useEffect(() => {
      const fetchTickets = async () => {
        try {
          const { data, error } = await getItems("tickets");
          if (error) {
            console.error("Failed to fetch tickets:", error);
            return;
          }
          dispatch(updateTickets(data));
        } catch (err) {
          // Handle errors that occur during the fetch process
          console.error("Error fetching tickets:", err);
        }
      };

      fetchTickets();
    }, [dispatch]); // Dependency array includes only dispatch

    return (
      <div>
        <div className="flex h-1/2 items-center gap-3 mx-3">
          <h2>Dates:</h2>
          {/* <input
            className="rounded bg-neutral-700 flex items-center"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />{" "}
          -{" "}
          <input
            className="rounded bg-neutral-700"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          /> */}
          <AddTicket />
        </div>
        {tickets.map((ticket, index) => (
          <List key={index} ticketData={ticket} />
        ))}
      </div>
    );
  };

  export default App;
