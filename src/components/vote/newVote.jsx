import React, { useEffect, useState} from 'react';
import {Button, FormControl, FormLabel, InputGroup, Modal} from 'react-bootstrap';

import {useSubstrate} from '../../api/contracts';
import api from "../../api";

import Loading from "../loading/Loading";
import newVote from '../../images/newvoting.png';
import NewVoteTop from './newVoteTop';
import remove from "../../images/shutdown.png";
import add from "../../images/Add.png";
import {useTranslation} from "react-i18next";

export default function NewVote(props) {


    const {state} = useSubstrate();
    const {votecontract} = state;

    const [loading,setLoading]= useState(false);
    const [tips,setTips]= useState('');

    const [date, setdate] = useState('');
    const [title, settitle] = useState('');
    const [desc, setdesc] = useState('');
    const [id, setId] = useState(null);
    const [supportInput, setsupportInput] = useState('');
    const [min, setmin] = useState('');
    const [type, settype] = useState(1);

    const [optionlist, setoptionlist] = useState( ['','','']);

    let { t } = useTranslation();


    const handleClicktoVote = async () => {
        setLoading(true);
        setTips(t('CreateNewVote'));
        let dataobj = {
            title,
            desc,
            vote_time:date,
            support_require_num:supportInput,
            min_require_num:min,
            choices:optionlist.join('|')
        }
        await api.vote.newVote(votecontract,dataobj,(result)=> {
            setLoading(false);
            if(result){
                // props.history.push(`/vote/${id}`)
                props.handleClose()
                props.refresh()
            }
        });
    }

    const removeOption =(selectItem, index) => {
        let arr = optionlist;
        arr.splice(index, 1);
        setoptionlist([...arr])

    }

    const addOption = () => {
        let newArray = [...optionlist];
        newArray.push('');
        setoptionlist(newArray)
    }
    const setAddress = (e, index) => {

        let arr = optionlist;

        arr[index] = e.target.value;
        setoptionlist([...arr])
    }
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        let str = `set${name}`
        eval(str)(value)
    }
    const nextStep = (type)=>{
        settype(type)
    }
    let {handleClose, showTips} = props;
    return (
        <div>
            <Loading showLoading={loading} tips={tips}/>
            <Modal  show={showTips} onHide={handleClose} className='newVoteBrdr'>
                <Modal.Header closeButton>
                    <Modal.Title><img src={newVote} alt=""/><span>{t('Newvoting')}</span></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div><NewVoteTop  type={type}/></div>
                    <section>
                        {
                            type === 1 && <div>
                                <ul>
                                    <li>
                                        <div>
                                            <InputGroup className="mb-3">
                                                <FormLabel>{t('Votingtime')}</FormLabel>
                                                <div className='inputBrdr'>
                                                    <FormControl
                                                        placeholder={t('Votingdurate')}
                                                        name='date'
                                                        value={date}
                                                        autoComplete="off"
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </InputGroup>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <InputGroup className="mb-3">
                                                <FormLabel>{t('Title')}</FormLabel>
                                                <div className='inputBrdr'>
                                                    <FormControl
                                                        placeholder={t('fillTitle')}
                                                        name='title'
                                                        value={title}
                                                        autoComplete="off"
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </InputGroup>
                                        </div>
                                    </li>

                                    <li className='NextBrdr'>
                                        <Button variant="primary" onClick={()=>nextStep(2)}>{t('Next')}</Button>
                                    </li>
                                </ul>
                            </div>
                        }

                        {
                            type === 2 &&<div>
                                <ul>
                                    <li>
                                        <div>
                                            <InputGroup className="mb-3">
                                                <FormLabel>{t('MinimumSupport')}</FormLabel>
                                                <div className='inputBrdr'>
                                                    <FormControl
                                                        placeholder={t('FillMinimumSupport')}
                                                        name='supportInput'
                                                        value={supportInput}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </InputGroup>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <InputGroup className="mb-3">
                                                <FormLabel>{t('MinimumVoter')}</FormLabel>
                                                <div className='inputBrdr'>
                                                    <FormControl
                                                        placeholder={t('FillMinimumVoter')}
                                                        name='min'
                                                        value={min}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </InputGroup>
                                        </div>
                                    </li>

                                    <li className='NextBrdr button2'>
                                        <Button variant="primary" onClick={()=>nextStep(1)}>{t('Back')}</Button>
                                        <Button variant="primary" onClick={()=>nextStep(3)}>{t('Next')}</Button>
                                    </li>
                                </ul>
                            </div>
                        }
                        {
                            type === 3 && <div>
                                <ul>

                                    <li>
                                        <div>
                                            <InputGroup>
                                                <FormLabel>{t('Description')}</FormLabel>
                                                <div className='inputBrdr'>
                                                    <FormControl as="textarea"
                                                                 placeholder={t('FillDescription')}
                                                                 name='desc'
                                                                 value={desc}
                                                                 onChange={handleInputChange}
                                                    />
                                                </div>
                                            </InputGroup>
                                        </div>
                                    </li>
                                    <li className='NextBrdr button2'>
                                        <Button variant="primary" onClick={()=>nextStep(2)}>{t('Back')}</Button>
                                        <Button variant="primary" onClick={()=>nextStep(4)}>{t('Next')}</Button>
                                    </li>
                                </ul>
                            </div>
                        }

                        {
                            type === 4 &&
                            <div>
                                <ul>

                                    <li>
                                        {optionlist.map((i, index) => (

                                            <div key={index}>
                                                <div className="row">
                                                    <div className="col-12 flexBrdr">
                                                        <InputGroup className="mb-3">
                                                            <div className='inputBrdr'>
                                                            <FormControl
                                                                placeholder={t('FillOption')}
                                                                value={optionlist[index]}
                                                                onChange={(event) => setAddress(event, index)}
                                                            />
                                                            </div>
                                                        </InputGroup>

                                                        {
                                                            !!index && index !== 1 &&   <img src={remove}  className="removerht"
                                                                                         onClick={removeOption.bind(this, i, index)}/>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                        }

                                        <div className='NextBrdr NextBrdrAdd'>
                                            <Button variant="light" onClick={addOption}><img src={add} className="addRht"/> {t('AddOption')}</Button>
                                        </div>

                                    </li>

                                    <li className='NextBrdr button2'>
                                        <Button variant="primary" onClick={()=>nextStep(3)}>{t('Back')}</Button>
                                        <Button variant="primary" onClick={handleClicktoVote}>{t('Create')}</Button>
                                    </li>
                                </ul>
                            </div>
                        }
                    </section>
                </Modal.Body>
            </Modal>


        </div>
    )

}


