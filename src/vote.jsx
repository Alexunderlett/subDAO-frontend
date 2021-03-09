import React, {useEffect, useState} from 'react';
import VotePagination from './components/vote/votePagination';
import VotePending from './components/vote/votePending';
import VoteActive from './components/vote/voteActive';
import {Button} from "react-bootstrap";
import PageBackground from "./components/pagebackground";
import {useSubstrate} from "./api/contracts";

import api from './api/index';


export default function Vote(props){

    const {state,dispatch} = useSubstrate();
    const {votecontract} = state;

    const [id, setAId] = useState(null);
    const [activelist, setActivelist] = useState([]);
    const [pendinglist, setPendinglist] = useState([]);
    const [historylist, setHistorylist] = useState([]);
    const [logo, setLogo] = useState('');

    const  handleClicktonewVote = () => {
        props.history.push(`/newVote/${props.match.params.id}`);
    }
    useEffect(() => {
        setAId(props.match.params.id);
        let logo = sessionStorage.getItem('logo');
        setLogo(logo);
    }, []);

    useEffect(async() => {
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

        // if(votecontract === null) return ;

        // const value = 0;
        // const gasLimit = -1;
        //
        // const keyring = new Keyring({ type: 'sr25519' });
        //
        // const alice = keyring.addFromUri('//Alice');
        //
        //



        // await votecontract.tx.newVote({value, gasLimit}, "hehe", "haha", 1000, 1, 1, "A,B,C").
        // signAndSend(alice, (result) => {
        //     if (result.status.isInBlock) {
        //         console.log(vote);
        //     } else if (result.status.isFinalized) {
        //         console.log('finalized');
        //     }
        // });

        // console.log(votecontract);

        // await votecontract.exec('vote', {value, gasLimit}, 5, 0, alice.address).
        // signAndSend(alice, (result) => {
        //     if (result.status.isInBlock) {
        //         console.log('inblock');
        //     } else if (result.status.isFinalized) {
        //         console.log('finalized');
        //     }
        // });

        // await votecontract.exec('execute', {value, gasLimit}, 5).
        // signAndSend(alice, (result) => {
        //     if (result.status.isInBlock) {
        //         console.log('inblock');
        //     } else if (result.status.isFinalized) {
        //         console.log('finalized');
        //     }
        // })

        // const result = await votecontract.exec('query_all_vote', {value, gasLimit});

    }, []);

        return (
            <div>
                <section>
                    <PageBackground />
                    <div className="container">
                        <div className="createSingle row">
                            <div className='col-lg-4'>
                                <div>
                                    <img src={logo} alt=""/>
                                </div>
                                <div className='newVote'>
                                    <Button variant="primary" onClick={handleClicktonewVote}>New voting</Button>
                                </div>
                            </div>
                            <div className='col-lg-8'>
                                <ul className="vote">
                                    <li>
                                        <h6>Active Voting List</h6>
                                        <VoteActive
                                            id={id}
                                            list={activelist}
                                            history={props.history}
                                        />
                                    </li>
                                    <li>
                                        <h6>Pending Voting List</h6>
                                        <VotePending
                                            id={id}
                                            list={pendinglist}
                                            history={props.history}
                                        />
                                    </li>
                                    <li>
                                        <h6>History</h6>
                                        <VotePagination
                                            id={id}
                                            list={historylist}
                                            history={props.history}  />
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        )

}

