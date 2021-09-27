import React from 'react';
import { Modal } from 'antd';
import styled from 'styled-components';


const Tip = styled.div`
    text-align: center;
    padding: 50px 20px;
    font-size: 18px;
    font-family: Roboto-Light, Roboto;
    font-weight: 300;
    color: #010643;
    line-height: 21px;
`
export default function Loading(props) {
    const { showLoading, tips, setLoading } = props;
    return <Modal
        visible={showLoading}
        className='loading'
        onCancel={()=>setLoading()}
        footer={null}
    >
        <Tip className="waiting">{tips}</Tip>
    </Modal>;
}

