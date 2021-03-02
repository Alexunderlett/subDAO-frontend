import React, {Component} from 'react';
import PageBackground from "../pagebackground";
import t3 from "../../images/t-4.png";
import {Button} from "react-bootstrap";
import ManageItem from "./manageItem";

class OrgManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:null,
            moderators: false,
            members: false,
            showModalmoderators: false,
            showModalmembers: false,
            showAddmoderators:false,
            showAddmembers:false,
            showAddMember:false,
            memberlist: [
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
            ],
            checklist: [
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
            ]
        };
    }

    componentDidMount() {
        this.setState({
            id:this.props.match.params.id
        })
    }

    handleClicktoview = (id) =>{
        // let {voteid} = this.state;
        // this.props.history.push(`/voteView/${id}/${voteid}`)
        console.log("id",id)
    }

    isAllChecked = (e) => {
        let bool = e.target.checked;
        const name = e.target.id;
        const listname = e.target.dataset.list;
        let checklist = this.state[listname];

        if (bool) {
            this.setState({
                [name]: true
            });
            checklist.map((item) => {
                item.checked = true;
            })
        } else {
            this.setState({
                [name]: false
            });
            checklist.map((item) => {
                item.checked = false;
            })
        }
        this.setState({[listname]:checklist});
    }

    isChecked = (e, obj) =>{
        let currentbool = e.target.checked;
        const name = e.target.dataset.type;
        const listname = e.target.dataset.list;
        this.setState({
            [name]: !(currentbool !=="false")
        });

        let checklist = this.state[listname];
        checklist.map(item => {
            if (item.id === obj.id) {
                item.checked = currentbool
            }
        });
        this.setState({[listname]:checklist});
    }

    delConfirm = (name) => {
        this.setState({ [name]: true})
    }
    handleClose = (name) => {
        this.setState({ [name]: false})
    }
    addModerators = (name) => {
        this.setState(prevState => ({
            [name]: !prevState[name]
        }))
    }
    handleClicktoOrg = () => {
        let {id} = this.state;
        this.props.history.push(`/org/${id}`)
    }

    render() {
        let {checklist, moderators, showModalmoderators, showModalmembers,showAddmembers, showAddmoderators,members,memberlist} = this.state;

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
                                <Button variant="outline-primary" onClick={this.handleClicktoOrg}>Back</Button>
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
                                        isChecked={this.isChecked}
                                        listname={'checklist'}
                                        isAllChecked={this.isAllChecked}
                                        handleClicktoview={this.handleClicktoview}
                                        showModal={showModalmoderators}
                                        showAdd={showAddmoderators}
                                        handleClose={this.handleClose.bind(this,'showModalmoderators')}
                                        addModerators={this.addModerators.bind(this,'showAddmoderators')}
                                        delConfirm={this.delConfirm.bind(this,'showModalmoderators')}
                                    />
                                </li>
                                <li>
                                    <h6>Members</h6>
                                    <ManageItem
                                        list={memberlist}
                                        listname={'memberlist'}
                                        chooseAll={members}
                                        type='members'
                                        isChecked={this.isChecked}
                                        isAllChecked={this.isAllChecked}
                                        handleClicktoview={this.handleClicktoview}
                                        showModal={showModalmembers}
                                        showAdd={showAddmembers}
                                        handleClose={this.handleClose.bind(this,'showModalmembers')}
                                        addModerators={this.addModerators.bind(this,'showAddmembers')}
                                        delConfirm={this.delConfirm.bind(this,'showModalmembers')}
                                    />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

        </div>;
    }
}

export default OrgManage;
