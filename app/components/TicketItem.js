import React from "react";

const TicketItem = ({ ticket }) => {
  // console.log("ticket1:", ticket);
  return (
    <div>
      <h1>{ticket.title}</h1>
      {/* {ticket.tasks.map((task, index) => {
        return (
          <div draggable className="task-title" key={index}>
            {task.title}
          </div>
        );
      })} */}
    </div>
  );
};

export default TicketItem;
