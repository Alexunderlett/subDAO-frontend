import React, {useEffect, useState} from 'react';
import voteActive from '../../images/votingactive.png';
import view from '../../images/view.png';
import VoteView from '../vote/voteView';
import {useTranslation} from "react-i18next";

import {useSubstrate} from "../../api/contracts";
import api from "../../api";
import TriggerBtn from "../../img/switchClose.png";
import TriggerBtnActive from "../../img/switchOpen.png";


export default function VoteActive(props){

    const {state,dispatch} = useSubstrate();
    const {votecontract,allAccounts,apiState} = state;

    const [indexList, setIndexList] = useState([]);
    const [newshow, setnewshow] = useState(false);
    const [voteid, setvoteid] = useState(null);


    let { t } = useTranslation();

    useEffect(() => {
        if(props.list.length){
            setIndexList(props.list)
        }
    }, [props]);

    const  handleClose = () => {
        setnewshow(false)
    }

    const handleView = (voteid) => {

        setnewshow(true)
            // const{id} = props;
        setvoteid(voteid)
            // props.history.push(`/voteView/${id}/${voteid}`)
    }

    const handleClicktoVoteview = (voteid) => {
        let { id } = props;
        props.history.push(`/voteOverview/${id}/${voteid}/${props.owner}`)

    }
        return (
            <div className='votePending'>
                {
                    newshow &&   <VoteView  handleClose={handleClose} showTips={newshow} voteid={voteid} id={props.id}/>
                }

                <table>
                    <thead>
                    <tr>
                        {/*<th>{t('Number')}</th>*/}
                        {/*<th>{t('Number')}</th>*/}
                        {/*<th>{t('Title')}</th>*/}
                        {/*<th>{t('View')}</th>*/}
                        <th>Number</th>
                        <th>Time</th>
                        <th>Title</th>
                        <th>Trigger</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/*{*/}
                    {/*    indexList.map((item)=><tr key={`active_${item.vote_id}`}>*/}
                    {/*        <td>{item.vote_id}</td>*/}
                    {/*        <td>{item.title}</td>*/}
                    {/*        <td className='voteViewTD'>*/}
                    {/*            <div>*/}
                    {/*                <span onClick={()=>handleView(item.vote_id)}><img src={voteActive} alt=""/></span>*/}
                    {/*                <span onClick={()=>handleClicktoVoteview(item.vote_id)}><img src={view} alt=""/></span>*/}
                    {/*            </div>*/}

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
            </div>
        )


}
