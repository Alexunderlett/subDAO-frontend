import React, {Component, useEffect, useState} from 'react';
import PageBackground from "../pagebackground";
import t3 from "../../images/t-4.png";
import {Button} from "react-bootstrap";
import ManageItem from "./manageItem";

export default function OrgManage(props){


    const [id, setId] = useState(null);
    const [moderators, setModerators] = useState(false);
    const [members, setMembers] = useState(false);
    const [showModalmoderators, setShowModalmoderators] = useState(false);
    const [showModalmembers, setShowModalmembers] = useState(false);
    const [showAddmoderators, setShowAddmoderators] = useState(false);
    const [showAddmembers, setShowAddmembers] = useState(false);
    const [showAddMember, setShowAddmember] = useState(false);
    const [memberlist, setMemberlist] = useState([
        {
            name: 'ETH',
            id: '1',
            url: 'fdajogaogogndso',
            checked: false
        },
        {
            name: 'pETH2',
            id: '2',
            url: 'fdajogaogogndso',
            checked: false
        }
    ]);
    const [checklist, setChecklist] = useState([
        {
            name: 'pETH1',
            id: '1',
            url: 'fdajogaogogndso',
            checked: false
        },
        {
            name: 'pETH2',
            id: '2',
            url: 'fdajogaogogndso',
            checked: false
        },
        {
            name: 'pETH3',
            id: '3',
            url: 'fdajogaogogndso',
            checked: false
        },
        {
            name: 'pETH4',
            id: '4',
            url: 'fdajogaogogndso',
            checked: false
        },
    ]);

    useEffect(() => {
        setId(props.match.params.id)

    }, []);


    const handleClicktoview = (id) =>{
        // let {voteid} = this.state;
        // this.props.history.push(`/voteView/${id}/${voteid}`)
        console.log("id",id)
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
            listobj.map((item) => {
                item.checked = !values;
            })

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

        listobj.map(item => {
            if (item.id === obj.id) {
                item.checked = currentbool
            }
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
   
    const addModerators = (name) => {
        if(name==="showAddmoderators"){
            setShowAddmoderators(!showAddmoderators)
        }else if(name==="showAddmembers"){
            setShowAddmembers(!showAddmembers)
        }

    }
    const handleClicktoOrg = () => {
       props.history.push(`/org/${id}`)
    }


        return <div>
            <section>
                <PageBackground/>
                <div className="container">
                    <div className="bgwhite row">
                        <div className='col-lg-4 bg'>
                            <div>
                                <img src={t3} alt=""/>
                            </div>
                            <div className='brdr'>
                                <Button variant="outline-primary" onClick={handleClicktoOrg}>Back</Button>
                            </div>
                        </div>
                        <div className='col-lg-8'>
                            <ul className="manage">
                                <li>
                                    <h6>Moderators</h6>
                                    <ManageItem
                                        list={checklist}
                                        chooseAll={moderators}
                                        type='moderators'
                                        isChecked={isChecked}
                                        listname={'checklist'}
                                        isAllChecked={isAllChecked}
                                        handleClicktoview={handleClicktoview}
                                        showModal={showModalmoderators}
                                        showAdd={showAddmoderators}
                                        handleClose={()=>setShowModalmoderators(false)}
                                        addModerators={()=>addModerators('showAddmoderators')}
                                        delConfirm={()=>delConfirm('showModalmoderators')}
                                    />
                                </li>
                                <li>
                                    <h6>Members</h6>
                                    <ManageItem
                                        list={memberlist}
                                        listname={'memberlist'}
                                        chooseAll={members}
                                        type='members'
                                        isChecked={isChecked}
                                        isAllChecked={isAllChecked}
                                        handleClicktoview={handleClicktoview}
                                        showModal={showModalmembers}
                                        showAdd={showAddmembers}
                                        handleClose={()=>setShowModalmembers(false)}
                                        addModerators={()=>addModerators('showAddmembers')}
                                        delConfirm={()=>delConfirm('showModalmembers')}
                                    />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

        </div>;

}
