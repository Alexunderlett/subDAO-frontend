import React, {useEffect, useState} from 'react';

import {Table} from 'react-bootstrap';
import voteActive from '../../images/votingactive.png';
import view from '../../images/view.png';
import VoteView from '../vote/voteView';
import {useTranslation} from "react-i18next";

import {useSubstrate} from "../../api/contracts";
import api from "../../api";


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
        props.history.push(`/voteOverview/${id}/${voteid}`)

    }
        return (
            <div className='votePending'>
                {
                    newshow &&   <VoteView  handleClose={handleClose} showTips={newshow} voteid={voteid} id={props.id}/>
                }

                <Table hover>
                    <thead>
                    <tr>
                        <th>{t('Number')}</th>
                        <th>{t('Title')}</th>
                        <th>{t('View')}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        indexList.map((item)=><tr key={`active_${item.vote_id}`}>
                            <td>{item.vote_id}</td>
                            <td>{item.title}</td>
                            <td className='voteViewTD'>
                                <div>
                                    <span onClick={()=>handleView(item.vote_id)}><img src={voteActive} alt=""/></span>
                                    <span onClick={()=>handleClicktoVoteview(item.vote_id)}><img src={view} alt=""/></span>
                                </div>

                            </td>

                        </tr>)
                    }
                    </tbody>
                </Table>
            </div>
        )


}
