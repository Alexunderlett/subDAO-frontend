import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Modal, Select, Button, Row, Col } from 'antd';
import right from '../images/right.png';
import { withRouter } from 'react-router-dom';


const DaoBody = styled.div`
    width: 80%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    .top{
        display: flex;
        justify-content: space-between;
        .left{
            font-size: 56px;
            font-family: Roboto-Light, Roboto;
            font-weight: 300;
            color: #10134E;
            line-height: 66px;
        }
    }
    .daos{
        width: 100%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        overflow-y: auto;
        padding: 20px 0;
        .daoItem{
            width: 90%;
            margin-bottom: 20px;
        }
    }
`


const DaosModal = (props) => {
    const {moreDaos, handleClose} = props
    const account = JSON.parse(sessionStorage.getItem('account'));

    const handleClick = () => {
        if (account != null && account.length) {
            props.history.push('/create')
        }
    }

    return (
        <Modal
            visible={moreDaos}
            onCancel={handleClose}
            className='daoModal'
            footer={null}
            mask={false}
        >
            <DaoBody>
                <div className="top">
                    <div className="left">There's always one for you</div>
                    <Button onClick={handleClick}>CreateDAO</Button>
                </div>
                <Row className="daos">
                    {
                        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map(() =>
                            <Col span={4}>
                                <div className="daoItem">
                                    <img src={right} alt="" />
                                    <div className="title">Patract</div>
                                    <div className="detail">
                                        Litentry is built on Substrate, which inherits great features and the best technologies in
                                    </div>
                                </div>
                            </Col>
                        )
                    }
                </Row>
            </DaoBody>
        </Modal>
    );
}

export default withRouter(DaosModal);
