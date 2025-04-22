import React, { useState } from "react";
import "../styles/DragAndDrop.css";

const DragAndDrop = ({ onFileSelect }) => {
  const [dragging, setDragging] = useState(false);

  const handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onFileSelect(files[0]); // Only accept one file for simplicity
    }
  };

  return (
    <div
      className={`drag-and-drop ${dragging ? "dragging" : ""}`}
      onDragEnter={handleDragIn}
      onDragOver={handleDragIn}
      onDragLeave={handleDragOut}
      onDrop={handleDrop}
    >
      <p>Drag and drop your file here</p>
      <p>or</p>
      <button className="file-input-btn">Select a file</button>
    </div>
  );
};

export default DragAndDrop;
