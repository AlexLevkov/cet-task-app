"use client";
import React, { useState, useEffect } from "react";
import TaskModal from "./TaskModal.js";
import {
  deleteItem,
  getItem,
  updateItem,
} from "@/app/storae-service/storage.js";

const TicketModal = ({ onClose, ticketToEdit, refetchTickets }) => {
  const [ticket, setTicket] = useState({
    title: "",
    description: "",
    owner: "",
    due_date: "",
    status: "",
    priority: "",
  });

  useEffect(() => {
    if (ticketToEdit) {
      setTicket(ticketToEdit);
    }
  }, [ticketToEdit]);

  const [tasks, setTasks] = useState([]);

  const [taskToEdit, setTaskToEdit] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicket({ ...ticket, [name]: value });
  };

  const submitTicket = async (e) => {
    e.preventDefault();
    if (
      !ticket.title ||
      !ticket.description ||
      !ticket.owner ||
      !ticket.due_date ||
      !ticket.status ||
      !ticket.priority
    ) {
      alert("Please fill in all fields");
      return;
    }

    const res = await fetch("/api/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ticket),
    });
    const ticketId = await res.json();

    const tasksToFetch = [
      { ticket_id: ticketId, title: "new task", status: "new" },
    ];

    submitTask(tasksToFetch);
    onClose();

    refetchTickets();
  };

  const submitTask = (tasks) => {
    tasks.forEach(async (t) => {
      try {
        await fetch("/api/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(t),
        });
      } catch (error) {
        console.log("error:", error);
      }
    });
  };

  const editTask = (id) => {
    setTaskToEdit(tasks[id]);
  };

  const updateTask = (e, updatedTask) => {
    e.preventDefault();
    console.log("updateTask:", updatedTask);

    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.local_id === updatedTask.local_id) {
          return { ...task, ...updatedTask };
        }
        return task;
      })
    );
  };

  const deleteTicket = async () => {
    const fIndex = { ticketid: ticket.id };
    await deleteItem(null, "tasks", fIndex); // delete tasks
    await deleteItem(ticket.id, "tickets"); // delete the ticket
    onClose();
    refetchTickets();
  };

  const updateTicket = async () => {
    await updateItem(ticket, "tickets");
    onClose();
    refetchTickets();
  };

  return (
    <div className="ticket-modal max-h-100">
      <form className="ticket-modal-form text-neutral-50 my-3 ">
        <label>Title</label>
        <input
          required
          type="text"
          name="title"
          value={ticket.title}
          onChange={handleChange}
          className="bg-neutral-700 text-neutral-50 p-1 rounded block w-1/2"
        />
        <label>Description</label>
        <textarea
          required
          name="description"
          value={ticket.description}
          onChange={handleChange}
          className="bg-neutral-700 text-neutral-50 p-1 rounded block w-1/2"
        ></textarea>
        <label>Owner</label>
        <input
          required
          type="text"
          name="owner"
          value={ticket.owner}
          onChange={handleChange}
          className="bg-neutral-700 text-neutral-50 p-1 rounded block w-1/2"
        />
        <label>Due date</label>
        <input
          required
          type="date"
          name="due_date"
          value={ticket.due_date}
          onChange={handleChange}
          className="bg-neutral-700 text-neutral-50 p-1 rounded block w-1/2"
        />
        <label>Status</label>
        <select
          className="bg-neutral-700 text-neutral-50 p-1 rounded block w-1/2"
          name="status"
          value={ticket.status}
          onChange={handleChange}
        >
          <option value="new">New</option>
          <option value="approved">Approved</option>
          <option value="committed">Committed</option>
          <option value="done">Done</option>
        </select>
        <label>Priority</label>
        <input
          required
          type="text"
          name="priority"
          value={ticket.priority}
          onChange={handleChange}
          className="bg-neutral-700 text-neutral-50 p-1 rounded block w-1/2"
        />
        {!ticketToEdit && (
          <button
            type="submit"
            className="my-5 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={submitTicket}
          >
            Submit
          </button>
        )}
      </form>
      <div className="task-container">
        {tasks &&
          tasks.map((task, index) => (
            <div
              key={index}
              onClick={() => {
                editTask(index);
              }}
            >
              {task.title}
            </div>
          ))}
      </div>
      {ticketToEdit && (
        <div className="flex justify-between">
          <button
            onClick={() => {
              deleteTicket();
            }}
            className="my-5 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Delete
          </button>
          <button
            onClick={() => {
              updateTicket();
            }}
            className="my-5 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update
          </button>
        </div>
      )}
      {taskToEdit && (
        <TaskModal updateTask={updateTask} taskToEdit={taskToEdit} />
      )}
    </div>
  );
};

export default TicketModal;
