import React, { Component } from 'react';
import {Button, Form, FormControl, InputGroup} from "react-bootstrap";

class ThirdStep extends Component {
    constructor(props) {
        super(props);
        this.state={
            tokenlist:[
            {
                address:'',
                token:''
            }
            ]
        };
    }

    toForthStep =() => {
        this.props.handlerSet(4)
    }

    toSecondStep =() => {
        this.props.handlerSet(2)
    }

    addtoken =()=>{
        let { tokenlist} = this.state;
        let newArray = [...tokenlist];
        newArray.push({
            address:'',
            token:''

        });
        this.setState({tokenlist: newArray});
    }
    setAddress =(e,index)=>{
        let { tokenlist} = this.state;
        tokenlist[index].address = e.target.value;
        this.setState({tokenlist})
    }

    removeToken (selectItem,index){

        let { tokenlist} = this.state;

       tokenlist.splice(index,1);

        this.setState({tokenlist});
    }
    render() {
        let {tokenlist} = this.state;
        return <ul>
            <li>
                <div>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="DAO Admin" />
                    </Form.Group>
                </div>
                <div>
                    <InputGroup>

                        <FormControl as="textarea" aria-label="With textarea" placeholder="Fill the address, split with ;" />
                    </InputGroup>
                </div>
            </li>

            <li>
                <div>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Token" />
                    </Form.Group>
                </div>
                <div>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Fill the name"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                </div>
                <div>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Fill the symbol"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                </div>
                <div>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Fill the total supply"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                </div>
                { tokenlist.map((i,index)=>(

                    <div key={index}>
                        <div className="row">
                            <div className="col-7">
                                <InputGroup className="mb-3">
                                    <FormControl
                                        placeholder="Fill the address"
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                        value={tokenlist[index].address}
                                        onChange={(event)=> this.setAddress(event,index)}
                                    />
                                </InputGroup>
                            </div>
                            <div className="col-4">
                                <InputGroup className="mb-3">
                                    <FormControl
                                        placeholder="Fill the token"
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                    />
                                </InputGroup>
                            </div>
                            <div className="col-1">
                                <i className="fa fa-close remove" onClick={this.removeToken.bind(this,i,index)} />

                            </div>
                        </div>
                    </div>
                ))
                }

                <div>
                    <Button variant="light" onClick={this.addtoken}><i className="fa fa-plus"></i> Add Token</Button>
                </div>

            </li>

            <li className='brdr'>
                <Button variant="outline-primary" className='leftBtn' onClick={this.toSecondStep}>Let me think~</Button>
                <Button variant="primary" onClick={this.toForthStep}>Create it anyway !</Button>
            </li>
        </ul>;
    }
}
export default ThirdStep;
