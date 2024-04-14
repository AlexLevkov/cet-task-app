// Home.js
"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/utils/supabaseClient";
import AddTicket from "./components/AddTicket.js";
import List from "./components/List";

export default function Home() {
  const [startDate, setStartDate] = useState("2023-04-04");
  const [endDate, setEndDate] = useState("2025-04-17");
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    async function fetchTickets() {
      const { data, error } = await supabase
        .from("Tickets")
        .select(
          "title, description, owner, due_date, status, priority, id, tasks:Tasks!inner(title, description, owner, status, id)"
        )
        .gte("due_date", startDate)
        .lte("due_date", endDate);

      if (error) console.error("Error fetching tickets:", error);
      else setTickets(data);
    }

    fetchTickets();
  }, [startDate, endDate]);

  return (
    <div>
      <div className="flex h-1/2 items-center gap-3 mx-3">
        <h2>Dates:</h2>
        <input
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
        />
        <AddTicket />
      </div>

      {tickets.map((t) => (
        <List key={t.id} ticketData={t} />
      ))}
    </div>
  );
}
