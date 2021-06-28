import React, {Component} from 'react';
import {Modal} from "react-bootstrap";
import { Trans,Translation } from 'react-i18next';

class ApplyTips extends Component {
    render() {
        let {handleClose, showTips} = this.props;
        return <Modal
            show={showTips}
            onHide={handleClose}
            centered={true}
            className='applytipsBrdr'
        >
            <Modal.Header closeButton />
            <Modal.Body>
                <h4><Trans>ApplicationSent</Trans></h4>
            </Modal.Body>
        </Modal>;
    }
}

export default ApplyTips;
