import React from 'react';
import {Spinner, Modal} from "react-bootstrap";

export default function Loading(props){

    const {showLoading,tips} = props;
    return <Modal
        show={showLoading}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className='loading'
        onHide={() => {}}
    >
        <Modal.Body>
            <div className="spinner">
                <Spinner animation="border" variant="light" />
            </div>
             <h4 className="waiting">{tips}</h4>
        </Modal.Body>
    </Modal>;

}

