import React, { useEffect, useState } from 'react';
import { Button, Modal, Input } from 'antd';

import api from "../../api";
import { useSubstrate } from "../../api/contracts";
import Loading from "../loading/Loading";
import addnew from '../../images/newvoting.png';
import { useTranslation } from "react-i18next";
import remove from "../../images/shutdown.png";
import add from "../../images/Add.png";
import applyList from "../../images/apply.png";

export default function AddApply(props) {

    const { state } = useSubstrate();
    const { orgcontract } = state;

    const [loading, setLoading] = useState(false);
    const [tips, setTips] = useState('');
    const [name, setname] = useState('');

    const [addMember, setaddMember] = useState(false);
    const [errorShow, seterrorShow] = useState(false);
    const [errorTips, seterrorTips] = useState('');

    let { t } = useTranslation();


    useEffect(() => {
        if (addMember) {
            setLoading(false);
            props.handleTips()
        }
    }, [addMember])

    const handleInputChange = (e) => {
        const { value } = e.target;
        setname(value)
    }
    const handleSubmit = async () => {
        const obj = {
            name
        };

        setLoading(true);
        setTips(t('ApplyMember'));
        await api.org.applyMember(orgcontract, name, function (result) {
            setaddMember(result)
            props.handleClose()
            props.refresh()
            setname('')
        }).catch((error) => {
            seterrorShow(true)
            seterrorTips(`Apply Member: ${error.message}`)
            setLoading(false);
        });
    }

    let { handleClose, showTips } = props;
    return <div>
        <Loading showLoading={loading} setLoading={() => { setLoading(false) }} tips={tips} />
        <Modal
            visible={errorShow}
            onCancel={() => seterrorShow(false)}
            footer={null}
        >
            <div className="title">{errorTips}</div>
        </Modal>
        <Modal visible={showTips} onCancel={handleClose} footer={null}>
            <div className="title"><img src={applyList} alt="" /><span >Apply</span></div>
            <section>
                <ul className='addnew'>
                    <li>
                        <div>{t('FilltheName')}</div>
                        <div className="inputBrdr">
                            <Input
                                placeholder={t('FilltheName')}
                                name='name'
                                value={name}
                                autoComplete="off"
                                onChange={handleInputChange}
                            />
                        </div>
                    </li>
                    <li>
                        <div className='NextBrdr'>
                            <Button type="primary" onClick={() => handleSubmit()}>
                                Add
                            </Button>
                        </div>
                    </li>
                </ul>
            </section>
        </Modal>
    </div>;
}
