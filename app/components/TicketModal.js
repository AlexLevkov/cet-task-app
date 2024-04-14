"use client";
import React, { useState, useEffect } from "react";
import TaskModal from "./TaskModal.js";
import {
  deleteItem,
  getItem,
  updateItem,
} from "@/app/storae-service/storage.js";
import { supabase } from "@/utils/supabaseClient";

const TicketModal = ({ onClose, ticketToEdit }) => {
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
    if (
      !ticket.title ||
      !ticket.description ||
      !ticket.owner ||
      !ticket.due_date ||
      !ticket.status ||
      !ticket.priority
    ) {
      alert("Please fill in all fields");
      return; // Stop the function if any field is empty
    }
    // e.preventDefault();
    console.log("ticket:", ticket);
    const res = await fetch("/api/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ticket),
    });
    const ticketId = await res.json();
    // console.log("ticketId:", ticketId);
    // const tasksToFetch = tasks.map(({ local_id, ...rest }) => ({
    //   ...rest,
    //   ticket_id: ticketId,
    // }));
    const tasksToFetch = [
      { ticket_id: ticketId, title: "new task", status: "new" },
    ];

    console.log("tasksToFetch:", tasksToFetch);
    submitTask(tasksToFetch);
    onClose();
    window.location.reload();
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

  const addTask = () => {
    const local_id = tasks.length;

    const newTask = {
      title: "New Task",
      description: "",
      owner: "",
      status: "new",
      ticket_id: null,
      local_id,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const editTask = (id) => {
    console.log("id:", id);
    console.log("editTask");
    console.log("tasks[id]:", tasks[id]);
    setTaskToEdit(tasks[id]);
  };

  const updateTask = (e, updatedTask) => {
    e.preventDefault();
    console.log("updateTask:", updatedTask);

    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.local_id === updatedTask.local_id) {
          return { ...task, ...updatedTask }; // This merges the updated fields with the existing task
        }
        return task; // Return unmodified task for those that do not match the condition
      })
    );
  };

  const deleteTicket = async () => {
    // console.log("deleteTicket");
    console.log("ticket.id:", ticket.id);
    await deleteAllTasks(ticket.id);
    await deleteItem(ticket.id, "tickets");
    window.location.reload();
  };

  const deleteAllTasks = async (ticketId) => {
    const { data, error } = await supabase
      .from("Tasks")
      .select("id")
      .eq("ticket_id", ticketId);
    // console.log("data:", data);
    data.forEach((id) => {
      deleteItem(id.id, "tasks");
    });
  };

  const updateTicket = async () => {
    // console.log("updateTicket");s
    // console.log("ticket:", ticket);
    await updateItem(ticket, "tickets");
    onClose();
    window.location.reload();
  };

  return (
    <div className="ticket-modal max-h-100">
      {/* {JSON.stringify(ticket)} */}
      <form className="ticket-modal-form bg-neutral-900 text-neutral-50 my-3 ">
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
        {/* <input
          required
          type="text"
          name="status"
          value={ticket.status}
          onChange={handleChange}
          className="bg-neutral-700 text-neutral-50 p-1 rounded block w-1/2"
        /> */}
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
        {/* <button
          className="my-5 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => addTask()}
        >
          Add Task
        </button> */}
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
