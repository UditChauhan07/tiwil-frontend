import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const CommonModal = ({ show, handleClose, title, body, footer, size, fullscreen }) => {
  return (
    <Modal show={show} onHide={handleClose} size={size} fullscreen={fullscreen} >
      
      <Modal.Header closeButton 
      // style={{ borderBottom: "none", }}
      >
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      {/* <Modal.Footer>
{footer}
      </Modal.Footer> */}
    </Modal>
  );
};

export default CommonModal;
