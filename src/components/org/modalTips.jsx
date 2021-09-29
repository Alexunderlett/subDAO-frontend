import React, {Component} from 'react';
import { Button, Modal } from 'antd';

class ModalTips extends Component {
    render() {
        let {handleClose, showTips} = this.props;
        return <Modal visible={showTips} onCancel={handleClose} footer={null}>
                <div className="title">Are you absolutely sure?</div>

            <div>This action cannot be undone. This will permanently delete these Moderators.</div>
            <div>
                <Button onClick={handleClose}>
                    Close
                </Button>
                <Button type="primary" onClick={handleClose}>
                    Confirm
                </Button>
            </div>
        </Modal>;
    }
}

export default ModalTips;
