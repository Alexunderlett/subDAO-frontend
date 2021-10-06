import React, { useEffect, useState } from 'react';
import VoteEcharts from "./voteEcharts";
import api from "../../api";
import { useSubstrate } from "../../api/contracts";
import Left from "../left";
import Back from "../../img/back.png";
import { useTranslation } from "react-i18next";
import styled from 'styled-components';
import PublicJS from "../../utils/publicJs";

const BackBrdr = styled.div`
    //width: 12rem;
    //height: 3rem;
    border-radius: 4px;
    border: 1px solid #B7B9C9;
    margin-top: 6rem;
     display: inline-block;
    font-size: 1.2rem;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #3F446E;
    padding: .7rem .6rem;
    cursor: pointer;
`;

const SectionLayout = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 3.2rem;
`;

const Li = styled.li`
  margin-top: 3.2rem;
`;

const Titles = styled.div`
    font-size: 1.2rem;
    font-family: Roboto-Light;
    font-weight: 300;
    margin-bottom: .9rem;
    opacity: 0.6;
`;

const TitleValue = styled.div`
    font-size:1.6rem;
    font-family: Roboto-Regular;
    font-weight: 400;
`;

const FlexRht = styled.div`
  flex-grow: 1;
`;

const CardBrdr = styled.div`
  display: flex;
`

const CardWhite = styled.div`
    width: 16rem;
    height: 9rem;
    background: #FFFFFF;
    box-shadow: 0 0 1rem 0 rgba(16, 22, 75, 0.05);
    border-radius: .9rem;
    margin-top: .5rem;
    text-align: center;
    box-sizing: border-box;
    padding: 1.7rem 0;
    font-size: 1.4rem;
    font-family: Roboto-Light;
    line-height: 2.6rem;
    margin-right: 2rem;
    opacity: .8;
    span{
        height: 2.4rem;
        font-size: 2rem;
        font-weight: 300;
        color: #10164B;
        line-height: 3rem;
        padding-bottom: 2rem;
        opacity: 1;
    }
`;

const Address = styled.div`
    font-size: 1.6rem;
    line-height: 2.4rem;
`;

const Desc = styled.div`
    width: 47.1rem;
    background: #EFF0FA;
    border-radius: 2.4rem;
    padding: 2rem;
    font-size: 1.6rem;
    line-height: 2.4rem;
`;

const AddBrdr = styled.div`
  display: flex;
  white-space: nowrap;
`;

const TokenBrdr = styled.div`
  margin-right: 2.5rem;
  span{
        font-size: 2rem;
        color: #FF672F;
        line-height: 2.4rem;
        padding-left: 0.8rem;
        display: inline-block;
        border-left: 0.4rem solid rgba(255, 217, 207, 1);
        border-radius: 0.2rem ;
  }
`


export default function VoteOverview(props) {
    const { state } = useSubstrate();
    const { votecontract } = state;
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
    const [need, setneed] = useState('');

    let { t } = useTranslation();

    const handleClicktoVote = () => {
        props.history.push(`/vote/${props.match.params.id}`)
    }
    useEffect(() => {
        const setOneVote = async () => {
            await api.vote.queryOneVote(votecontract, props.match.params.voteid).then(data => {
                if (!data) return;
                const {
                    vote_id, title, desc, support_require_num, min_require_num, choices, to_address, transfer_value, start_date, vote_time, executed, need_trigger
                } = data;

                setendtime(PublicJS.formatvoteDateTime(start_date, vote_time));

                setneed(need_trigger);

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
            <div className="container">
                <Left history={props.history} id={props.match.params.id} owner={props.match.params.owner} removeGroup={true} />
                <div>
                    <BackBrdr onClick={handleClicktoVote}><img src={Back} alt="" /> Back Voting</BackBrdr>
                </div>
                <SectionLayout>
                    <ul>
                        <Li>
                            <Titles>Title</Titles>
                            <TitleValue>{title}</TitleValue>
                        </Li>
                        <Li>
                            <Titles>Data Statistics</Titles>
                            <CardBrdr>
                                <CardWhite>
                                    <span>{support}</span>
                                    <div>Support Require</div>
                                </CardWhite>
                                <CardWhite>
                                    <span>{min}</span>
                                    <div>Min Require</div>
                                </CardWhite>
                            </CardBrdr>
                        </Li>
                        <Li>
                            <AddBrdr>
                                {
                                    need &&
                                    <TokenBrdr>
                                        <Titles>Transfer </Titles>
                                        <span>{toValue}</span>
                                    </TokenBrdr>
                                }

                                <div>
                                    <Titles>Recipient Address</Titles>
                                    <Address>
                                        {toaddress}
                                    </Address>
                                </div>
                            </AddBrdr>
                        </Li>
                        <Li>
                            <Titles>Voting Description</Titles>
                            <Desc>{desc}</Desc>
                        </Li>
                    </ul>
                    <FlexRht>
                        {
                            !!optionlist.length && <VoteEcharts optionlist={optionlist} />
                        }
                    </FlexRht>
                </SectionLayout>
            </div>

            {/*<ul>*/}

            {/*    <li>*/}
            {/*        <h6>Ends at</h6>*/}
            {/*        <div className='endtime'>{endtime}</div>*/}
            {/*    </li>*/}
            {/*    <li>*/}
            {/*        <h6>{t('VotingNumber')}</h6>*/}
            {/*        <div>{voteid}</div>*/}
            {/*    </li>*/}

            {/*    {*/}
            {/*        need &&*/}
            {/*        <div>*/}
            {/*            <li>*/}
            {/*                <h6>Transaction Status</h6>*/}
            {/*                <div className='address'>{executed?'Successful':'Not triggered'}</div>*/}
            {/*            </li>*/}

            {/*        </div>*/}
            {/*    }*/}
            {/*</ul>*/}
        </div>
    )
}
