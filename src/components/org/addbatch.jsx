import React, {useEffect, useState} from 'react';
import {Button, FormControl, FormLabel, InputGroup, Modal, Tab} from "react-bootstrap";
import api from "../../api";
import {useSubstrate} from "../../api/contracts";
import Loading from "../loading/Loading";
import addnew from '../../images/newvoting.png';
import {useTranslation} from "react-i18next";
import remove from "../../images/shutdown.png";
import add from "../../images/Add.png";
import Back from "../../images/prev.png";

export default function AddBatch(props){

    const {state} = useSubstrate();
    const {orgcontract} = state;

    const [loading,setLoading]= useState(false);
    const [tips,setTips]= useState('');

    const [name,setname]= useState('');
    const [address,setaddress]= useState('');


    const [addModerator, setaddModerator] = useState(false);
    const [addMember, setaddMember] = useState(false);
    const [adminlist,setadminlist]= useState([
        {
            name: '',
            address: ''
        }
    ]);

    let { t } = useTranslation();

    useEffect(() => {
        if(addModerator){
            setLoading(false);
        }
    }, [addModerator]);
    useEffect(() => {
        if(addMember){
            setLoading(false);
        }
    }, [addMember]);


    const submitModerators = async (obj) =>{
        setLoading(true);
        setTips(t('AddModerator'));
        await api.org.addDaoModerator(orgcontract,obj,function (result) {
            setaddModerator(result)
            props.handleClose()
            props.refresh()
            setname('')
            setaddress('')
        });
    }
    const submitMembers = async (obj) =>{
        setLoading(true);
        setTips(t('AddMember'));
        await api.org.addDaoMember(orgcontract,obj,function (result) {
            setaddMember(result)
            props.handleClose()
            props.refresh()
            setname('')
            setaddress('')
        });
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        let str = `set${name}`
        eval(str)(value)
    }
    const handleSubmit = (type) => {
        const obj= {
            address,
            name
        };

        if(type==="Moderators"){
            submitModerators(obj)
        }else {
            submitMembers(obj)
        }
    }
    const setAdminInput = (e, index) => {
        let newArray = [...adminlist];
        const {name, value} = e.target;
        newArray[index][name] = value;
        setadminlist(newArray)
    }
    const removeAdmin = (selectItem, index) =>{
        let newArray = [...adminlist];
        newArray.splice(index, 1);
        setadminlist(newArray)
    }
    const addAdmin = () => {
        let newArray = [...adminlist];
        newArray.push({
            name: '',
            address: ''

        });
        setadminlist(newArray)
    }
    const handleBack = () => {
        props.handleBatchAdd()
    }

    let {handleClose, showTips,typeName} = props;
    return <div>
        <Loading showLoading={loading} tips={tips}/>

        <Modal  show={showTips} onHide={handleClose} className='batchBrdr'>
            <Modal.Header closeButton>
                <Modal.Title><img src={addnew} alt=""/><span >Members</span></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <section>
                    <div className='batchTop'>
                        <div className='voteLft' onClick={handleBack}>
                            <img src={Back} alt=""/> {t('Back')}
                        </div>
                        <div>
                            <div className='btnRTop' onClick={addAdmin}><img src={add}  alt=''/>{t('AddOption')}</div>
                        </div>
                    </div>
                    <ul className='batchlist'>
                        <li>
                            <div>
                                {adminlist.map((i, index) => (

                                    <div key={index} className='norow'>
                                        <div className="row">
                                            <div className="col-4">
                                                <InputGroup className="mb-3">
                                                    <div className='inputBrdr'>
                                                        <FormControl
                                                            placeholder={t('FilltheName')}
                                                            value={adminlist[index].name}
                                                            name='name'
                                                            autoComplete="off"
                                                            onChange={(event) => setAdminInput(event, index)}
                                                        />
                                                    </div>
                                                </InputGroup>
                                            </div>
                                            <div className="col-8 flexBrdr">
                                                <InputGroup className="mb-3">
                                                    <div className='inputBrdr'>
                                                        <FormControl
                                                            placeholder={t('FillAddress')}
                                                            value={adminlist[index].address}
                                                            name='address'
                                                            autoComplete="off"
                                                            onChange={(event) => setAdminInput(event, index)}
                                                        />
                                                    </div>
                                                </InputGroup>
                                                {
                                                    !!index &&
                                                    <img src={remove} onClick={()=>removeAdmin( i, index)} className="removerht" alt=''/>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                ))
                                }

                            </div>
                        </li>

                    </ul>
                    <div>
                        <div className='NextBrdr'>
                            <Button variant="primary"  onClick={()=>handleSubmit(typeName)}>
                                Add
                            </Button>
                        </div>
                    </div>
                </section>
            </Modal.Body>
        </Modal>


    </div>;

}
