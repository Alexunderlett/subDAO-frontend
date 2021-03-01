import React, {Component} from 'react';
import t3 from "../../images/t-4.png";
import {Button, Form} from "react-bootstrap";
import PageBackground from "../pagebackground";

class VoteView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            voteid: null,
            selected:'',
            optionlist: [
                {
                    name: 'name1',
                    value: 'value1'
                },
                {
                    name: 'name2',
                    value: 'value2'
                },
                {
                    name: 'name3',
                    value: 'value3'
                }
            ]
        };

    }

    componentDidMount() {
        this.setState({
            id: this.props.match.params.id
        });
        this.setState({
            voteid: this.props.match.params.voteid
        });
    }

    handleClicktoVote = () => {
        let {id} = this.state;
        this.props.history.push(`/vote/${id}`)
    }
    handleClicktoOverview = () => {
        let {id, voteid} = this.state;
        this.props.history.push(`/voteOverview/${id}/${voteid}`)
        console.log(this.state.selected)
    }
    handleRadio = (e) =>{
        this.setState({selected:e.target.value})
    }

    render() {
        let {optionlist} = this.state;
        return (
            <div>
                <section>
                    <PageBackground/>
                    <div className="container">
                        <div className="createSingle row">
                            <div className='col-lg-4'>
                                <div>
                                    <img src={t3} alt=""/>
                                </div>

                            </div>
                            <div className='col-lg-8'>
                                <ul>
                                    <li className='timeTop'>
                                        <i className='fa fa-clock-o'/> 03:59:28
                                    </li>
                                    <li className='VotetitleTop'>
                                        <div>
                                            <p>1. Please Fill description Please Fill description </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='voteContent'>
                                            <p>Please Fill description Please Fill description Ple2324234fsase Fill
                                                description Please Fill description Please Fill description Please Fill
                                                description Please Fill descriptifdsaon Please Fill description Please
                                                Fill description Please Fill description Please Fill description Please
                                                Fill description Please Fill description Please Fill description</p>
                                        </div>
                                    </li>

                                    <li>
                                        {optionlist.map((i, index) => (

                                            <div key={index}>
                                                <div className="row">
                                                    <div className="col-12 radioOption">
                                                        <Form.Group controlId="formBasicCheckbox">
                                                            <Form.Check
                                                                type="radio"
                                                                label={i.name}
                                                                id={`radio_${index}`}
                                                                value={i.value}
                                                                name='radiobutton' onChange={this.handleRadio}/>
                                                        </Form.Group>
                                                    </div>

                                                </div>
                                            </div>
                                        ))
                                        }


                                    </li>

                                    <li className='brdr pl-1'>
                                        <Button variant="outline-primary" className='leftBtn'
                                                onClick={this.handleClicktoVote}>Cancel</Button>
                                        <Button variant="primary" onClick={this.handleClicktoOverview}>Vote</Button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        )
    }
}

export default VoteView;
