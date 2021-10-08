import React, {useEffect, useState} from 'react';
import VoteView from '../vote/voteView';

import VotingImg from '../../img/votingImg.png';

import PublicJS from '../../utils/publicJs';
import styled from 'styled-components';

const BtnSpan = styled.span`
    padding:0 0.5rem;
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
    img{
    display: inline-block;
    width: 1.5rem;
    margin-right: 0.5rem;
    }
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
        setvoteid(voteid)
    }

    const handleClicktoVoteview = (voteid) => {
        let { id,owner } = props;
        props.history.push(`/voteOverview/${id}/${voteid}`)

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
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        indexList.map((item)=><tr key={`active_${item.vote_id}`}>
                            <td onClick={()=>handleClicktoVoteview(item.vote_id)}>{item.vote_id}</td>
                            <td onClick={()=>handleClicktoVoteview(item.vote_id)}>{PublicJS.formatvoteDateTime(item.start_date,item.vote_time)}</td>
                            <td onClick={()=>handleClicktoVoteview(item.vote_id)}>{item.title}</td>
                            <td>
                                <BtnSpan onClick={()=>handleView(item.vote_id)}><img src={VotingImg} alt=""/>Vote</BtnSpan>
                            </td>

                        </tr>)
                    }
                    </tbody>
                </table>
            </div>
        )


}
