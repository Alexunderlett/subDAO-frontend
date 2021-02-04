import React, {Component} from 'react';
import PageBackground from "../pagebackground";
import t3 from "../../images/t-4.png";
import {Button, Table, Form} from "react-bootstrap";
import ModalTips from "./modalTips";

class OrgManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:null,
            moderators: false,
            showModal: false,
            showAdd:false,
            showAddMember:false,
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

    handleClicktoview(voteid) {
        let {id} = this.state;
        this.props.history.push(`/voteView/${id}/${voteid}`)
    }

    isAllChecked(e, id) {
        let bool = e.target.checked;
        let {checklist} = this.state;
        if (bool) {
            this.setState({
                moderators: true
            });
            checklist.map((item) => {
                item.checked = true;
            })
        } else {
            this.setState({
                moderators: false
            });
            checklist.map((item) => {
                item.checked = false;
            })
        }
        this.setState({checklist});
    }

    isChecked(e, obj) {
        let currentbool = e.target.checked;
        if (!currentbool) {
            this.setState({
                moderators: false
            })
        }
        let {checklist} = this.state;
        checklist.map(item => {
            if (item.id === obj.id) {
                item.checked = currentbool
            }
        });
        this.setState({checklist})
    }

    delConfirm = () => {
        this.setState({showModal: true})
    }
    handleClose = () => {
        this.setState({showModal: false})
    }
    addModerators = () => {
        this.setState(prevState => ({
            showAdd: !prevState.showAdd
        }))
    }
    addMembers = () => {
        this.setState(prevState => ({
            showAddMember: !prevState.showAddMember
        }))
    }
    handleClicktoOrg = () => {
        let {id} = this.state;
        this.props.history.push(`/org/${id}`)
    }

    render() {
        let {checklist, moderators, showModal, showAdd, showAddMember} = this.state;

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
                                    <ModalTips handleClose={this.handleClose} showTips={showModal}/>
                                    <div className='operationBar'>
                                        <span onClick={this.delConfirm}>
                                          <i className='fa fa-trash'/> remove
                                        </span>
                                        <span onClick={this.addModerators}>
                                            <i className='fa fa-plus-circle'/> add
                                        </span>
                                    </div>
                                    {
                                        showAdd &&<div className='addBtn'>
                                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                                <Form.Control as="textarea" rows={3}
                                                              placeholder="Please fill moderators' address,split with;"/>
                                                <Button variant="primary" type="submit">
                                                    Add
                                                </Button>
                                            </Form.Group>
                                        </div>
                                    }

                                    <Table striped bordered hover>
                                        <tbody>
                                        <tr>
                                            <th><Form.Check type='checkbox' id='moderators' value={moderators}
                                                            checked={moderators}
                                                            onChange={e => this.isAllChecked(e, 'moderators')}/></th>
                                            <th>Name</th>
                                            <th>Address</th>
                                            <th>Operation</th>
                                        </tr>
                                        {
                                            checklist.map((item) => (
                                                    <tr key={`moderators_${item.id}`}>
                                                        <td>
                                                            <Form.Check type='checkbox' value={item.checked}
                                                                        checked={item.checked}
                                                                        onChange={e => this.isChecked(e, item)}/>
                                                        </td>
                                                        <td>{item.name}</td>
                                                        <td>{item.url}</td>
                                                        <td><span onClick={this.handleClicktoview.bind(this, item.id)}><i
                                                            className="fa fa-trash"/> remove</span></td>
                                                    </tr>
                                                )
                                            )
                                        }
                                        </tbody>
                                    </Table>
                                </li>
                                <li>
                                    <h6>Members</h6>
                                    <div className='operationBar'>
                                        <span onClick={this.delConfirm}>
                                          <i className='fa fa-trash'/> remove
                                        </span>
                                        <span onClick={this.addMembers}>
                                            <i className='fa fa-plus-circle'/> add
                                        </span>
                                    </div>
                                    {
                                        showAddMember &&<div className='addBtn'>
                                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                                <Form.Control as="textarea" rows={3}
                                                              placeholder="Please fill moderators' address,split with;"/>
                                                <Button variant="primary" type="submit">
                                                    Add
                                                </Button>
                                            </Form.Group>
                                        </div>
                                    }

                                    <Table striped bordered hover>
                                        <tbody>
                                        <tr>
                                            <th><Form.Check type='checkbox'/></th>
                                            <th>Name</th>
                                            <th>Address</th>
                                            <th>Operation</th>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Form.Check type='checkbox'/>
                                            </td>
                                            <td>pETH</td>
                                            <td>fdagfdg56ythdgfjuiyyryttefd</td>
                                            <td><span onClick={this.handleClicktoview.bind(this, 55)}><i
                                                className="fa fa-trash"/> remove</span></td>
                                        </tr>
                                        <tr>
                                            <td><Form.Check type='checkbox'/></td>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                            <td><span onClick={this.handleClicktoview.bind(this, 55)}><i
                                                className="fa fa-trash"/> remove</span></td>
                                        </tr>
                                        </tbody>
                                    </Table>
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
