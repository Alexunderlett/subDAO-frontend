import React, {Component, useEffect} from 'react';
import {Button, FormControl, InputGroup,FormLabel} from "react-bootstrap";
import closeBtn from '../../images/shutdownW.png'
import { Trans,Translation } from 'react-i18next';


class FirstStep extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgUrl: '',
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
        this.props.handlerSet(2);

    }
    handleImageChange = (e) => {
        this.setState({imgUrl:e.target.value});
    }

    removeImage = () => {
        this.setState({imgUrl:''});
        sessionStorage.setItem('ImageUrl', '')
    }

    render() {
        let {imgUrl ,form:{name,  description}} = this.state;
        return <div className='row'>
                <div className='col-3'>
                    {
                        imgUrl && <div className='uploadBrdr'>
                            <div className='uploadTit'><Trans>DAOImage</Trans></div>
                            <div className='imgBrdr'>
                                <img src={imgUrl} alt=""/>
                                {
                                    <img src={closeBtn} className='removeBrdr'  onClick={this.removeImage}/>
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
                                       placeholder={t('FillImage')}
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
