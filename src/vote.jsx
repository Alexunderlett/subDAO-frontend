import React, {useEffect, useState} from 'react';
import VotePagination from './components/vote/votePagination';
import VotePending from './components/vote/votePending';
import VoteActive from './components/vote/voteActive';
import NewVote from "./components/vote/newVote";

import {useSubstrate} from "./api/contracts";

import api from './api/index';

import Loading from './components/loading/Loading';
import Left from './components/left';
import voting from './images/voting.png';
import Back from  './images/prev.png';
import {useTranslation} from "react-i18next";

export default function Vote(props){

    const {state} = useSubstrate();
    const {votecontract} = state;

    const [loading,setLoading]= useState(false);
    const [tips,setTips]= useState('');

    const [id, setAId] = useState(null);
    const [activelist, setActivelist] = useState([]);
    const [pendinglist, setPendinglist] = useState([]);
    const [historylist, setHistorylist] = useState([]);

    const [newshow, setnewshow] = useState(false);

    let { t } = useTranslation();

    const  handleClicktonewVote = () => {
        setnewshow(true)
    }
    const  handleClose = () => {
        setnewshow(false)
    }
    const  handleClicktoAbout = () => {
        props.history.push(`/home/about/${props.match.params.id}`);
    }
    useEffect(() => {
        setAId(props.match.params.id);
    }, []);

    const setAll = async() => {
        setLoading(true);
        setTips( t('InitializeVote'));
        await api.vote.queryOpenVote(votecontract).then(data => {
            if (!data) return;
            setActivelist(data)
        });

        await api.vote.queryWaitVote(votecontract).then(data => {
            if (!data) return;
            setPendinglist(data)
        });

        await api.vote.queryAllVote(votecontract).then(data => {
            if (!data) return;
            setHistorylist(data)
        });
        setLoading(false);
    };

    useEffect(() => {
        setAll();
    }, []);

        return (
            <div>
                <Loading showLoading={loading} tips={tips}/>
                <section>
                        <div className=" row">

                            <div className='col-lg-3'>
                                <Left />
                            </div>
                            <div className='col-lg-9'>
                                <div className='voteTop'>
                                    <div className='voteLft' onClick={handleClicktoAbout}>
                                        <img src={Back} alt=""/> {t('Back')}
                                    </div>
                                    <button className='btnR' onClick={handleClicktonewVote}><img src={voting} alt=""/>{t('Newvoting')}</button>

                                </div>
                                <NewVote handleClose={handleClose} showTips={newshow} refresh={setAll}/>
                                <div className='VotewidthAuto'>
                                    <div className="wrapper">
                                        <ul className="vote displayFlex">
                                            <li>
                                                <h6>{t('ActiveVoting')}</h6>
                                                <VoteActive
                                                    id={id}
                                                    list={activelist}
                                                    history={props.history}
                                                />
                                            </li>
                                            <li>
                                                <h6>{t('PendingVoting')}</h6>
                                                <VotePending
                                                    id={id}
                                                    list={pendinglist}
                                                    history={props.history}
                                                />
                                            </li>


                                            <li>
                                                <h6>{t('History')}</h6>
                                                <VotePagination
                                                    id={id}
                                                    list={historylist}
                                                    history={props.history}  />
                                            </li>

                                        </ul>
                                    </div>

                                </div>

                            </div>
                        </div>

                </section>

            </div>
        )

}

