import React, {useEffect, useState} from 'react';
import t3 from "./images/t-4.png";
import VotePagination from './components/vote/votePagination';
import VotePending from './components/vote/votePending';
import VoteActive from './components/vote/voteActive';
import {Button} from "react-bootstrap";
import PageBackground from "./components/pagebackground";
import {useSubstrate} from "./api/contracts";
import Accounts from "./api/Account";
const { Keyring } = require('@polkadot/keyring');

export default function Vote(props){

    const {state,dispatch} = useSubstrate();
    const {votecontract} = state;

    const [id, setAId] = useState(null);

    const  handleClicktonewVote = () => {
        props.history.push(`/newVote/${id}`);
        console.log("new_vote");
    }
    const handleClicktoview = (voteid) => {
        let { id } = props;
        props.history.push(`/voteView/${id}/${voteid}`)
    }
    const handleClicktoVoteview = (voteid) => {
        let { id } = props;
        props.history.push(`/voteOverview/${id}/${voteid}`)
    }
    useEffect(() => {
        setAId(props.match.params.id)
        console.log("use effect load");
        dispatch({type: 'LOAD_VOTE'});
    }, []);

    useEffect(async() => {
        if(votecontract === null) return ;

        const value = 0;
        const gasLimit = -1;

        const keyring = new Keyring({ type: 'sr25519' });

        const alice = keyring.addFromUri('//Alice');



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

        await votecontract.query.queryAllVote(alice.address, {value, gasLimit}).then(result =>{
            // console.log(output);
            const {output} = result;
            console.log(output);
        });
        // const result = await votecontract.exec('query_all_vote', {value, gasLimit});

    }, [votecontract]);

        return (
            <div>
                <section>
                    <PageBackground />
                    <div className="container">
                        <div className="createSingle row">
                            <div className='col-lg-4'>
                                <div>
                                    <img src={t3} alt=""/>
                                </div>
                                <div className='newVote'>
                                    <Button variant="primary" onClick={handleClicktonewVote}>New voting</Button>
                                </div>
                            </div>
                            <div className='col-lg-8'>
                                <ul className="vote">
                                    <li>
                                        <h6>Active Voting List</h6>
                                        <VoteActive  id={id}  history={props.history} />
                                    </li>
                                    <li>
                                        <h6>Pending Voting List</h6>
                                        <VotePending  id={id}  history={props.history}  />
                                    </li>
                                    <li>
                                        <h6>History</h6>
                                        <VotePagination id={id}  history={props.history}  />
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        )

}

