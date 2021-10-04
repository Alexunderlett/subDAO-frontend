import React, {useEffect, useState} from 'react';
import closeBtn from '../../images/shutdownW.png'
import {Trans, Translation} from 'react-i18next';
import {Modal, Button, Input} from 'antd';
import styled from 'styled-components';
import right from '../../img/right.png';


const Info = styled.div`
    .title{
        height: 4rem;
        font-size: 3.4rem;
        font-family: Roboto-Light, Roboto;
        font-weight: 300;
        color: #10134E;
        line-height: 4rem;
    }
    .mt1{
      margin-top: 1rem;
    }
    .detail{
        width: 60rem;
        height: 5rem;
        font-size: 1.8rem;
        font-family: Roboto-Light, Roboto;
        font-weight: 300;
        color: #A6A6B7;
        line-height: 2.2rem;
    }
`
const Tip = styled.div`
    text-align: center;
    padding: 5rem 2rem;
    font-size: 1.8rem;
    font-family: Roboto-Light, Roboto;
    font-weight: 300;
    color: #010643;
    line-height: 2.1rem;
`
const Content = styled.div`
    .title{
        height: 2.1rem;
        font-size: 1.8rem;
        font-family: Roboto-Regular, Roboto;
        font-weight: 400;
        color: #10164B;
        line-height: 2.1rem;
        margin-bottom: 1rem;
    }
    .imgBrdr{
        width: 14rem;
        height: 14rem;
        position: relative;
        img{
            width: 100%;
            height: 100%;
            color: #A6A6B7;
        }
        .removeBrdr{
            position: absolute;
            top: -1rem;
            right: -1rem;
            background: #A6A6B7;
            color: #fff;
            width: 2rem;
            font-size: 1.6rem;
            height: 2rem;
            z-index: 99;
            text-align: center;
            line-height: 2rem;
            border-radius: 100%;
            cursor: pointer;
        }
    }
    .imageBox{
        display: flex;
        .img{
            width: 14rem;
            height: 14rem;
            background: #FFFFFF;
            box-shadow: 0 0 0.4rem 0 rgba(16, 22, 75, 0.1);
            border-radius: 0.8rem;
            text-align: center;
            line-height: 14rem;
            margin-right: 2rem;
            font-size: 1.6rem;
            color: #A6A6B7;
        }
        .inputBrdr{
        height: 4.4rem;
        margin-top: 5rem;
              .ant-input-affix-wrapper{
           height: 4.4rem;

            }
        }
    }
 
        
    .uploadBrdr, .line{
        margin-top: 3rem;
    }
    .textareaB{
    &.inputBrdr{
      height: 12.5rem;
       .ant-input-affix-wrapper{
           height: 12.5rem;
        }
    }
    }
    .nextBtn{
        width: 18rem;
        height: 5rem;
        border-radius: 0.8rem;
        font-family: PingFang-Regular;
        &:disabled{
        opacity: 0.3;
        }
    }
`;

export default function FirstStep(props){
    const [imgUrl, setimgUrl] = useState('');
    const [errTips, seterrTips] = useState(false);
    const [showDisable, setshowDisable] = useState(true);
    const [name, setName] = useState('');
    const [description, setdescription] = useState('');



    const handleChange = (e) => {
        const {name, value} = e.target;

        if(name === "name"){
            setName(value)
        }else{
            setdescription(value)
        }
    }

    useEffect(()=>{
        const form1 = JSON.parse(sessionStorage.getItem('firstStep'));
        const imgUrl1 = JSON.parse(sessionStorage.getItem('imgUrl'));
        if (form1 != null) {
            setName(form1.name);
            setdescription(form1.description);
            setimgUrl(imgUrl1);
            setshowDisable(imgUrl1.length && form1.name.length&&form1.description.length)
        }

    },[]);

    useEffect(()=>{
        setshowDisable(imgUrl.length && name.length&&description.length)

    },[imgUrl,name,description]);

    const toSecondStep = () => {
        sessionStorage.setItem('firstStep', JSON.stringify({
            name,
            description
        }))
        sessionStorage.setItem('imgUrl', JSON.stringify(imgUrl))

        if (imgUrl && name && description) {
            props.handlerSet(2);
        } else {
            seterrTips(true)
        }
    }
    const handleImageChange = (e) => {
        setimgUrl(e.target.value)
    }

    const removeImage = () => {
        setimgUrl('');
        sessionStorage.setItem('ImageUrl', '')
    }


        return <div className="content">
            <Modal
                visible={errTips}
                onCancel={()=>seterrTips(false)}
                className='newVoteBrdr homebtm'
                footer={null}
            >
                <Tip>
                    DAO Logo、DAO name、DAO description is Required
                </Tip>
            </Modal>
            <Info>
                <div className="title">Basic informationn</div>
                <div className="detail mt1">
                    DAOWallet Will Soon Be Launched On Chrome Web Store. It Will Gradually Support Most Types .
                </div>
            </Info>
            <Content>
                {
                    imgUrl && <div className='uploadBrdr'>
                        <div className='title'><Trans>DAOImage</Trans></div>
                        <div className='imgBrdr'>
                            <img src={imgUrl} alt=""/>
                            {
                                <img src={closeBtn} className='removeBrdr' onClick={removeImage} alt=''/>
                            }
                        </div>
                    </div>
                }
                {
                    !imgUrl && <div className='uploadBrdr'>
                        <div className='title'><Trans>DAOImage</Trans></div>
                        <div className="imageBox">
                            <div className="img">Image scale 1:1</div>
                            <div className="inputBrdr">
                                <Translation>{t => <Input type="text"
                                                          placeholder='Url'
                                                          onChange={handleImageChange}
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
                                onChange={handleChange}
                                allowClear={true}
                            />
                        }
                        </Translation>
                    </div>
                </div>

                <div className="line">
                    <div className="title"><Trans>DAODescription</Trans></div>
                    <div className='inputBrdr textareaB'>
                        <Translation>{t =>
                            <Input.TextArea
                                placeholder={t('FillDAODescription')}
                                value={description}
                                name='description'
                                autoComplete="off"
                                onChange={handleChange}
                                allowClear={true}
                            />
                        }
                        </Translation>
                    </div>
                </div>

                <div className="line" style={{textAlign: 'right'}}>
                    <Button className="nextBtn" type="primary" disabled={!showDisable} onClick={toSecondStep}>
                        Next
                        <img src={right} alt=""/>
                    </Button>
                </div>
            </Content>
        </div>

}
