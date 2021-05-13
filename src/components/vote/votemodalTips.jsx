import {Button, Modal} from "react-bootstrap";
import {useTranslation} from "react-i18next";

export default function VoteModalTips(props)  {

    let { t } = useTranslation();

    let {handleClose, showTips,handleConfirm} = props;

    return <Modal show={showTips} onHide={handleClose} centered={true}  className='newVoteBrdr'>
        <Modal.Body>{t('sureTrigger')}</Modal.Body>
        <div className='NextBrdr button2'>
            <Button variant="secondary" onClick={handleClose}>
                {t('Close')}
            </Button>
            <Button variant="primary" onClick={handleConfirm}>
                 {t('Confirm')}
            </Button>
        </div>
    </Modal>;

}


