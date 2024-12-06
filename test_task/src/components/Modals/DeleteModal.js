import React from 'react';
import './Modals.css';

const DeleteModal = ({ onConfirm, onCancel }) => (
    <div className="modal">
        <div className="modal-content">
            <p>Delete?</p>
            <div className="modal-actions">
                <button onClick={onConfirm}>Yes</button>
                <button onClick={onCancel}>No</button>
            </div>
        </div>
    </div>
);

export default DeleteModal;