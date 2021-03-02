import React, {createRef, useEffect, useState} from 'react';
import t3 from "../../images/t-4.png";
import {Button, FormControl, InputGroup} from "react-bootstrap";
import Datetime from 'react-datetime';
import PageBackground from "../pagebackground";

import moment from 'moment';

var yesterday = moment().subtract(1, 'day');
var valid = function (current) {
    return current.isAfter(yesterday);
};

let inputProps = {
    placeholder: 'Please select end time',
    // disabled:true
};

export default function NewVote(props) {
    // this.datetimeRef = createRef();
    const [date, setDate] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [id, setId] = useState(null);
    const [optionlist, setOptionlist] = useState( [
        {
            option: ''
        },
        {
            option: ''
        },
        {
            option: ''
        }
    ]);
    useEffect(() => {
        setId(props.match.params.id)



    }, []);

    const handleClicktoVote = () => {
        // let {id} = this.state;

        props.history.push(`/vote/${id}`)
        // console.log(this.state)
    }

    const removeOption =(selectItem, index) => {
        let arr = optionlist;
        arr.splice(index, 1);
        setOptionlist([...arr])

    }

    const addOption = () => {
        let newArray = [...optionlist];
        newArray.push({
            option: ''

        });
        setOptionlist(newArray)
    }
    const setAddress = (e, index) => {

        let arr = optionlist;

        arr[index].option = e.target.value;
        setOptionlist([...arr])
    }

    const handleChange = (value) => {
        setDate(value._d)
    }
    const renderInput = (itemprops, openCalendar, closeCalendar) => {
        function clear() {
            console.log(itemprops.value)
            itemprops.onChange({target: {value: ''}});
        }

        return (
            <div>
                <input {...itemprops} />
                <button className="selectedCal" onClick={openCalendar} />
                {
                    itemprops.value.length !== 0 &&
                    <div className='removeDate' onClick={clear}><i className='fa fa-close' /></div>
                }

            </div>
        );
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        switch(name){
            case'title':
                setTitle(value)
                break;
            case'description':
                setDescription(value)
                break;
            default:
                break;
        }
        // this.setState({[name]: value});
        console.log(value)
    }


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
                                    <li>
                                        <div className='voteBtn'>
                                            <Datetime
                                                renderInput={renderInput}
                                                inputProps={inputProps}
                                                isValidDate={valid}
                                                // ref={datetimeRef}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <InputGroup className="mb-3">
                                                <FormControl
                                                    placeholder="Please fill the title"
                                                    name='title'
                                                    value={title}
                                                    onChange={handleInputChange}
                                                />
                                            </InputGroup>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <InputGroup>
                                                <FormControl as="textarea"
                                                             placeholder="Please fill description"
                                                             name='description'
                                                             value={description}
                                                             onChange={handleInputChange}
                                                />
                                            </InputGroup>
                                        </div>
                                    </li>

                                    <li>
                                        {optionlist.map((i, index) => (

                                            <div key={index}>
                                                <div className="row">
                                                    <div className="col-11">
                                                        <InputGroup className="mb-3">
                                                            <FormControl
                                                                placeholder="fill the option"
                                                                aria-label="Username"
                                                                aria-describedby="basic-addon1"
                                                                value={optionlist[index].option}
                                                                onChange={(event) => setAddress(event, index)}
                                                            />
                                                        </InputGroup>
                                                    </div>
                                                    <div className="col-1">
                                                        {
                                                            !!index && index!==1 && <i className="fa fa-close remove"
                                                                                            onClick={removeOption.bind(this, i, index)}/>
                                                        }

                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                        }

                                        <div>
                                            <Button variant="light" onClick={addOption}><i
                                                className="fa fa-plus"/> Add Option</Button>
                                        </div>

                                    </li>

                                    <li className='brdr'>
                                        <Button variant="primary" onClick={handleClicktoVote}>Create</Button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        )

}


