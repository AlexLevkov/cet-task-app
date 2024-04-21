"use client";
import React, { useState } from "react";
import Modal from "./Modal";

const AddTicket = ({ refetchTickets }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <nav className="flex items-center gap-3 mx-3">
        <button
          className="my-5 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Add Ticket
        </button>
      </nav>
      <Modal
        isOpen={isOpen}
        onClose={toggleModal}
        isTicket={true}
        refetchTickets={refetchTickets}
      />
    </div>
  );
};

export default AddTicket;
