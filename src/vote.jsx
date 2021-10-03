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
import TriggerBtn from "./img/switchClose.png";
import TriggerBtnActive from "./img/switchOpen.png";
import {Button} from "antd";
import styled from "styled-components";


const FirstLine = styled.div`
  position: relative;
`;
const BtnRht = styled.div`
position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  align-content: center;
  padding-right: 3rem;
  button{
    width: 9rem;
    height: 3rem;
    border-radius: 0.4rem;
    font-size: 1.2rem;
    margin-left: 2rem;
    padding: 0;
    line-height: 3rem;
    &.active{
      width: 9rem;
    height: 3rem;
    border-radius: 0.4rem;
    border: 0.1rem solid #D52473;
    color: #d52473;
    }
  }
`;

const Tablesec = styled.section`
  width: 78rem;
`;

export default function Vote(props){

    const {state,dispatch} = useSubstrate();
    const {votecontract,allAccounts,apiState,erc20contract,orgcontract} = state;

    const [loading,setLoading]= useState(false);
    const [tips,setTips]= useState('');

    const [id, setAId] = useState(null);
    const [activelist, setActivelist] = useState([]);
    const [pendinglist, setPendinglist] = useState([]);
    const [historylist, setHistorylist] = useState([]);

    const [isMember, setisMember] = useState(false);
    const [isModerator, setisModerator] = useState(false);
    const [isOwner, setisOwner] = useState(false);

    const [newshow, setnewshow] = useState(false);

    let { t } = useTranslation();

    const  handleClicktonewVote = () => {
        setnewshow(true)
    }
    const  handleClose = () => {
        setnewshow(false)
    }
    useEffect(async () => {
        setAId(props.match.params.id);
    }, []);

    useEffect( () => {
        setisMember(JSON.parse(sessionStorage.getItem('isMember')));
        setisModerator(JSON.parse(sessionStorage.getItem('isModerator')));
        setisOwner(JSON.parse(sessionStorage.getItem('isOwner')));
    }, [orgcontract,id]);

    useEffect(async () => {
        const initVoteContract = async () =>{
            let vote = JSON.parse(sessionStorage.getItem('contractlist'));
            if(votecontract == null && vote!= null){
                await api.vote.InitVote(state, dispatch, vote.vote_addr,(data) => {
                    console.log('votecontract====',data);
                });
            }
            if(erc20contract == null && vote!= null){
                await api.erc20.InitErc20(state, dispatch, vote.erc20_addr,(data) => {
                    console.log('erc20contract====',data);
                });
            }
            if(orgcontract == null && vote!= null){
                await api.org.InitOrg(state, dispatch, vote.org_addr,(data) => {
                    console.log('orgcontract====',data);
                });
            }
            setAll();
        }
        initVoteContract()
    }, [votecontract,allAccounts,apiState,erc20contract,orgcontract]);

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

        return (
            <div>
                <Loading showLoading={loading} setLoading={()=>{setLoading(false)}} tips={tips}/>


                <NewVote handleClose={handleClose} showTips={newshow} refresh={setAll}/>

                <div className="container">
                    <FirstLine>
                        <Left  history={props.history} id={props.match.params.id} owner={props.match.params.owner}/>
                        <BtnRht>
                            {
                                isModerator &&  <Button type="primary" onClick={()=>handleClicktonewVote()}>New voting</Button>
                            }

                        </BtnRht>
                    </FirstLine>
                    <Tablesec>
                        <div className="titleTop">Pendinng Voting List</div>
                        <VotePending
                            id={id}
                            list={pendinglist}
                            history={props.history}
                            refresh={setAll}
                        />
                    </Tablesec>
                    <Tablesec>
                        <div className="titleTop">Active Votinng List</div>
                        <VoteActive
                            id={id}
                            list={activelist}
                            history={props.history}
                        />
                    </Tablesec>
                    <Tablesec>
                        <div className="titleTop">History</div>
                        <VotePagination
                            id={id}
                            list={historylist}
                            history={props.history}  />
                    </Tablesec>
                </div>

            </div>
        )

}

