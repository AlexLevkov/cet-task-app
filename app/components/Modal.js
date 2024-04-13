"use client";
import { motion, AnimatePresence } from "framer-motion";

const Modal = ({ isOpen, onClose, index }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" // Ensure full viewport coverage and centering
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1.0 }}
            exit={{ scale: 0 }}
            className="bg-white w-1/2 p-6 rounded-lg shadow-lg" // Added bg-white for white background
            onClick={(e) => e.stopPropagation()} // Stop click events from bubbling to the parent
          >
            <button
              className="absolute top-2 right-2 text-black"
              onClick={onClose}
            >
              X
            </button>
            <p style={{ color: "black" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
              sint officiis nisi quo amet quidem iste beatae praesentium in
              voluptatum, aliquam necessitatibus magni omnis maiores iure, sunt
              recusandae consequuntur eius.
            </p>
            <p style={{ color: "black" }}>{index}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
