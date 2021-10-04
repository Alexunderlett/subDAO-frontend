import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Modal } from 'antd';
import exclamation from '../img/exclamation.png';
import { withRouter } from 'react-router-dom';
import { useSubstrate } from "../api/contracts";


const Msg = styled.div`
    display: flex;
    align-items: center;
    img{
        width: 3.2rem;
        height: 3.2rem;
    }
    .msg{
        margin-left: 1.5rem;
        font-size: 1.8rem;
        font-family: Roboto-Light, Roboto;
        font-weight: 300;
        color: #010643;
        line-height: 2.1rem;
    }
`


const MsgModal = (props) => {
    const { showMsg, handleClose } = props
    const { state, dispatch } = useSubstrate();
    const { msgType } = state;

    return (
        <Modal
            closable={msgType && msgType.closable !== false}
            visible={showMsg}
            onCancel={handleClose}
            footer={null}
            mask={false}
        >
            <Msg>
                <img src={exclamation} alt="" />
                <div className="msg">
                    {msgType && msgType.msg}
                </div>
            </Msg>
        </Modal>
    );
}

export default withRouter(MsgModal);
