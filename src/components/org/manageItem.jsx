import React, {Component} from 'react';
import ModalTips from "./modalTips";
import {Button, Form, Table} from "react-bootstrap";

class ManageItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            chooseAll: false,
            showModal: false,
            showAdd: false,
            showAddMember: false,

        };
    }

    render() {
        const {list, listname, chooseAll, isChecked, isAllChecked, type, handleClicktoview, showModal, handleClose, showAdd, addModerators,delConfirm} = this.props;
        return (<div>

            <ModalTips handleClose={handleClose} showTips={showModal}/>
            <div className='operationBar'>
                <span onClick={delConfirm}>
                  <i className='fa fa-trash'/> remove
                </span>
                <span onClick={addModerators}>
                    <i className='fa fa-plus-circle'/> add
                </span>
            </div>
            {
                showAdd && <div className='addBtn'>
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
                    <th><Form.Check type='checkbox'  value={chooseAll}
                                    checked={chooseAll}
                                    id={type}
                                    data-list={listname}
                                    onChange={e => isAllChecked(e, type)}/></th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Operation</th>
                </tr>
                {
                    list.map((item) => (
                            <tr key={`moderators_${item.id}`}>
                                <td>
                                    <Form.Check type='checkbox' value={item.checked}
                                                checked={item.checked}
                                                data-type={type}
                                                data-list={listname}
                                                onChange={e => isChecked(e, item)}/>
                                </td>
                                <td>{item.name}</td>
                                <td>{item.url}</td>
                                <td>
                                    <span className='hand' onClick={handleClicktoview.bind(this, item.id)}><i
                                        className="fa fa-trash"/> remove</span>
                                </td>
                            </tr>
                        )
                    )
                }
                </tbody>
            </Table>
        </div>);
    }
}

export default ManageItem;
