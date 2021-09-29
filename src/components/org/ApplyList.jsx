import React, {useEffect, useState} from 'react';
import { Button, Modal } from 'antd';

import api from "../../api";
import {useSubstrate} from "../../api/contracts";
import Loading from "../loading/Loading";
import auth from '../../images/Vector.png';
import authWhite from '../../images/auth.png';
import {useTranslation} from "react-i18next";
import applyList from "../../images/apply.png";
import right from "../../images/Sel.png";
import closeImg from "../../images/shutdownW.png";

export default function ApplyList(props){

    const {state} = useSubstrate();
    const {orgcontract} = state;

    const [loading,setLoading]= useState(false);
    const [tips,setTips]= useState('');

    const [list,setlist]= useState([]);

    const [approveApply, setapproveApply] = useState(false);

    const [errorShow,seterrorShow]= useState(false);
    const [errorTips,seterrorTips]= useState('');

    let { t } = useTranslation();

    useEffect(() => {
        const getApplyList = async()=>{
            await api.org.getApplyList(orgcontract).then(data => {
                if (!data) return;
                setlist(data)
            });
        }
        getApplyList();
    }, [props.showTips,approveApply]);


    const handleAprove = async (i) =>{
        const obj= {
            address:i[0],
            name:i[1]
        };
        setLoading(true);
        setTips(t('ApproveSent'));
        await api.org.ApproveMember(orgcontract,obj,function (result) {
            console.log("ApproveMember",result)
            setapproveApply(!approveApply);
            setLoading(false);
            props.handleClose();
            props.refresh()
        }).catch((error) => {
            seterrorShow(true)
            seterrorTips(`Approve Member: ${error.message}`)
            setLoading(false);
        });
    }

    let {handleClose, showTips} = props;
    return <div>
        <Loading showLoading={loading} setLoading={()=>{setLoading(false)}} tips={tips}/>
        <Modal
            visible={errorShow}
            onCancel={() => seterrorShow(false)}
            footer={null}
        >
            <div>{errorTips}</div>
        </Modal>
        <Modal visible={showTips} onCancel={handleClose} footer={null}>
            <div className="title"><img src={applyList} alt=""/><span >{t('applyList')}</span></div>
                <section>
                    <ul className='applylist'>
                        {
                            list.map((i,index) =>  <li key={`apply_${index}_${i[0]}`}>
                                <div className='firstTitle'>
                                    <div className='title'>{i[1]}</div>
                                    <div>{i[0]}</div>
                                </div>
                                {/*<img src={closeImg} alt=""/>*/}
                                <img src={right} alt="" onClick={()=>handleAprove(i)}/>
                            </li>
                            )
                        }

                    </ul>
                </section>
        </Modal>
    </div>;
}
