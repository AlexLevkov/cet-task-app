// Home.js
"use client";
import React, { useState, useEffect } from "react";

import App from "./components/App";

// redux
import { Provider } from "react-redux";
import store from "./redux/store";

export default function Home() {
  const [startDate, setStartDate] = useState("2023-04-04");
  const [endDate, setEndDate] = useState("2025-04-17");
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    // const tester = useSelector((state) => state.tickets);
    // console.log("tester:", tester);

    // const dispatch = useDispatch();
    // dispatch(updateIntro(false));

    async function fetchTickets() {
      // const { data, error } = await getItems("tickets");
      // console.log("data[0]:", data);
      // .gte("due_date", startDate)
      // .lte("due_date", endDate);
      // if (error) console.error("Error fetching tickets:", error);
      // else setTickets(data);
    }

    fetchTickets();
  }, [startDate, endDate]);

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
