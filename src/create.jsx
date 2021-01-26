import React, { Component } from 'react';
import {InputGroup,FormControl,Container,Col,Row,Image,Button} from 'react-bootstrap';
import t3 from "./images/t-4.png";
import {Link} from 'react-router-dom';

class Createnew extends Component{
    render() {
        return (
            <section>
                <div>
                </div>
                <div className="container">
                    <div className="createSingle row">
                        <div className='col-lg-12'> <ul className="breadcrumbstep">
                            <li className='active'>Step 1. Basic information</li>
                            <li>Step 2. Template selection</li>
                            <li>Step 3. Template configuration</li>
                            <li>Step 4. Completion</li>
                        </ul></div>
                        <div  className='col-lg-4'>
                            <img src={t3} alt=""/>
                        </div>
                        <div className='col-lg-8'>
                            <ul>

                                <li> <InputGroup className="mb-3">
                                    <FormControl
                                        placeholder="Username"
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                    />
                                </InputGroup></li>
                                <li> <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon3">
                                            https://
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl id="basic-url" aria-describedby="basic-addon3" />
                                </InputGroup></li>
                                <li>
                                    <InputGroup>

                                        <FormControl as="textarea" aria-label="With textarea" />
                                    </InputGroup>
                                </li>
                                <li className='brdr'>
                                    <Link to='/'><Button variant="outline-primary" className='leftBtn'>Maybe Later</Button></Link>
                                    <Button variant="primary">Next</Button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>


            </section>


        );
    }
}
export default Createnew;
