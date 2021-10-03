import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Modal } from 'antd';
import logoRound from '../img/logoRound.png';
import logoShadow from '../img/logoShadow.png';
import { withRouter } from 'react-router-dom';


const Msg = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    .loagding{
        display: flex;
        
        .img{
            display: flex;
            flex-direction: column;
            margin-right: 0.9rem;
            margin-bottom: 1rem;
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
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(1, 6, 67, 0.6);
            line-height: 3rem;
        }
    }
    .msg{
        font-size: 1.8rem;
        font-family: Roboto-Light, Roboto;
        font-weight: 300;
        color: #010643;
        line-height: 2.1rem;
    }
`


const LoadingModal = (props) => {
    const { showMsg, handleClose, msg } = props

    return (
        <Modal
            closable={false}
            visible={showMsg}
            onCancel={handleClose}
            footer={null}
            mask={false}
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
                    {msg}
                </div>
            </Msg>
        </Modal>
    );
}

export default withRouter(LoadingModal);
