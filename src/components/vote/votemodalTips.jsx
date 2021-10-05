import { Modal, Button } from 'antd';
import {useTranslation} from "react-i18next";

export default function VoteModalTips(props)  {

    let { t } = useTranslation();

    let {handleClose, showTips,handleConfirm} = props;

    return <Modal visible={showTips} onCancel={handleClose} footer={null} centered={true}  className='newVoteBrdr' maskClosable={false}>
        <div className="confirmInnerTitle">{t('sureTrigger')}</div>
        <div className='confirmInnerBtnGroup'>
            <Button onClick={handleClose}>
                {t('Close')}
            </Button>
            <Button type="primary" onClick={handleConfirm}>
                 {t('Confirm')}
            </Button>
        </div>
    </Modal>;

}


