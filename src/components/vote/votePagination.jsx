import React, {useEffect, useState} from 'react';
import view from '../../images/view.png';
import {useTranslation} from "react-i18next";
import TriggerBtn from "../../img/switchClose.png";
import TriggerBtnActive from "../../img/switchOpen.png";

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
                        {/*<th>{t('Number')}</th>*/}
                        {/*<th>{t('Title')}</th>*/}
                        {/*<th>{t('View')}</th>*/}

                        <th>Number</th>
                        <th>Time</th>
                        <th>Title</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/*{*/}
                    {/*    indexList.map((item)=><tr key={`history_${item.vote_id}`}>*/}
                    {/*        <td>{item.vote_id}</td>*/}
                    {/*        <td>{item.title}</td>*/}
                    {/*        <td><span onClick={()=>handleClicktoVoteview(item.vote_id)}><img src={view} alt=""/></span></td>*/}
                    {/*    </tr>)*/}
                    {/*}*/}

                    <tr>
                        <td>01</td>
                        <td>12:28:00  8/11/2021</td>
                        <td>This confirm the statement ack packet</td>
                    </tr><tr>
                        <td>01</td>
                        <td>12:28:00  8/11/2021</td>
                        <td>This confirm the statement ack packet</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
}


