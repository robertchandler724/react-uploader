import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/UploadPage.css";
import { useAuth } from "../context/AuthContext";
import api from "../api/api";
import LogoutButton from "../components/LogoutButton";
import SuccessModal from "../components/SuccessModal";
import DragAndDrop from "../components/DragAndDrop";

const UploadPage = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    who: "",
    why: "",
    what: "",
    file: null,
  });
  const [status, setStatus] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

    // Handle the selected file from the drag-and-drop component
    const handleFileChange = (file) => {
        setFormData((prev) => ({
            ...prev,
            file: file,
        }));
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { who, why, what, file } = formData;

    if (!file || !what) {
      setStatus("Please select a file and a category.");
      return;
    }

    const uploadData = new FormData();
    uploadData.append("who", who);
    uploadData.append("why", why);
    uploadData.append("what", what);
    uploadData.append("file", file);

    try {
      const response = await api.post("/upload", uploadData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        // Show success modal and reset form
        setShowSuccessModal(true); //Show success modal
      } else {
        setStatus("Upload failed.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setStatus("An error occurred during upload.");
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-header">
        <h2>Upload Files</h2>
        <LogoutButton />
      </div>

      <form onSubmit={handleSubmit} className="upload-form">
        <label htmlFor="who">Who:</label>
        <input
          type="text"
          name="who"
          id="who"
          value={formData.who}
          onChange={handleChange}
        />

        <label htmlFor="why">Why:</label>
        <input
          type="text"
          name="why"
          id="why"
          value={formData.why}
          onChange={handleChange}
        />

        <label htmlFor="what">What:</label>
        <select
          name="what"
          id="what"
          value={formData.what}
          onChange={handleChange}
        >
          <option value="">Select a category</option>
          <option value="image/document">Image/Document</option>
          <option value="image/person">Image/Person</option>
          <option value="image/handwriting">Image/Handwriting</option>
          <option value="image/vehicle">Image/Vehicle</option>
          <option value="call_data_records">Call Data Records</option>
          <option value="crossbow">Crossbow</option>
          <option value="riptide">Riptide</option>
          <option value="telematics">Telematics</option>
          <option value="air_tracks">Air Tracks</option>
          <option value="pings">Pings</option>
          <option value="document">Document</option>
        </select>

        <label htmlFor="file">File:</label>
        <DragAndDrop onFileSelect={handleFileChange} />

        <button type="submit">Upload</button>

        {status && <p className="upload-status">{status}</p>}
      </form>
      {showSuccessModal && (
        <SuccessModal 
            message = "Upload Successful!"
            onClose={() => setShowSuccessModal(false)} />
      )}
    </div>
  );
};

export default UploadPage;
