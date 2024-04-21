// App.js
import React, { useState } from "react";
import AddTicket from "./AddTicket";
import List from "./List";
import { useQuery } from "@tanstack/react-query";
import { getItems } from "@/app/storae-service/storage";
import DateRangePicker from "./DateRangePicker"; // Import the new component

const App = () => {
  const [startDate, setStartDate] = useState("2024-04-01");
  const [endDate, setEndDate] = useState("2024-04-30");

  const {
    data: tickets,
    error,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["tickets", startDate, endDate],
    queryFn: () => getItems("tickets", { startDate, endDate }),
    enabled: Boolean(startDate && endDate),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Failed to fetch tickets:", error);
    return <div>Error fetching tickets.</div>;
  }

  return (
    <div>
      <div className="flex h-1/2 items-center gap-3 mx-3">
        <DateRangePicker
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
        <AddTicket refetchTickets={refetch} />
      </div>
      {tickets &&
        tickets.data.map((ticket) => (
          <List key={ticket.id} ticketData={ticket} refetchTickets={refetch} />
        ))}
    </div>
  );
};

export default App;
