import React, { Component } from 'react';
import {Button, Form} from "react-bootstrap";
import {Link} from "react-router-dom";

class SecondStep extends Component {
    toThirdStep =() => {
        this.props.handlerSet(3)
    }
    toFirstStep =() => {
        this.props.handlerSet(1)
    }
    render() {
        return <ul>
            <li> <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Please choose one template to create your DAO</Form.Label>
                <Form.Control as="select">
                    <option>Non-Profit Organization Template</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </Form.Control>
            </Form.Group></li>

            <li>
                <div className="templateBrdr">
                    <div>Org</div>
                    <div>Voting</div>
                    <div>Valut</div>
                    <div>Finance</div>
                </div>
            </li>
            <li className='brdr'>
                <Button variant="outline-primary" className='leftBtn' onClick={this.toFirstStep}>Let me think~</Button>
               <Button variant="primary" onClick={this.toThirdStep}>Go Next</Button>
            </li>
        </ul>;
    }
}
export default SecondStep;
