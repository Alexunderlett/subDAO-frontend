import React, { useEffect, useState } from 'react';
import { Button, Modal, Radio,Input } from 'antd';
import { useSubstrate } from "../../api/contracts";
import api from "../../api/index";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import CloseImg from '../../img/closeImg.png';

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
        font-size: 1.8rem;
        font-family: Roboto-Light;
        font-weight: 300;
        color: #10164B;
        line-height: 1.9rem;
        }
        .ant-radio-group{
        width: 100%;
        }
        .radioBrdr{
             width: 100%;
            padding: 2.1rem 1.5rem;
            border-radius: 1.2rem;
            border: 0.1rem solid #E8E8EA;
            margin-bottom: 1.5rem;
         
                span{
                font-size: 2.1rem;
                font-family: Roboto-Light;
                font-weight: 300;
                color: #010643;
                }
        }
        .radioActive{
            background: #F9F9FC;
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
    border-radius: 2.4rem;
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
    const [active, setActive] = useState(null);

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
        props.handleClose()
        await api.vote.VoteChoice(votecontract, voteid, selected, (data) => {
            setafterchoice(data);
            dispatch({ type: 'LOADINGTYPE', payload: null });
        }).catch((error) => {
            dispatch({ type: 'LOADINGTYPE', payload: null });
            dispatch({ type: 'MSGTYPE', payload: { msg: `Vote: ${error.message}`, closable: true } });

        });

    }

    // const handleActive = (e) => {
    //     let index = e.currentTarget.id.split("_")[1];
    //     setActive(index)
    //     setselected(index);
    // }


    const handleRadio = (e) => {
        setselected(e.target.value);
        setActive(e.target.value)
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
                                <Titles>Vote Description</Titles>
                                <Desc>{desc}</Desc>
                            </li>
                            <li className='voteSelect'>
                                <Titles>Please select</Titles>
                                <div>



                                    <Radio.Group onChange={handleRadio} value={selected} buttonStyle="solid">
                                        {optionlist.map((i, index) => (

                                                <div className={parseInt(active) === index ? 'radioActive radioBrdr' : 'radioBrdr'} id={`active_${index}`} key={index}>
                                                <Radio value={index} disabled={disabledVote}>{i.split(":")[0]} </Radio>
                                            </div>

                                        ))
                                        }
                                    </Radio.Group>
                                </div>


                            </li>
                            <NextBrdr>
                                <Button type="primary" onClick={()=>handleClicktoOverview()}
                                        disabled={disabledVote}>{t('Decide')}</Button>
                            </NextBrdr>
                        </ul>
                    }

                </SectionBrdr>
            </Modal>
        </div>
    )

}

