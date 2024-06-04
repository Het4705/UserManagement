import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the root element for accessibility

const CustomModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Confirmation Modal"
      className="Modal"
      overlayClassName="Overlay"
    >
      <h2>Do you really want to delete?</h2>
      <div className="modal-buttons">
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onClose}>No</button>
      </div>
    </Modal>
  );
};

export default CustomModal;
