"use-client";
import React from "react";

const DateRangePicker = ({ startDate, setStartDate, endDate, setEndDate }) => {
  return (
    <>
      <h1>
        <strong>Dates:</strong>
      </h1>
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
    </>
  );
};

export default DateRangePicker;
