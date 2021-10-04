import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Modal } from 'antd';
import logoRound from '../img/logoRound.png';
import logoShadow from '../img/logoShadow.png';
import { withRouter } from 'react-router-dom';
import { useSubstrate } from "../api/contracts";


const Msg = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    .loagding{
        display: flex;
        text-align: center;
        align-content: center;
        justify-content: center;
        .img{
            display: flex;
            align-content: center;
            flex-direction: column;
            margin-right: 0.9rem;
            //margin-bottom: 1rem;
            height: 2rem;
            .logo{
                width: 3rem;
                height: 3rem;
            }
            .logoShadow{
                width: 3rem;
                height: 1rem;
            }
        }
        .text{
            font-size: 1.4rem;
            font-family:PingFang-Regular;
            font-weight: 400;
            color: rgba(1, 6, 67, 0.6);
            line-height: 3rem;
      
        }
    }
    .msg{
        font-size: 1.8rem;
        font-family: Roboto-Light;
        font-weight: 300;
        color: #010643;
        line-height: 2.1rem;
      padding-top: 1.5rem;
              
    }
`


const LoadingModal = (props) => {
    const { showMsg, handleClose } = props;
    const { state, dispatch } = useSubstrate();
    const { loadingType } = state;

    return (
        <Modal
            closable={false}
            visible={showMsg}
            onCancel={handleClose}
            maskClosable={false}
            footer={null}
            centered={true}
        >
            <Msg>
                <div className="loagding">
                    <div className="img">
                        <img src={logoRound} className="logo" alt="" />
                        <img src={logoShadow} className="logoShadow" alt="" />
                    </div>
                    <div className="text">Loading…</div>
                </div>
                <div className="msg">
                    {loadingType}
                </div>
            </Msg>
        </Modal>
    );
}

export default withRouter(LoadingModal);
