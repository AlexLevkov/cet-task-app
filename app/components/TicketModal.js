"use client";
import React, { useState } from "react";
import TaskModal from "./TaskModal.js";

const TicketModal = () => {
  const [ticket, setTicket] = useState({
    title: "",
    description: "",
    owner: "",
    due_date: "",
    status: "",
    priority: "",
  });

  const demoTasks = [
    {
      title: "Task1",
      description: "",
      owner: "",
      status: "new",
      ticket_id: null,
    },
    {
      title: "Task2",
      description: "",
      owner: "",
      status: "new",
      ticket_id: null,
    },
    {
      title: "Task3",
      description: "",
      owner: "",
      status: "new",
      ticket_id: null,
    },
    {
      title: "Task4",
      description: "",
      owner: "",
      status: "new",
      ticket_id: null,
    },
  ];

  const [tasks, setTasks] = useState([]); //[{ title: "task title example" }]);

  const [taskToEdit, setTaskToEdit] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicket({ ...ticket, [name]: value });
  };

  const submitTicket = async (e) => {
    e.preventDefault();
    console.log("ticket:", ticket);
    const res = await fetch("/api/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ticket),
    });
    const ticketId = await res.json();
    console.log("data:", data);
    // window.location.reload();
  };

  const addTask = (task = {}) => {
    setTaskToEdit(task);
  };

  return (
    <div className="ticket-modal">
      <h1>TicketModal</h1>
      <form className="ticket-modal-form">
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={ticket.title}
          onChange={handleChange}
        />
        <label>Description</label>
        <textarea
          name="description"
          value={ticket.description}
          onChange={handleChange}
        ></textarea>
        <label>Owner</label>
        <input
          type="text"
          name="owner"
          value={ticket.owner}
          onChange={handleChange}
        />
        <label>Due date</label>
        <input
          type="date"
          name="due_date"
          value={ticket.due_date}
          onChange={handleChange}
        />
        <label>Status</label>
        <input
          type="text"
          name="status"
          value={ticket.status}
          onChange={handleChange}
        />
        <label>Priority</label>
        <input
          type="text"
          name="priority"
          value={ticket.priority}
          onChange={handleChange}
        />
        <button onClick={submitTicket}>Submit</button>
      </form>
      <div className="task-container">
        <button onClick={() => addTask()}>Add Task</button>
        {tasks && tasks.map((task) => <div>{task.title}</div>)}
      </div>
      {taskToEdit && <TaskModal taskToEdit={taskToEdit} />}
    </div>
  );
};

export default TicketModal;
