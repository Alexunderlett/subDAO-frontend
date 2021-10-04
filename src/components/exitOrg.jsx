import { Button, Modal } from 'antd';

import { useTranslation } from "react-i18next";

export default function ExitOrg(props) {

    let { t } = useTranslation();

    let { handleClose, showTips, handleConfirm } = props;

    return <Modal visible={showTips} onCancel={handleClose} footer={null}>
        <div className="title">{t('exitOrg')}</div>

        <Button type="primary" onClick={handleConfirm} style={{ width: '100%', margin: '8rem 0px 3rem' }}>
            {t('Confirm')}
        </Button>
        <Button className="default" onClick={handleClose} style={{ width: '100%' }}>
            {t('Close')}
        </Button>
    </Modal>;
}


