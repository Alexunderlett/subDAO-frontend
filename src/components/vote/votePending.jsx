import React, { useEffect, useState} from 'react';

import { Modal } from 'antd';
import VoteModalTips from "./votemodalTips";
import api from "../../api";
import {useSubstrate} from "../../api/contracts";
import Loading from "../loading/Loading";

import TriggerBtn from "../../img/switchClose.png";
import PublicJS from "../../utils/publicJs";

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
        let { id,owner } = props;

        setLoading(true);
        setTips('Trigger transfer token');

        await api.vote.executeVote(votecontract,selectid,(data)=>{

            setLoading(false);
            settoTop(data);
            props.history.push(`/voteOverview/${id}/${selectid}/${owner}`)
        }).catch((error) => {
            seterrorShow(true);
            seterrorTips(`Voting: ${error.message}`);
            setLoading(false);

        });
    }
    const handleClicktoVoteview = (voteid) => {
        let { id,owner } = props;
        props.history.push(`/voteOverview/${id}/${voteid}/${owner}`)
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
            <table className="myTable">
                <thead>
                <tr>
                    <th>Number</th>
                    <th>Time</th>
                    <th>Title</th>
                    <th>Trigger</th>
                </tr>
                </thead>
                <tbody>
                {
                    list.map((item)=><tr key={`Pending_${item.vote_id}`}>
                        <td onClick={()=>handleClicktoVoteview(item.vote_id)}>{item.vote_id}</td>
                        <td onClick={()=>handleClicktoVoteview(item.vote_id)}>{PublicJS.formatvoteDateTime(item.start_date,item.vote_time)}</td>
                        <td onClick={()=>handleClicktoVoteview(item.vote_id)}>{item.title}</td>
                            <td onClick={()=>triggerConfirm(item.vote_id)}> <img src={TriggerBtn} alt=""/></td>
                    </tr>)
                }

                </tbody>
            </table>
        </div>)
}

