import React, { Component } from 'react';
import { Modal } from 'antd';
import { Trans, Translation } from 'react-i18next';

class ApplyTips extends Component {
    render() {
        let { handleClose, showTips } = this.props;
        return <Modal
            visible={showTips}
            onCancel={handleClose}
            footer={null}
        >
            <Trans>ApplicationSent</Trans>
        </Modal>;
    }
}

export default ApplyTips;
