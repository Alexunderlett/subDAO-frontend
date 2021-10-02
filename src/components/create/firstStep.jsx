import React, { Component, useEffect } from 'react';
import closeBtn from '../../images/shutdownW.png'
import { Trans, Translation } from 'react-i18next';
import { Modal, Button, Input } from 'antd';
import styled from 'styled-components';
import right from '../../img/right.png';


const Info = styled.div`
    .title{
        height: 40px;
        font-size: 34px;
        font-family: Roboto-Light, Roboto;
        font-weight: 300;
        color: #10134E;
        line-height: 40px;
    }
    .detail{
        width: 600px;
        height: 50px;
        font-size: 18px;
        font-family: Roboto-Light, Roboto;
        font-weight: 300;
        color: #A6A6B7;
        line-height: 22px;
    }
`
const Tip = styled.div`
    text-align: center;
    padding: 50px 20px;
    font-size: 18px;
    font-family: Roboto-Light, Roboto;
    font-weight: 300;
    color: #010643;
    line-height: 21px;
`
const Content = styled.div`
    .title{
        height: 21px;
        font-size: 18px;
        font-family: Roboto-Regular, Roboto;
        font-weight: 400;
        color: #10164B;
        line-height: 21px;
        margin-bottom: 10px;
    }
    .imgBrdr{
        width: 140px;
        height: 140px;
        position: relative;
        img{
            width: 100%;
            height: 100%;
        }
        .removeBrdr{
            position: absolute;
            top: -10px;
            right: -10px;
            background: #A6A6B7;
            color: #fff;
            width: 20px;
            font-size: 16px;
            height: 20px;
            z-index: 99;
            text-align: center;
            line-height: 20px;
            border-radius: 100%;
            cursor: pointer;
        }
    }
    .imageBox{
        display: flex;
        .img{
            width: 140px;
            height: 140px;
            background: #FFFFFF;
            box-shadow: 0px 0px 4px 0px rgba(16, 22, 75, 0.1);
            border-radius: 8px;
            text-align: center;
            line-height: 140px;
            margin-right: 20px;
        }
        .inputBrdr{
            flex: 1;
            display: flex;
            align-items: center;
        }
    }
    .uploadBrdr, .line{
        margin-top: 30px;
    }
`

class FirstStep extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgUrl: '',
            errTips: false,
            form: {
                name: '',
                // website: '',
                description: ''
            }
        }
    }
    handleChange = (e) => {
        const { name, value } = e.target;
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
        if (form != null) {
            this.setState({ form });
            this.setState({ imgUrl });
        }
    }

    toSecondStep = () => {
        const { form, imgUrl } = this.state;

        sessionStorage.setItem('firstStep', JSON.stringify(form))
        sessionStorage.setItem('imgUrl', JSON.stringify(imgUrl))

        if (imgUrl && form.name && form.description) {
            this.props.handlerSet(2);
        } else {
            this.setState({ errTips: true });
        }


    }
    handleImageChange = (e) => {
        this.setState({ imgUrl: e.target.value });
    }
    seterrTips = (e) => {
        this.setState({ errTips: false });
    }

    removeImage = () => {
        this.setState({ imgUrl: '' });
        sessionStorage.setItem('ImageUrl', '')
    }

    render() {
        let { imgUrl, form: { name, description }, errTips } = this.state;
        return <div className="content">
            <Modal
                visible={errTips}
                onCancel={this.seterrTips}
                className='newVoteBrdr homebtm'
                footer={null}
            >
                <Tip>
                    DAO Logo、DAO name、DAO description is Required
                </Tip>
            </Modal>
            <Info>
                <div className="title">Basic informationn</div>
                <div className="detail">
                    DAOWallet Will Soon Be Launched On Chrome Web Store. It Will Gradually Support Most Types .
                </div>
            </Info>
            <Content>
                {
                    imgUrl && <div className='uploadBrdr'>
                        <div className='title'><Trans>DAOImage</Trans></div>
                        <div className='imgBrdr'>
                            <img src={imgUrl} alt="" />
                            {
                                <img src={closeBtn} className='removeBrdr' onClick={this.removeImage} alt='' />
                            }
                        </div>
                    </div>
                }
                {
                    !imgUrl && <div className='uploadBrdr'>
                        <div className='title'><Trans>DAOImage</Trans></div>
                        <div className="imageBox">
                            <div className="img"><Trans>ImageScale</Trans></div>
                            <div className="inputBrdr">
                                <Translation>{t => <Input type="text"
                                    placeholder='Url'
                                    onChange={this.handleImageChange}
                                    allowClear={true}
                                    />}
                                </Translation>
                            </div>
                        </div>
                    </div>
                }

                <div className="line">
                    <div className="title"><Trans>DAOName</Trans></div>
                    <div className='inputBrdr'>
                        <Translation>{t =>
                            <Input
                                placeholder={t('FillName')}
                                value={name}
                                name='name'
                                autoComplete="off"
                                onChange={this.handleChange}
                                allowClear={true}
                            />
                        }
                        </Translation>
                    </div>
                </div>

                <div className="line">
                    <div className="title"><Trans>DAODescription</Trans></div>
                    <div className='inputBrdr'>
                        <Translation>{t =>
                            <Input as="textarea"
                                placeholder={t('FillDAODescription')}
                                value={description}
                                name='description'
                                autoComplete="off"
                                onChange={this.handleChange}
                                allowClear={true}
                            />
                        }
                        </Translation>
                    </div>
                </div>

                <div className="line" style={{textAlign: 'right'}}>
                    <Button type="primary" disabled={errTips} onClick={this.toSecondStep}>
                        <Trans>Next</Trans>
                        <img src={right} alt="" style={{ width: '20px' }} />
                    </Button>
                </div>
            </Content>
        </div>
    }
}

export default FirstStep;
