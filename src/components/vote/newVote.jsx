import React, { Component } from 'react';
import t3 from "../../images/t-4.png";
import {Button, FormControl, InputGroup} from "react-bootstrap";
import Datetime from 'react-datetime';
import PageBackground from "../pagebackground";

import moment from 'moment';
var yesterday = moment().subtract( 1, 'day' );
var valid = function( current ){
    return current.isAfter( yesterday );
};

let inputProps = {
    placeholder: 'Please select end time',
    // disabled:true
};

class NewVote extends Component {
    constructor(props) {
        super(props);
        this.state={
            date:'',
            id: null,
            optionlist:[
                {
                    option:''
                },
                {
                    option:''
                },
                {
                    option:''
                }
            ]
        };
        this.datetimeRef = React.createRef();
    }
    componentDidMount() {
        this.setState({
            id:this.props.match.params.id
        })
    }
    handleClicktoVote = () => {
        let { id } = this.state;
        this.props.history.push(`/vote/${id}`)
    }
    removeOption (selectItem,index){

        let { optionlist} = this.state;

        optionlist.splice(index,1);

        this.setState({optionlist});
    }
    addOption =()=>{
        let { optionlist} = this.state;
        let newArray = [...optionlist];
        newArray.push({
            option:''

        });
        this.setState({optionlist: newArray});
    }
    setAddress =(e,index)=>{
        let { optionlist} = this.state;
        optionlist[index].option = e.target.value;
        this.setState({optionlist})
    }

    handleChange=(value)=>{
        this.setState({date: value._d})
    }
    renderInput = ( props, openCalendar, closeCalendar )=>{
        function clear(){
            console.log(props.value)
            props.onChange({target: {value: ''}});
        }
        return (
            <div>
                <input {...props} />
                <button className="selectedCal" onClick={openCalendar}></button>
                {
                    props.value.length!==0 && <div className='removeDate' onClick={clear}><i className='fa fa-close'></i></div>
                }

            </div>
        );
    }
    render() {
        let {optionlist} = this.state;
        return (
            <div>
                <section>
                    <PageBackground />
                    <div className="container">
                        <div className="createSingle row">
                            <div className='col-lg-4'>
                                <div>
                                    <img src={t3} alt=""/>
                                </div>

                            </div>
                            <div className='col-lg-8'>
                                <ul>
                                    <li>
                                        <div className='voteBtn'>
                                            <Datetime
                                                renderInput={ this.renderInput }
                                                inputProps={ inputProps }
                                                isValidDate={ valid }
                                                ref={this.datetimeRef}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <InputGroup className="mb-3">
                                                <FormControl
                                                    placeholder="Please fill the title"
                                                    aria-label="Username"
                                                    aria-describedby="basic-addon1"
                                                />
                                            </InputGroup>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <InputGroup>
                                                <FormControl as="textarea" aria-label="With textarea" placeholder="Please fill description" />
                                            </InputGroup>
                                        </div>
                                    </li>

                                    <li>
                                        { optionlist.map((i,index)=>(

                                            <div key={index}>
                                                <div className="row">
                                                    <div className="col-11">
                                                        <InputGroup className="mb-3">
                                                            <FormControl
                                                                placeholder="fill the option"
                                                                aria-label="Username"
                                                                aria-describedby="basic-addon1"
                                                                value={optionlist[index].option}
                                                                onChange={(event)=> this.setAddress(event,index)}
                                                            />
                                                        </InputGroup>
                                                    </div>
                                                    <div className="col-1">
                                                        <i className="fa fa-close remove" onClick={this.removeOption.bind(this,i,index)} />
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                        }

                                        <div>
                                            <Button variant="light" onClick={this.addOption}><i className="fa fa-plus" /> Add Option</Button>
                                        </div>

                                    </li>

                                    <li className='brdr'>
                                        <Button variant="primary" onClick={this.handleClicktoVote}>Create</Button>
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
export default NewVote;
