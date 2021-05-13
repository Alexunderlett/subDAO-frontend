import React, {useEffect, useState} from 'react';
import {Button, FormControl, FormLabel, Modal} from "react-bootstrap";
import api from "../../api";
import {useSubstrate} from "../../api/contracts";
import Loading from "../loading/Loading";
import addnew from '../../images/newvoting.png';
import {useTranslation} from "react-i18next";

export default function AddNew(props){

    const {state} = useSubstrate();
    const {orgcontract} = state;

    const [loading,setLoading]= useState(false);
    const [tips,setTips]= useState('');

    const [name,setname]= useState('');
    const [address,setaddress]= useState('');


    const [addModerator, setaddModerator] = useState(false);
    const [addMember, setaddMember] = useState(false);

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
        });
    }
    const submitMembers = async (obj) =>{
        setLoading(true);
        setTips(t('AddMember'));
        await api.org.addDaoMember(orgcontract,obj,function (result) {
            setaddMember(result)
            props.handleClose()
            props.refresh()
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

    let {handleClose, showTips,typeName} = props;
    return <div>
        <Loading showLoading={loading} tips={tips}/>

        <Modal  show={showTips} onHide={handleClose} className='newVoteBrdr'>
            <Modal.Header closeButton>
                <Modal.Title><img src={addnew} alt=""/><span >{typeName}</span></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <section>
                    <ul className='addnew'>
                        <li>
                            <FormLabel>Name</FormLabel>
                            <div className="inputBrdr">
                                <FormControl
                                    placeholder="Please fill the name."
                                    name='name'
                                    value={name}
                                    autoComplete="off"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </li>
                        <li>
                            <FormLabel>Address</FormLabel>
                            <div className="inputBrdr">
                                <FormControl
                                    placeholder="Please fill the address"
                                    name='address'
                                    value={address}
                                    autoComplete="off"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </li>
                        <li>
                            <div className='NextBrdr'>
                                <Button variant="primary"  onClick={()=>handleSubmit(typeName)}>
                                    Add
                                </Button>
                            </div>
                        </li>
                    </ul>





                </section>
            </Modal.Body>
        </Modal>


    </div>;

}
