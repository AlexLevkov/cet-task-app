"use client";
import { motion, AnimatePresence } from "framer-motion";
import TaskModal from "./TaskModal";
import TicketModal from "./TicketModal";
import data from "@/demo_data/demo";
import React, { useState, useEffect } from "react";
import { getItem } from "@/app/storae-service/storage";

const Modal = ({ isOpen, onClose, index, db, isTicket, ticket }) => {
  // console.log("data:", data.tasks[0]);

  const [taskToEdit, setTaskToEdit] = useState("");
  const [ticketToEdit, setTicketToEdit] = useState("");

  useEffect(() => {
    if (index && !isTicket) {
      getItem(index, db).then((item) => {
        if (item) setTaskToEdit(item[0]);
      });
    }

    if (index && isTicket) {
      getItem(index, "tickets").then((item) => {
        console.log("index:", index);
        console.log("item:", item[0]);
        if (item) setTicketToEdit(item[0]);
        // if (item) setTaskToEdit(item[0]);
      });
    }

    return () => {
      setTaskToEdit("");
    };
  }, [index]);

  const closeModal = () => {
    setTaskToEdit("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="overflow-scroll fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" // Ensure full viewport coverage and centering
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1.0 }}
            exit={{ scale: 0 }}
            className=" modal w-1/2 p-6 rounded-lg shadow-lg" // Added bg-white for white background
            onClick={(e) => e.stopPropagation()} // Stop click events from bubbling to the parent
          >
            <div className="btn-container">
              <button className="relative text-color-white" onClick={onClose}>
                X
              </button>
            </div>
            {taskToEdit && (
              <TaskModal
                taskToEdit={taskToEdit}
                isOpen={isOpen}
                onClose={onClose}
              />
            )}
            {isTicket && (
              <TicketModal onClose={onClose} ticketToEdit={ticketToEdit} />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
