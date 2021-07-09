import React,{Component} from 'react';
import {Trans} from "react-i18next";

class StepNav extends Component{
    render() {
        return <div className='col-lg-12'>
            <div className="breadcrumbstep">
                <div className='bgline' />
                    <ul>
                        <li className={this.props.type === 1?'active step1':'step1'}>
                            <div><Trans>Basicinformation</Trans></div>
                            <span>1</span>
                        </li>
                        <li className={this.props.type === 2?'active step2':'step2'}>
                            <div><Trans>TemplateSelection</Trans></div>
                            <span>2</span>
                        </li>
                        <li className={this.props.type === 3?'active step3':'step3'}>
                            <div><Trans>TemplateConfiguration</Trans></div>
                            <span>3</span>
                        </li>
                        <li className={this.props.type === 4?'active step4':'step4'}>
                            <div>Token Configuration</div>
                            <span>4</span>
                        </li>
                    </ul>


            </div>

        </div>;
    }
}

export default StepNav;
