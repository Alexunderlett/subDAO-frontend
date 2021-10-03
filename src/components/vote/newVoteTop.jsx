import React from 'react';
import { Steps } from 'antd';

const { Step } = Steps;

export default function NewVoteTop(props) {

    return <Steps size="small" style={props.style} current={props.type - 1}>
        <Step title="" />
        <Step title="" />
        <Step title="" />
        <Step title="" />
        <Step title="" />
    </Steps>;
}

