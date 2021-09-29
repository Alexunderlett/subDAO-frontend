import React, {useEffect, useState} from 'react';
import view from '../../images/view.png';
import {useTranslation} from "react-i18next";

export default function VotePagination(props){
    const [indexList, setIndexList] = useState([]);
    let { t } = useTranslation();

    useEffect(() => {
        if(props.list.length){
            setIndexList(props.list)
        }

    }, [props]);
    const handleClicktoVoteview = (voteid) => {
        let { id } = props;
        props.history.push(`/voteOverview/${id}/${voteid}`)
    }
        return (
            <div className='votePending'>
                <table>
                    <thead>
                    <tr>
                        <th>{t('Number')}</th>
                        <th>{t('Title')}</th>
                        <th>{t('View')}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        indexList.map((item)=><tr key={`history_${item.vote_id}`}>
                            <td>{item.vote_id}</td>
                            <td>{item.title}</td>
                            <td><span onClick={()=>handleClicktoVoteview(item.vote_id)}><img src={view} alt=""/></span></td>
                        </tr>)
                    }
                    </tbody>
                </table>
            </div>
        )
}


