import React, { Component } from 'react';
import {Button, FormControl, InputGroup} from "react-bootstrap";
import {Link} from "react-router-dom";

class FirstStep extends Component {
    constructor(props) {
        super(props);
    }
    toSecondStep =() => {
        this.props.handlerSet(2)
    }
    render() {
        return <ul>
            <li><InputGroup className="mb-3">
                <FormControl
                    placeholder="please enter DAO's name"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                />
            </InputGroup></li>
            <li><InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon3">
                        https://
                    </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl id="basic-url" aria-describedby="basic-addon3" placeholder="Optional.Please fill your DAO's website."/>
            </InputGroup></li>
            <li>
                <InputGroup>

                    <FormControl as="textarea" aria-label="With textarea" placeholder="Please describe your DAO to let people know it better.Less than 1024 charactars." />
                </InputGroup>
            </li>
            <li className='brdr'>
                <Link to='/'><Button variant="outline-primary" className='leftBtn'>Maybe
                    Later</Button></Link>
                <Button variant="primary" onClick={this.toSecondStep}>Next</Button>
            </li>
        </ul>;
    }

}
export default FirstStep;
