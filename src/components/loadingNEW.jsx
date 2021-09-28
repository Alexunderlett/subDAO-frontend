import React from 'react';
import {Spin} from "antd";
import styled from "styled-components";


const LoadingSpin = styled.div`
 width: 100%;
 text-align: center;
 
`;

export default function  LoadingNew(props) {


    return<LoadingSpin><Spin /></LoadingSpin>

}
