import React, {useEffect, useState} from 'react';
import VoteView from '../vote/voteView';

import {useSubstrate} from "../../api/contracts";

import PublicJS from '../../utils/publicJs';


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
                                <span onClick={()=>handleView(item.vote_id)}>Voting</span>
                            </td>

                        </tr>)
                    }
                    </tbody>
                </table>
            </div>
        )


}
