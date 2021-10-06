import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import PublicJS from "../../utils/publicJs";

export default function VotePagination(props){
    const [indexList, setIndexList] = useState([]);
    let { t } = useTranslation();

    useEffect(() => {
        if(props.list.length){
            setIndexList(props.list)
        }

    }, [props]);
    const handleClicktoVoteview = (voteid) => {
        let { id,owner } = props;
        props.history.push(`/voteOverview/${id}/${voteid}`)
    }
        return (
            <div className='votePending'>
                <table className="myTable">
                    <thead>
                    <tr>

                        <th>Number</th>
                        <th>Time</th>
                        <th>Title</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        indexList.map((item)=><tr key={`history_${item.vote_id}`} onClick={()=>handleClicktoVoteview(item.vote_id)}>
                            <td>{item.vote_id}</td>
                            <td>{PublicJS.formatvoteDateTime(item.start_date,item.vote_time)}</td>
                            <td>{item.title}</td>
                        </tr>)
                    }
                    </tbody>
                </table>
            </div>
        )
}


