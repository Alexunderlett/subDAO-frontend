import React, {useEffect, useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import ManageItem from "./manageItem";
import api from "../../api";
import {useSubstrate} from "../../api/contracts";
import Loading from "../loading/Loading";
import Left from "../left";
import Back from "../../images/prev.png";
import close from "../../images/shutdownW.png"
import {useTranslation} from "react-i18next";
import auth from "../../images/Vector.png";

export default function OrgManage(props){

    const {state, dispatch} = useSubstrate();
    const {orgcontract,allAccounts,apiState} = state;

    const [loading,setLoading]= useState(false);
    const [tips,setTips]= useState('');

    const [id, setId] = useState(null);
    const [moderators, setModerators] = useState(false);
    const [members, setMembers] = useState(false);
    const [showModalmoderators, setShowModalmoderators] = useState(false);
    const [showModalmembers, setShowModalmembers] = useState(false);
    const [addModerator, setaddModerator] = useState(false);
    const [addMember, setaddMember] = useState(false);
    const [logo, setLogo] = useState('');
    const [memberlist, setMemberlist] = useState([]);
    const [checklist, setChecklist] = useState([]);
    const [isOwner, setisOwner] = useState(false);
    const [isModerator, setisModerator] = useState(false);

    const [errorShow,seterrorShow]= useState(false);
    const [errorTips,seterrorTips]= useState('');

    let { t } = useTranslation();


    useEffect(() => {
        setId(props.match.params.id);
        setisModerator(parseInt(props.match.params.isModerator));
        setisOwner(parseInt(props.match.params.isOwner));
        let logo = sessionStorage.getItem('logo');
        setLogo(logo);
    }, []);
    const setAllList = async () => {
        setLoading(true);
        setTips(t('InitializeORG'));
        await api.org.getDaoModeratorList(orgcontract).then(data => {
            if (!data) return;
            setChecklist(data)
        });
        await api.org.getDaoMembersList(orgcontract).then(data => {
            if (!data) return;
            setMemberlist(data)
        });
        setLoading(false);
    };
    useEffect( () => {


        setAllList();
    }, [orgcontract]);

    useEffect(async () => {
        const initVoteContract = async () =>{
            let org = JSON.parse(sessionStorage.getItem('contractlist'));
            if(orgcontract == null && org!= null){
                await api.org.InitOrg(state, dispatch, org.org_addr,(data) => {
                    console.log('orgcontract====',data);
                });
            }
            setAllList();
        }
        initVoteContract()
    }, [orgcontract,allAccounts,apiState]);

    const handleClicktoview = async (item,type) =>{
        let obj={
            name:item[1],
            address:item[0]
        }
        if(type==='moderators'){
            setLoading(true);
            setTips(t('RemoveModerator'));
            await api.org.removeDaoModerator(orgcontract,obj, (result)=> {
                setaddModerator(result)
                setLoading(false);
                setAllList();
            }).then(data => {
                if (!data) return;
            }).catch((error) => {
                seterrorShow(true)
                seterrorTips(`Remove Moderator: ${error.message}`)
                setLoading(false);

            });
        }else if(type==='members'){
            setLoading(true);
            setTips(t('RemoveMember'));
            await api.org.removeDaoMember(orgcontract,obj, (result)=> {
                setaddMember(result)
                setLoading(false);
                setAllList();
            }).then(data => {
                if (!data) return;

            }).catch((error) => {
                seterrorShow(true)
                seterrorTips(`Remove Member: ${error.message}`)
                setLoading(false);

            });
        }
    }

    const isAllChecked = (e) => {
        const name = e.target.id;
        const listname = e.target.dataset.list;

        let values= eval(name);
        let listobj =  eval(listname);

            if (name === 'moderators') {
                setModerators(!values)
            } else if (name === 'members') {
                setMembers(!values)
            }
            listobj.map((item) => item.checked = !values)

        if (listname === 'checklist') {
            setChecklist([...listobj])
        } else if (name === 'memberlist') {
            setMemberlist([...listobj])
        }
    }

    const isChecked = (e, obj) =>{
        let currentbool = e.target.checked;
        const name = e.target.dataset.type;
        const listname = e.target.dataset.list;

        if(!currentbool){
            if (name === 'moderators') {
                setModerators(false)
            } else if (name === 'members') {
                setMembers(false)
            }
        }


        let listobj =  eval(listname);

        // listobj.map(item => {
        //     if (item.id === obj.id) {
        //         item.checked = currentbool;
        //     }
        // });
        listobj.map(item => {
            if (item.id === obj.id) {
                item.checked = currentbool;
            }
            return item;
        });

        if (listname === 'checklist') {
            setChecklist([...listobj])
        } else if (name === 'memberlist') {
            setMemberlist([...listobj])
        }
    }

    const delConfirm = (name) => {
        if(name==="showModalmoderators"){
            setShowModalmoderators(true)
        }else if(name==="showModalmembers"){
            setShowModalmembers(true)
        }
    }
    const handleClicktoOrg= () => {
        props.history.push(`/org/${id}`)
    }
    const handleClicktoAbout = () => {
        props.history.push(`/about/${id}`)
    }

        return <div>
            <Loading showLoading={loading} setLoading={()=>{setLoading(false)}} tips={tips}/>
            <Modal
                show={errorShow}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={() => seterrorShow(false)}
                className='newVoteBrdr homebtm'
            >
                <Modal.Header closeButton />
                <Modal.Body>
                    <h4>{errorTips}</h4>
                </Modal.Body>
            </Modal>
            <section>
                    <div className="row">
                        <div className='col-lg-3'>
                            <Left />
                        </div>
                        <div className='col-lg-9 mr50'>
                            <div className='voteTop'>
                                <div className='voteLft' onClick={handleClicktoAbout}>
                                    <img src={Back} alt=""/> Back
                                </div>
                                <button className='btnR' onClick={handleClicktoOrg}><img src={close} alt=""/>{t('Exit')}</button>

                            </div>
                            <ul className="manage">
                                <li>
                                    <h6>{t('Moderators')}</h6>
                                    <ManageItem
                                        list={checklist}
                                        chooseAll={moderators}
                                        type='moderators'
                                        isChecked={isChecked}
                                        listname={'checklist'}
                                        isOwner={isOwner}
                                        isModerator={isModerator}
                                        isAllChecked={isAllChecked}
                                        handleClicktoview={handleClicktoview}
                                        showModal={showModalmoderators}
                                        handleClose={()=>setShowModalmoderators(false)}
                                        delConfirm={()=>delConfirm('showModalmoderators')}
                                    />
                                </li>
                                <li>
                                    <h6>{t('Members')}</h6>
                                    <ManageItem
                                        list={memberlist}
                                        listname={'memberlist'}
                                        isOwner={isOwner}
                                        isModerator={isModerator}
                                        chooseAll={members}
                                        type='members'
                                        isChecked={isChecked}
                                        isAllChecked={isAllChecked}
                                        handleClicktoview={handleClicktoview}
                                        showModal={showModalmembers}
                                        handleClose={()=>setShowModalmembers(false)}
                                        delConfirm={()=>delConfirm('showModalmembers')}
                                    />
                                </li>
                            </ul>
                        </div>
                    </div>

            </section>

        </div>;

}
