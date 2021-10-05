import React, { useEffect, useState } from 'react';
import { Button, Modal, Radio } from 'antd';
import { useSubstrate } from "../../api/contracts";
import api from "../../api/index";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import LoadingNew from "../loadingNEW";

const NextBrdr= styled.li`
margin-top: 1rem;
     button{
      width: 100%;
      &:disabled{
      opacity: 0.3;
      }
     }
`;

const SectionBrdr = styled.section`
    li{
        margin-bottom: 2rem;
        &>div{
        font-size: 1.6rem;
        font-family: Roboto-Regular;
        font-weight: 400;
        color: #10164B;
        line-height: 1.9rem;
        }
    }
`;
const Titles = styled.span`
  font-size: 1.2rem;
    font-family: Roboto-Light;
    font-weight: 300;
    color: #10164B;
    opacity: 0.6;
    padding-bottom: 1rem;
    display: inline-block;
    
`;

const Desc = styled.div`
    min-height: 13.8rem;
    background: #EFF0FA;
    border-radius: 2.4rem;
    padding: 2rem;
`;
const Li = styled.li`
  display: flex;
  word-break: break-all;
`;
const TransferLft = styled.div`
 width: 25rem;
`;
const Amount = styled.div`
   border-left: 0.4rem solid #FFD9CF;;
    font-size: 2rem;
    color: #FF672F;
    line-height: 2em;
    padding-left: 0.8rem;
    
`;
const Addr = styled.div`
  flex-grow: 1;
`

export default function VoteView(props) {

    const { state,dispatch } = useSubstrate();
    const { votecontract } = state;

    const [optionlist, setoptionlist] = useState([]);
    const [id, setId] = useState(null);
    const [voteid, setvoteid] = useState(null);
    const [title, settitle] = useState('');
    const [desc, setdesc] = useState('');
    const [selected, setselected] = useState('');
    const [afterchoice, setafterchoice] = useState(false);
    const [show, setShow] = useState(true);
    const [disabledVote, setdisabledVote] = useState(false);
    const [toaddress, settoaddress] = useState('');
    const [toValue, settovalule] = useState('');

    let { t } = useTranslation();

    useEffect(() => {
        if (afterchoice) {
            props.handleClose()
        }

    }, [afterchoice]);

    useEffect(() => {
        if (votecontract == null || voteid == null) return;
        const queryVoter = async () => {
            await api.vote.queryVoter(votecontract, voteid).then(data => {
                setdisabledVote(data)
            });
        }
        queryVoter();
    }, [voteid]);

    useEffect(() => {
        if (props.id == null) return;
        setvoteid(props.voteid);
        setId(props.id);

        const setOnevote = async () => {

            await api.vote.queryOneVote(votecontract, props.voteid).then(data => {
                if (!data) return;
                const {
                    vote_id, title, desc, choices, to_address, transfer_value
                } = data;
                settitle(title);
                setId(vote_id);
                setdesc(desc);
                settoaddress(to_address);
                settovalule(transfer_value);
                setoptionlist(choices.split('|'))
            });
            setShow(false);
        };
        setOnevote();
    }, [props.voteid, props.id]);

    const handleClicktoOverview = async () => {

        dispatch({ type: 'LOADINGTYPE', payload: t('Voting') });
        await api.vote.VoteChoice(votecontract, voteid, selected, (data) => {
            setafterchoice(data);
            dispatch({ type: 'LOADINGTYPE', payload: null });
        }).catch((error) => {
            dispatch({ type: 'LOADINGTYPE', payload: null });
            dispatch({ type: 'MSGTYPE', payload: { msg: `Vote: ${error.message}`, closable: true } });

        });

    }
    const handleRadio = (e) => {
        setselected(e.target.value);
        console.log("=====",e.target.value)
    }
    let { handleClose, showTips } = props;
    return (
        <div>

            <Modal visible={showTips} onCancel={handleClose} footer={null} maskClosable={false} centered={true}>
                <div className="title"><span> {t('Voting')}</span></div>
                <SectionBrdr>
                    {
                        show && <LoadingNew />
                    }
                    {
                        !show && <ul>
                            <li>
                                <Titles>Title</Titles>
                                <div>{title}</div>
                            </li>
                            <Li>
                                <TransferLft>
                                    <Titles>Transfer</Titles>
                                    <Amount>{toValue}</Amount>
                                </TransferLft>
                                <Addr>
                                    <Titles>Recipient Address</Titles>
                                    <div>{toaddress}</div>
                                </Addr>

                            </Li>
                            <li>
                                <Titles>Voting Description</Titles>
                                <Desc>{desc}</Desc>
                            </li>
                            <li className='voteSelect'>

                                <Radio.Group onChange={handleRadio} value={selected}>
                                    {optionlist.map((i, index) => (
                                        <div key={index}>
                                            <Radio value={index}>{i.split(":")[0]}</Radio>
                                        </div>
                                    ))
                                    }
                                </Radio.Group>

                            </li>
                            <NextBrdr>
                                <Button type="primary" onClick={handleClicktoOverview}
                                        disabled={disabledVote}>{t('Decide')}</Button>
                            </NextBrdr>
                        </ul>
                    }

                </SectionBrdr>
            </Modal>
        </div>
    )

}

