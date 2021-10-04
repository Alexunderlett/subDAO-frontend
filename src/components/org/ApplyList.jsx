import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';

import api from "../../api";
import { useSubstrate } from "../../api/contracts";
import Loading from "../loading/Loading";
import auth from '../../images/Vector.png';
import authWhite from '../../images/auth.png';
import { useTranslation } from "react-i18next";
import applyList from "../../images/apply.png";
import Sel from "../../img/Sel.png";
import closeImg from "../../images/shutdownW.png";
import styled from 'styled-components';

const Li = styled.li`
    .title{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .name{

            font-size: 1.6rem;
            font-family: Roboto-Light, Roboto;
            font-weight: 300;
            color: #010643;
            line-height: 3.2rem;
        }
        img{
            width: 3.2rem;
            height: 3.2rem;
        }
    }
    .detail{
        height: 1.8rem;
        font-size: 1.4rem;
        font-family: Roboto-Light, Roboto;
        font-weight: 300;
        color: rgba(1, 6, 67, 0.4);
        line-height: 1.6rem;
    }
`

export default function ApplyList(props) {

    const { state, dispatch } = useSubstrate();
    const { orgcontract } = state;

    const [list, setlist] = useState([]);

    const [approveApply, setapproveApply] = useState(false);

    const [errorShow, seterrorShow] = useState(false);

    let { t } = useTranslation();

    useEffect(() => {
        const getApplyList = async () => {
            await api.org.getApplyList(orgcontract).then(data => {
                if (!data) return;
                setlist(data)
            });
        }
        getApplyList();
    }, [props.showTips, approveApply]);


    const handleAprove = async (i) => {
        const obj = {
            address: i[0],
            name: i[1]
        };
        dispatch({ type: 'LOADINGTYPE', payload: t('ApproveSent') });
        await api.org.ApproveMember(orgcontract, obj, function (result) {
            console.log("ApproveMember", result)
            setapproveApply(!approveApply);
            dispatch({ type: 'LOADINGTYPE', payload: null });
            props.handleClose();
            props.refresh()
        }).catch((error) => {
            seterrorShow(true)

            dispatch({ type: 'MSGTYPE', payload: { msg: `Approve Member: ${error.message}` } });
            dispatch({ type: 'LOADINGTYPE', payload: null });
        });
    }

    let { handleClose, showTips } = props;
    return <div>
        <Modal visible={showTips} onCancel={handleClose} footer={null}>
            <div className="title">
                {/* <img src={applyList} alt="" /> */}
                <span >{t('applyList')}</span>
            </div>

            <ul className='applylist'>
                {
                    list.map((i, index) => <Li key={`apply_${index}_${i[0]}`}>
                        <div className="title">
                            <div className='name'>{i[1]}</div>
                            {/*<img src={closeImg} alt=""/>*/}
                            <img src={Sel} alt="" onClick={() => handleAprove(i)} />
                        </div>
                        <div className="detail">{i[0]}</div>
                    </Li>
                    )
                }
            </ul>
        </Modal>
    </div>;
}
