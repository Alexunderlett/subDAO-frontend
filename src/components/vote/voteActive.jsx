import React, {useEffect, useState} from 'react';
import VoteView from '../vote/voteView';

import {useSubstrate} from "../../api/contracts";

import PublicJS from '../../utils/publicJs';
import styled from 'styled-components';

const BtnSpan = styled.span`
    width: 6.6rem;
    height: 2.6rem;
    background: #EEF5F0;
    border-radius: 0.4rem;
    border: 0.1rem solid #6AB861;
    display: inline-block;
    text-align: center;
    line-height: 2.6rem;
    font-size: 1.2rem;
    font-family: Roboto-Regular;
    font-weight: 400;
    color: #6AB861;
`


export default function VoteActive(props){

    const [indexList, setIndexList] = useState([]);
    const [newshow, setnewshow] = useState(false);
    const [voteid, setvoteid] = useState(null);

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
            // const{id,owner} = props;
        setvoteid(voteid)
            // props.history.push(`/voteView/${id}/${voteid}/${owner}`)
    }

    const handleClicktoVoteview = (voteid) => {
        let { id,owner } = props;
        props.history.push(`/voteOverview/${id}/${voteid}/${owner}`)

    }
        return (
            <div className='votePending'>
                {
                    newshow &&   <VoteView  handleClose={handleClose} showTips={newshow} voteid={voteid} id={props.id}/>
                }

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
                        indexList.map((item)=><tr key={`active_${item.vote_id}`}>
                            <td onClick={()=>handleClicktoVoteview(item.vote_id)}>{item.vote_id}</td>
                            <td onClick={()=>handleClicktoVoteview(item.vote_id)}>{PublicJS.formatvoteDateTime(item.start_date,item.vote_time)}</td>
                            <td onClick={()=>handleClicktoVoteview(item.vote_id)}>{item.title}</td>
                            <td>
                                <BtnSpan onClick={()=>handleView(item.vote_id)}>Voting</BtnSpan>
                            </td>

                        </tr>)
                    }
                    </tbody>
                </table>
            </div>
        )


}
