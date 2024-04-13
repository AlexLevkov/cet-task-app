"use client";
import React from "react";
import TicketItem from "./TicketItem";

const TicketList = ({ data }) => {
  // console.log("data:", data);
  return (
    <div>
      <h1>Ticket List1</h1>
      <br />
      {data.map((t, index) => {
        return <TicketItem key={index} ticket={t} />;
      })}
    </div>
  );
};

export default TicketList;
