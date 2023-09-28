import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const ImageViewer = (props) => {
    const [idToDelete, setIdToDelete] = useState(null);
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    };

    const handleShow = (index) => {
        setIdToDelete(idToDelete);
        setShow(true);
    };

    const confirmDelete = () => {
        props.deleteImage(idToDelete);
        handleClose();
        setIdToDelete(null);
    };

    return (
        <>
            {props.formik && props.formik.values.images
                ? props.formik.values.images.map((item, i) => (
                      <div
                          key={i}
                          className="pic_block"
                          onClick={() => handleShow(i)}
                          style={{
                              background: `url(${item})`,
                          }}
                      ></div>
                  ))
                : null}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this image
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Delete it
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ImageViewer;
