"use client";
import React, { useState, useEffect } from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import { motion } from "framer-motion";
import { FaFire } from "react-icons/fa";
import data from "@/demo_data/demo.json";
import Modal from "@/app/components/Modal";
import { updateItem } from "@/app/storae-service/storage";

export const CustomKanban = (ticketData) => {
  // console.log("ticket:", ticketData);
  // console.log("data:", data);
  return (
    <div className="w-full bg-neutral-900 text-neutral-50">
      {/* <h1>List</h1> */}
      <Board ticketData={ticketData} />
    </div>
  );
};

const Board = ({ ticketData }) => {
  console.log("ticketData:", ticketData.ticketData);
  // console.log("DEFAULT_CARDS:", DEFAULT_CARDS);
  // // console.log("DEFAULT_TICKET:", DEFAULT_TICKET);
  ticketData.ticketData.tasks = ticketData.ticketData.tasks.map((task) => ({
    ...task,
    id: task.id.toString(),
  }));

  const [cards, setCards] = useState(ticketData.ticketData.tasks);
  const [ticket, setTicket] = useState(ticketData.ticketData);

  const [hasChecked, setHasChecked] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState("");

  useEffect(() => {
    console.log("cards changed");
    console.log("cards:", cards);
    cards.forEach((card) => updateItem(card, "Tasks"));
  }, [cards]);

  const toggleModal = (index) => {
    console.log("index:", index);
    setModalIndex((pv) => index);
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={toggleModal} index={modalIndex} />
      <div
        style={{ border: "1px solid white" }}
        className="flex w-full gap-3 p-12"
      >
        <TicketColumn
          title="Ticket"
          ticket={ticket}
          status="ticket"
          headingColor="text-neutral-500"
          cards={cards}
          setCards={setCards}
        />
        {/* <Status
          title="Backlog"
          status="backlog"
          headingColor="text-neutral-500"
          cards={cards}
          setCards={setCards}
        /> */}
        <Status
          title="TODO"
          status="new"
          headingColor="text-yellow-200"
          cards={cards}
          setCards={setCards}
          toggleModal={toggleModal}
        />
        <Status
          title="In progress"
          status="in progress"
          headingColor="text-blue-200"
          cards={cards}
          setCards={setCards}
          toggleModal={toggleModal}
        />
        <Status
          title="Done"
          status="done"
          headingColor="text-emerald-200"
          cards={cards}
          setCards={setCards}
          toggleModal={toggleModal}
        />
        <BurnBarrel setCards={setCards} />
      </div>
      {/* <h1 style={{ border: "1px solid white" }}>TICKET DEMO</h1>
      <pre>{JSON.stringify(ticket, null, 2)}</pre>
      <h1 style={{ border: "1px solid white" }}>CARD DEMO</h1>
      <pre>{JSON.stringify(cards, null, 2)}</pre>
      <h1 style={{ border: "1px solid white" }}>RAW DEMO DATA</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </>
  );
};

const Status = ({
  title,
  headingColor,
  cards,
  status,
  setCards,
  toggleModal,
}) => {
  const [active, setActive] = useState(false);

  const handleDragStart = (e, card) => {
    e.dataTransfer.setData("cardId", card.id);
  };

  const handleDragEnd = (e) => {
    const cardId = e.dataTransfer.getData("cardId");

    setActive(false);
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";

    if (before !== cardId) {
      let copy = [...cards];

      let cardToTransfer = copy.find((c) => c.id === cardId);
      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer, status };

      copy = copy.filter((c) => c.id !== cardId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      setCards(copy);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    highlightIndicator(e);

    setActive(true);
  };

  const clearHighlights = (els) => {
    const indicators = els || getIndicators();

    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const highlightIndicator = (e) => {
    const indicators = getIndicators();

    clearHighlights(indicators);

    const el = getNearestIndicator(e, indicators);

    el.element.style.opacity = "1";
  };

  const getNearestIndicator = (e, indicators) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-status="${status}"]`));
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  const filteredCards = cards.filter((c) => c.status === status);

  return (
    <div className="w-56 shrink-0">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className="rounded text-sm text-neutral-400">
          {filteredCards.length}
        </span>
      </div>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-full w-full transition-colors ${
          active ? "bg-neutral-800/50" : "bg-neutral-800/0"
        }`}
      >
        {filteredCards.map((c) => {
          return (
            <Card
              key={c.id}
              {...c}
              handleDragStart={handleDragStart}
              toggleModal={toggleModal}
            />
          );
        })}
        <DropIndicator beforeId={null} status={status} />
        {/* <AddCard status={status} setCards={setCards} /> */}
      </div>
    </div>
  );
};

const TicketColumn = ({ title, headingColor, ticket }) => {
  return (
    <div className="w-56 shrink-0">
      <div className="mb-3 flex items-center justify-between">
        <h3
          className={`font-medium ${headingColor}`}
          onClick={() => {
            alert("Ticket");
          }}
        >
          {title}
        </h3>
      </div>
      <p className="text-m text-neutral-100 mt-3">{ticket.title}</p>
      <p className="text-m text-neutral-100 mt-3">{ticket.status}</p>
      <p className="text-m text-neutral-100 mt-3">
        {ticket.due_date.substring(0, 10)}
      </p>
    </div>
  );
};

const Card = ({ title, id, status, handleDragStart, toggleModal }) => {
  return (
    <>
      <DropIndicator beforeId={id} status={status} />
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { title, id, status })}
        className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
      >
        <p
          className="text-sm text-neutral-100"
          onDoubleClick={() => {
            console.log("id:", id);
            toggleModal(id);
          }}
        >
          {title}
        </p>
      </motion.div>
    </>
  );
};

const DropIndicator = ({ beforeId, status }) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-status={status}
      className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
    />
  );
};

const BurnBarrel = ({ setCards }) => {
  const [active, setActive] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  const handleDragEnd = (e) => {
    const cardId = e.dataTransfer.getData("cardId");

    setCards((pv) => pv.filter((c) => c.id !== cardId));

    setActive(false);
  };

  return (
    <div
      onDrop={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${
        active
          ? "border-red-800 bg-red-800/20 text-red-500"
          : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
      }`}
    >
      {active ? <FaFire className="animate-bounce" /> : <FiTrash />}
    </div>
  );
};

const AddCard = ({ status, setCards }) => {
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim().length) return;

    const newCard = {
      status,
      title: text.trim(),
      id: Math.random().toString(),
    };

    setCards((pv) => [...pv, newCard]);

    setAdding(false);
  };

  return (
    <>
      {adding ? (
        <motion.form layout onSubmit={handleSubmit}>
          <textarea
            onChange={(e) => setText(e.target.value)}
            autoFocus
            placeholder="Add new task..."
            className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"
          />
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button
              onClick={() => setAdding(false)}
              className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
            >
              Close
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
            >
              <span>Add</span>
              <FiPlus />
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.button
          layout
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
        >
          <span>Add card</span>
          <FiPlus />
        </motion.button>
      )}
    </>
  );
};

const DEFAULT_CARDS = [
  ...data.tasks,
  // BACKLOG
  { title: "Look into render bug in dashboard", status: "backlog", id: "100" },
];

const DEFAULT_TICKET = data;

export default CustomKanban;