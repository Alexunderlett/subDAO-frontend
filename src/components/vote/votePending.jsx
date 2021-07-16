import React, { useEffect, useState} from 'react';

import {Modal, Table} from "react-bootstrap";
import VoteModalTips from "./votemodalTips";
import api from "../../api";
import {useSubstrate} from "../../api/contracts";
import trigger from '../../images/trigger.png';
import {useTranslation} from "react-i18next";
import NewVote from "./newVote";
import view from "../../images/view.png";
import Loading from "../loading/Loading";

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

    let { t } = useTranslation();

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
        setTips(t('triggering'));

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
        <Loading showLoading={loading} tips={tips}/>
        <Modal
            show={errorShow}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={() => seterrorShow(false)}
            className='newVoteBrdr homebtm'
        >
            <Modal.Header closeButton />
            <Modal.Body>
                <h4>{errorTips}</h4>
            </Modal.Body>
        </Modal>
            <VoteModalTips
                handleClose={handleClose}
                handleConfirm={handleConfirm}
                showTips={showModal}/>
            <Table   hover>
                <thead>
                <tr>
                    <th>{t('Number')}</th>
                    <th>{t('Title')}</th>
                    <th>{t('Trigger')}</th>
                </tr>
                </thead>
                <tbody>
                {
                    list.map((item)=><tr key={`Pending_${item.vote_id}`}>
                        <td>{item.vote_id}</td>
                        <td>{item.title}</td>
                        <td className='voteViewTD'>
                            <span onClick={()=>triggerConfirm(item.vote_id)}><img src={trigger} alt=""/></span>
                            <span onClick={()=>handleClicktoVoteview(item.vote_id)}><img src={view} alt=""/></span>
                        </td>
                    </tr>)
                }
                </tbody>
            </Table>
        </div>)


}

