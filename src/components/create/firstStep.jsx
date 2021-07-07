import React, {Component, useEffect} from 'react';
import {Button, FormControl, InputGroup, FormLabel, Modal} from "react-bootstrap";
import closeBtn from '../../images/shutdownW.png'
import { Trans,Translation } from 'react-i18next';


class FirstStep extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgUrl: '',
            errTips: false,
            form:{
                name: '',
                // website: '',
                description: ''
            }
        }
    }
    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState((prevState) => {
            const form = {
                ...prevState.form,
                [name]: value
            };
            return {
                form
            };
        });
    }

    componentDidMount() {
        const form = JSON.parse(sessionStorage.getItem('firstStep'));
        const imgUrl = JSON.parse(sessionStorage.getItem('imgUrl'));
        if(form!=null){
            this.setState({form});
            this.setState({imgUrl});
        }
    }

    toSecondStep = () => {
        const {form,imgUrl} = this.state;

        sessionStorage.setItem('firstStep', JSON.stringify(form))
        sessionStorage.setItem('imgUrl', JSON.stringify(imgUrl))

        if(imgUrl && form.name &&form.description){
            this.props.handlerSet(2);
        }else{
            this.setState({errTips:true});
        }


    }
    handleImageChange = (e) => {
        this.setState({imgUrl:e.target.value});
    }
    seterrTips = (e) => {
        this.setState({errTips:false});
    }

    removeImage = () => {
        this.setState({imgUrl:''});
        sessionStorage.setItem('ImageUrl', '')
    }

    render() {
        let {imgUrl ,form:{name,  description},errTips} = this.state;
        return <div className='row'>
            <Modal
                show={errTips}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={this.seterrTips}
                className='newVoteBrdr homebtm'
            >
                <Modal.Header closeButton />
                <Modal.Body>
                    <h4>DAO Logo、DAO name、DAO description is Required</h4>
                </Modal.Body>
            </Modal>
                <div className='col-3'>
                    {
                        imgUrl && <div className='uploadBrdr'>
                            <div className='uploadTit'><Trans>DAOImage</Trans></div>
                            <div className='imgBrdr'>
                                <img src={imgUrl} alt=""/>
                                {
                                    <img src={closeBtn} className='removeBrdr'  onClick={this.removeImage} alt=''/>
                                }
                            </div>
                        </div>
                    }
                    {
                        !imgUrl && <div className='uploadBrdr'>
                            <div className='uploadTit'><Trans>DAOImage</Trans></div>
                            <FormLabel><Trans>ImageScale</Trans></FormLabel>
                            <div className="inputBrdr">

                                <Translation>{t => <FormControl type="text"
                                       placeholder='Url'
                                       onChange={this.handleImageChange}/>}
                                </Translation>
                            </div>


                        </div>
                    }
                </div>
            <div className="col-9">
                <ul className="step1Rht">
                    <li>
                        <InputGroup className="mb-3">
                            <FormLabel><Trans>DAOName</Trans></FormLabel>
                            <div className='inputBrdr'>
                                <Translation>{t =>
                                    <FormControl
                                    placeholder={t('FillName')}
                                    value={name}
                                    name='name'
                                    autoComplete="off"
                                    onChange={this.handleChange}
                                    />
                                }
                                </Translation>

                            </div>

                        </InputGroup>
                    </li>
                    <li>
                        <InputGroup>
                            <FormLabel><Trans>DAODescription</Trans></FormLabel>
                            <div className='inputBrdr'>


                                <Translation>{t =>
                                    <FormControl as="textarea"
                                                 placeholder={t('FillDAODescription')}
                                                 value={description}
                                                 name='description'
                                                 autoComplete="off"
                                                 onChange={this.handleChange}
                                    />

                                }
                                </Translation>

                            </div>
                        </InputGroup>
                    </li>
                    <li className='NextBrdr'>
                        <Button variant="primary" onClick={this.toSecondStep}><Trans>Next</Trans></Button>
                    </li>
                </ul>
            </div>
            </div>
            ;
    }

}

export default FirstStep;
