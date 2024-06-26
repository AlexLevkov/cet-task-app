"use client";
import React, { useEffect, useState } from "react";
import { updateItem } from "@/app/storae-service/storage";

const TaskModal = ({ taskToEdit, updateTask, onClose, refetchTickets }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    owner: "",
    status: "new",
  });

  // useEffect(() => {
  //   setTask(taskToEdit);
  // }, []);

  useEffect(() => {
    setTask(taskToEdit);
  }, [taskToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const submitTask = async (e) => {
    e.preventDefault();
  };

  const updateTaskDb = async (e) => {
    console.log("updateTaskDb");
    e.preventDefault();
    await updateItem(task, "tasks");
    onClose();
    refetchTickets();
  };

  return (
    <div className="task-modal overflow-auto">
      <form
        className="ticket-modal-form w-full max-w-xl mx-auto rounded-lg shadow-lg p-6"
        onSubmit={submitTask}
      >
        <label className="my-1.5 block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          className="bg-neutral-700 text-neutral-50 p-1 rounded block w-full"
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
        />
        <label className="my-1.5 block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          className="bg-neutral-700 text-neutral-50 p-1 rounded block w-full"
        ></textarea>
        <label className="my-1.5 block text-sm font-medium text-gray-700">
          Owner
        </label>
        <input
          type="text"
          name="owner"
          value={task.owner}
          onChange={handleChange}
          className="bg-neutral-700 text-neutral-50 p-1 rounded block w-full"
        />
        <label className="my-1.5 block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          className="bg-neutral-700 text-neutral-50 p-1 rounded block w-full"
          name="status"
          value={task.status}
          onChange={handleChange}
        >
          <option value="new">New</option>
          <option value="in progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        {taskToEdit.id ? (
          <button
            className="my-5 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            type="submit"
            onClick={(e) => updateTaskDb(e, task)}
          >
            Update Task
          </button>
        ) : (
          <button
            className="my-5 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            type="submit"
            onClick={(e) => updateTask(e, task)}
          >
            Submit Task
          </button>
        )}
      </form>
    </div>
  );
};

export default TaskModal;
