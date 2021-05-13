import React, {Component} from 'react';
import ModalTips from "./modalTips";
import {Button, Form, FormControl, Table} from "react-bootstrap";

class ManageItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            chooseAll: false,
            showModal: false,
            showAdd: false,
            showAddMember: false,
            form:{
                name:'',
                address:'',
            }
        };
    }
   handleInputChange = (e) => {
        const {name, value} = e.target;
        // let str = `set${name}`
        // eval(str)(value)

       const {form} = this.state;
       form[name] = value;
       this.setState({form})
    }
    render() {
       const {list, type, handleClicktoview, showModal, handleClose} = this.props;
        const{form} = this.state;
        return (<div>
            <ModalTips handleClose={handleClose} showTips={showModal}/>

            <Table hover>
                <tbody>

                {
                    list.map((item,index) => (
                            <tr key={`${type}_${index}_${item[0]}`}>
                                <td>{item[1]}</td>
                                <td>{item[0]}</td>
                                <td>
                                    <span className='deleteRemove' onClick={()=>handleClicktoview(item,type)} />
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
