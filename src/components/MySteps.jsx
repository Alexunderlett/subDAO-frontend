import React from 'react';
import { Steps } from 'antd';

const { Step } = Steps;

export default function MySteps(props) {

    return <div>
        <Steps size="small" current={props.type-1}>
            <Step title="Basicinformation" />
            <Step title="TemplateSelection" />
            <Step title="Token Configuration" />
        </Steps>
    </div>;

}

