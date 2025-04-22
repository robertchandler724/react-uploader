import React from "react";
import '../styles/SuccessModal.css';

const SuccessModal = ({ onClose }) => {
    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>Upload Successful!</h2>
                <p>Your file has been uploaded successfully.</p>
                <button className="modal-button" onClick={onClose}>
                    OK
                </button>
            </div>
        </div>
    );
}

export default SuccessModal;
// This component is a modal that displays a success message when a file is uploaded successfully.