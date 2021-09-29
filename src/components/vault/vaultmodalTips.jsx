import React, { Component } from 'react';
import { Button, Modal } from 'antd';

class VaultmodalTips extends Component {
    render() {
        let { handleClose, showTips, handleConfirm } = this.props;
        return <Modal visible={showTips} onCancel={handleClose} footer={null}>

            <div className="title">Are you absolutely sure?</div>

            <div>This action cannot be undone.</div>
            <div>
                <Button onClick={handleClose}>
                    Close
                </Button>
                <Button type="primary" onClick={handleConfirm}>
                    Confirm
                </Button>
            </div>
        </Modal>;
    }
}

export default VaultmodalTips;
