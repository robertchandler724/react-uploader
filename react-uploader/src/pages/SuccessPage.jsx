// src/pages/SuccessPage.jsx
import React from "react";
import { Link } from "react-router-dom";

const SuccessPage = () => {
  return (
    <div className="success-page">
      <h2>Upload Successful!</h2>
      <Link className="success-link" to="/upload">
        Upload Another
      </Link>
    </div>
  );
};

export default SuccessPage;
