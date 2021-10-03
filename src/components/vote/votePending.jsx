import React, { useEffect, useState} from 'react';

import { Modal } from 'antd';
import VoteModalTips from "./votemodalTips";
import api from "../../api";
import {useSubstrate} from "../../api/contracts";
import Loading from "../loading/Loading";

import TriggerBtn from "../../img/switchClose.png";
import TriggerBtnActive from "../../img/switchOpen.png";

export default function VotePending(props) {
    const {state} = useSubstrate();
    const {votecontract} = state;

    const [loading,setLoading]= useState(false);
    const [tips,setTips]= useState('');

    const [showModal, setShowModal] = useState(false);
    const [list, setList] = useState([]);
    const [selectid, setselectid] = useState('');
    const [toTop, settoTop] = useState(false);

    const [errorShow,seterrorShow]= useState(false);
    const [errorTips,seterrorTips]= useState('');


    useEffect(() => {
        if(props.list.length){
            setList(props.list)
        }

    }, [props]);

    const triggerConfirm = (id)=>{
        setselectid(id);
        setShowModal(true)
    }
    const handleClose = () => {
        setShowModal(false);
        setselectid('')
    }
    const handleConfirm = async (e) => {
        setShowModal(false);
        let { id } = props;

        setLoading(true);
        setTips('Trigger transfer token');

        await api.vote.executeVote(votecontract,selectid,(data)=>{

            setLoading(false);
            settoTop(data)
            props.history.push(`/voteOverview/${id}/${selectid}`)
        }).catch((error) => {
            seterrorShow(true)
            seterrorTips(`Voting: ${error.message}`)
            setLoading(false);

        });
    }
    const handleClicktoVoteview = (voteid) => {
        let { id } = props;
        props.history.push(`/voteOverview/${id}/${voteid}`)
    }
    return (<div className='votePending'>
        <Loading showLoading={loading} setLoading={()=>{setLoading(false)}} tips={tips}/>
        <Modal
            visible={errorShow}
            onCancel={() => seterrorShow(false)}
            footer={null}
        >
            <div className="title">{errorTips}</div>
        </Modal>
            <VoteModalTips
                handleClose={handleClose}
                handleConfirm={handleConfirm}
                showTips={showModal}/>
            <table className="">
                <thead>
                <tr>
                    <th>Number</th>
                    <th>Time</th>
                    <th>Title</th>
                    <th>Trigger</th>
                </tr>
                </thead>
                <tbody>
                {/*{*/}
                {/*    list.map((item)=><tr key={`Pending_${item.vote_id}`}>*/}
                {/*        <td>{item.vote_id}</td>*/}
                {/*        <td>{item.title}</td>*/}
                {/*        <td className='voteViewTD'>*/}
                {/*            <span onClick={()=>triggerConfirm(item.vote_id)}>trigger</span>*/}
                {/*            <span onClick={()=>handleClicktoVoteview(item.vote_id)}>view</span>*/}
                {/*        </td>*/}
                {/*    </tr>)*/}
                {/*}*/}
                <tr>
                    <td>01</td>
                    <td>12:28:00  8/11/2021</td>
                    <td>This confirm the statement ack packet</td>
                    <td><img src={TriggerBtn} alt=""/></td>
                </tr><tr>
                    <td>01</td>
                    <td>12:28:00  8/11/2021</td>
                    <td>This confirm the statement ack packet</td>
                    <td><img src={TriggerBtnActive} alt=""/></td>
                </tr>

                </tbody>
            </table>
        </div>)
}

