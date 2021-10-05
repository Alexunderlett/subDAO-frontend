import { Button, Modal } from 'antd';

import { useTranslation } from "react-i18next";

export default function ExitOrg(props) {

    let { t } = useTranslation();

    let { handleClose, showTips, handleConfirm } = props;

    return <Modal visible={showTips} onCancel={handleClose} footer={null} centered={true} maskClosable={false}>
        <div className="confirmInnerTitle">{t('exitOrg')}</div>
        <div className="confirmInnerBtnGroup">
            <Button className="default" onClick={()=>handleClose()} >
                {t('Close')}
            </Button>
            <Button type="primary" onClick={()=>handleConfirm()}>
                {t('Confirm')}
            </Button>

        </div>

    </Modal>;
}


