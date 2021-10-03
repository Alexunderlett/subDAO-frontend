import React, { useEffect, useState } from 'react';
import { Button, Modal, Input } from 'antd';
import { useSubstrate } from "../../api/contracts";
import api from "../../api/index";
// import Loading from "../loading/Loading";
import newVote from "../../images/newvoting.png";
import { useTranslation } from "react-i18next";


export default function VoteView(props) {

    const { state } = useSubstrate();
    const { votecontract } = state;

    // const [loading, setLoading] = useState(false);
    const [tips, setTips] = useState('');

    const [optionlist, setoptionlist] = useState([]);
    const [id, setId] = useState(null);
    const [voteid, setvoteid] = useState(null);
    const [title, settitle] = useState('');
    const [desc, setdesc] = useState('');
    const [selected, setselected] = useState('');
    const [logo, setLogo] = useState('');
    const [afterchoice, setafterchoice] = useState(false);
    const [active, setActive] = useState(null);
    const [disabledVote, setdisabledVote] = useState(false);
    const [toaddress, settoaddress] = useState('');
    const [toValue, settovalule] = useState('');

    // const [errorShow, seterrorShow] = useState(false);
    const [errorTips, seterrorTips] = useState('');

    let { t } = useTranslation();

    useEffect(() => {
        let logo = sessionStorage.getItem('logo');
        setLogo(logo);
    }, []);
    useEffect(() => {
        if (afterchoice) {
            // props.history.push(`/voteOverview/${props.id}/${voteid}`);
            // setLoading(false);
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
        console.log(props.id, props.voteid)
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
            // setLoading(false);
        };
        setOnevote();
    }, [props.voteid, props.id]);

    const handleClicktoVote = () => {
        props.history.push(`/vote/${props.id}`)
    }
    const handleClicktoOverview = async () => {
        // setLoading(true);
        setTips(t('Voting'));

        await api.vote.VoteChoice(votecontract, voteid, selected, (data) => {
            setafterchoice(data)
        }).catch((error) => {
            // seterrorShow(true)
            // seterrorTips(`Vote: ${error.message}`)
            // setLoading(false);

        });

    }
    const handleRadio = (e) => {
        setselected(e.target.value)
    }
    const handleActive = (e) => {
        let index = e.currentTarget.id.split("_")[1];
        setActive(index)
    }
    let { handleClose, showTips } = props;
    return (
        <div>
            {/*<Loading showLoading={loading} setLoading={() => { setLoading(false) }} tips={tips} />*/}
            {/*<Modal*/}
            {/*    visible={errorShow}*/}
            {/*    onCancel={() => seterrorShow(false)}*/}
            {/*    footer={null}*/}
            {/*>*/}
            {/*    <div className="title">{errorTips}</div>*/}
            {/*</Modal>*/}
            <Modal visible={showTips} onCancel={handleClose} footer={null}>
                <div className="title"><img src={newVote} alt="" /><span> {t('Voting')}</span></div>
                <section>
                    <ul>
                        <li className='VotetitleTop'>{title}</li>
                        <li className='voteContent'>
                            <div className='desc'>{desc}</div>
                            <div>{t('ReceiverAddress')}: {toaddress}</div>
                            <div>{t('Amount')}: {toValue}</div>
                        </li>
                        <li className='voteSelect'>
                            {optionlist.map((i, index) => (

                                <div key={index}>
                                    <div className="row">
                                        <div className={parseInt(active) === index ? 'col-12 radioOption radioActive' : 'col-12 radioOption'} id={`active_${index}`} onClick={handleActive}>
                                            <div className="form-group">
                                                <div className="form-check"  >
                                                    <label htmlFor={`radio_${index}`}>{i.split(":")[0]}</label>
                                                    <Input name="radiobutton"
                                                        type="radio"
                                                        id={`radio_${index}`}
                                                        className="form-check-inputRadio"
                                                        value={index}
                                                        onClick={handleRadio}
                                                    />
                                                </div>
                                            </div>
                                            {/*<Form.Group>*/}
                                            {/*    <Form.Check*/}
                                            {/*        type="radio"*/}
                                            {/*        label={i.split(":")[0]}*/}
                                            {/*        id={`radio_${index}`}*/}
                                            {/*        value={index+1}*/}
                                            {/*        name='radiobutton' onChange={handleRadio}/>*/}
                                            {/*</Form.Group>*/}
                                        </div>

                                    </div>
                                </div>
                            ))
                            }


                        </li>
                        <li className='NextBrdr'>
                            {/*<Button className='leftBtn'*/}
                            {/*        onClick={handleClicktoVote}>Cancel</Button>*/}
                            <Button type="primary" onClick={handleClicktoOverview}
                                disabled={disabledVote}>{t('Decide')}</Button>
                        </li>
                    </ul>
                </section>
            </Modal>
        </div>
    )

}

