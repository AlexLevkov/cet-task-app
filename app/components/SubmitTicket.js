"use client";
import React from "react";
import { supabase } from "@/utils/supabaseClient";

const SubmitTicket = ({}) => {
  return (
    <div>
      SubmitTicket
      <button
        onClick={async () => {
          console.log("1");
          const res = await fetch("/api/tickets");
          const x = await res.json();
          console.log("x:", x);
          // const ticket = { title: "xxxxxxx123" };
          // const { data, error } = await supabase
          //   .from("Tickets")
          //   .insert([ticket], { returning: "minimal" })
          //   .select();
        }}
      >
        XXX
      </button>
    </div>
  );
};

export default SubmitTicket;
