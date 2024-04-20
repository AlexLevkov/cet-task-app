"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";

export default function Home() {
  const [tickets, setTtickets] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const { data, error } = await supabase.from("Tickets").select("*");

      if (error) {
        console.error("Error fetching tasks:", error);
      } else {
        console.log("data:", data);
        setTtickets(data);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Task App</h2>
      {tickets.map((t, index) => {
        return <div key={index}>{t.title}</div>;
      })}
    </div>
  );
}
