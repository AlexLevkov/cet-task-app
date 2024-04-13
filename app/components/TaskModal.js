"use client";
import React, { useEffect, useState } from "react";

const TaskModal = ({ taskToEdit }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    owner: "",
    status: "new", // default status
  });

  useEffect(() => {
    setTask(taskToEdit);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
    taskToEdit(task);
  };

  const submitTask = async (e) => {
    e.preventDefault();
    console.log("task:", task);
    // Here you would add the logic to send the task to your backend or API
  };

  return (
    <div className="task-modal">
      <form className="ticket-modal-form" onSubmit={submitTask}>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
        />
        <label>Description</label>
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
        ></textarea>
        <label>Owner</label>
        <input
          type="text"
          name="owner"
          value={task.owner}
          onChange={handleChange}
        />
        <label>Status</label>
        <select name="status" value={task.status} onChange={handleChange}>
          <option value="new">New</option>
          <option value="in progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <button type="submit">Submit Task</button>
      </form>
    </div>
  );
};

export default TaskModal;
