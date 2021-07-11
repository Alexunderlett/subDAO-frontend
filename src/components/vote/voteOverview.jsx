import React, {useEffect, useState} from 'react';
import VoteEcharts from "./voteEcharts";
import api from "../../api";
import {useSubstrate} from "../../api/contracts";
import Left from "../left";
import Back from "../../images/prev.png";
import {useTranslation} from "react-i18next";

export default function VoteOverview (props){
    const {state} = useSubstrate();
    const {votecontract} = state;
    const [voteid, setvoteid] = useState(null);
    const [title, settitle] = useState('');
    const [desc, setdesc] = useState('');
    const [support, setsupport] = useState('');
    const [min, setmin] = useState('');
    const [toaddress, settoaddress] = useState('');
    const [optionlist, setoptionlist] = useState([]);
    const [toValue, settovalule] = useState('');
    const [endtime, setendtime] = useState('');
    const [executed, setexecuted] = useState('');

    let { t } = useTranslation();

    const handleClicktoVote = () => {
       props.history.push(`/vote/${props.match.params.id}`)
    }
    useEffect(() => {
        const setOneVote = async() => {
            await api.vote.queryOneVote(votecontract, props.match.params.voteid).then(data => {
                if (!data) return;

                const {
                    vote_id, title, desc, support_require_num, min_require_num, choices, to_address,transfer_value,start_date,vote_time, executed
                } = data;

                let stime = start_date.replace(/,/g,'');
                let vtime = vote_time.replace(/,/g,'');

                let etime = parseInt(stime) + parseInt(vtime);
                let date = new Date(etime);
                let y = date.getFullYear();
                let MM = date.getMonth() + 1;
                MM = MM < 10 ? ('0' + MM) : MM;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                let h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                let m = date.getMinutes();
                m = m < 10 ? ('0' + m) : m;
                let s = date.getSeconds();
                s = s < 10 ? ('0' + s) : s;
                setendtime(`${y}-${MM}-${d} ${h}:${m}:${s}`);

                settitle(title);
                setexecuted(executed);
                setvoteid(vote_id);
                setdesc(desc);
                settoaddress(to_address);
                settovalule(transfer_value);
                setsupport(support_require_num);
                setmin(min_require_num);
                let arr = [], afterArr = [];
                arr = choices.split('|');
                arr.map((i, index) => {
                    let obj = i.split(":");
                    afterArr[index] = {
                        value: obj[1] ? parseInt(obj[1]) : 0,
                        name: obj[0]
                    };
                    return i;
                });
                if (afterArr.length) {
                    setoptionlist(afterArr);
                }

            });
        };

        setOneVote();
    }, []);

    return (
        <div>
            <section>
                <div className="row">
                        <div className="col-lg-3">
                            <Left />
                        </div>
                        <div className="col-lg-9">
                            <div className='voteTop mt10'>
                                <div className='voteLft' onClick={handleClicktoVote}>
                                    <img src={Back} alt=""/> {t('Back')}
                                </div>
                            </div>
                            <div className="row">
                                <div className='col-lg-4 bg overView'>
                                    <ul>
                                        <li>
                                            <h6>{t('Title')}</h6>
                                            <div>{title}</div>
                                        </li>
                                        <li>
                                            <h6>{t('VotingDescription')}</h6>
                                            <div>{desc}</div>
                                        </li>
                                        <li>
                                            <h6>Voting ends at</h6>
                                            <div className='endtime'>{endtime}</div>
                                        </li>
                                        <li>
                                            <h6>{t('VotingNumber')}</h6>
                                            <div>{voteid}</div>

                                        </li>

                                        <li>
                                            <h6>{t('supportnumber')}</h6>
                                            <div>{support}</div>

                                        </li>
                                        <li>
                                            <h6>{t('minnumber')}</h6>
                                            <div>{min}</div>

                                        </li>
                                        <li>
                                            <h6>{t('Amount')}</h6>
                                            <div>{toValue}</div>

                                        </li>
                                        <li>
                                            <h6>{t('ReceiverAddress')}</h6>
                                            <div className='address'>{toaddress}</div>
                                        </li>
                                        <li>
                                            <h6>Transaction Status</h6>
                                            <div className='address'>{executed?'Successful':'Failed'}</div>
                                        </li>

                                    </ul>
                                </div>
                                <div className='col-lg-8 bg'>
                                    {
                                        !!optionlist.length&&<VoteEcharts optionlist={optionlist} />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
            </section>

        </div>
    )

}
