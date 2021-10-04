import React, { Component } from 'react';
import { Button, Modal } from 'antd';

class ModalTips extends Component {
    render() {
        let { handleClose, showTips } = this.props;
        return <Modal visible={showTips} onCancel={handleClose} footer={null}>
            <div className="title">Are you absolutely sure?</div>

            <div>This action cannot be undone. This will permanently delete these Moderators.</div>

            <Button type="primary" style={{ width: '100%', margin: '8rem 0 3rem 0' }} onClick={handleClose}>
                Confirm
            </Button>
            <Button className="default" onClick={handleClose}>
                Close
            </Button>
        </Modal>;
    }
}

export default ModalTips;
