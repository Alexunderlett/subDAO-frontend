import React, {Component} from 'react';
import t3 from "./images/t-4.png";
import bg from "./images/shape-5.png";
import bg2 from "./images/round-shape.png";
import bg3 from "./images/dottd-squre.png";
import StepNav from './components/stepNav';
import FirstStep from './components/create/firstStep';
import SecondStep from './components/create/secondStep';
import ThirdStep from './components/create/thirdStep';
import ForthStep from './components/create/forthStep';
import Headertop from "./components/Headertop";


class Createnew extends Component {
    constructor(props) {
        super(props);
        this.state={
            type:1
        }
    }

    setStep =(i) => {
        this.setState({type:i})
    }

    render() {
        return (<div>
                    <Headertop />

            <section>
                <div className="shape-image-five wow fadeInLeft" data-wow-duration="3s">
                    <img src={bg} alt=""/>
                </div>
                <div className="shape-image-four">
                    <img src={bg2} alt="" />
                </div>
                <div className="shape-image-two">
                    <img src={bg3} alt="" />
                </div>
                <div className="container">
                    <div className="createSingle row">
                        <StepNav type={this.state.type} />
                        <div className='col-lg-4'>
                            <img src={t3} alt=""/>
                        </div>
                        <div className='col-lg-8'>
                            { this.state.type === 1 && <FirstStep handlerSet={this.setStep} />}
                            { this.state.type === 2 && <SecondStep handlerSet={this.setStep} />}
                            { this.state.type === 3 && <ThirdStep handlerSet={this.setStep} />}
                            { this.state.type === 4 && <ForthStep handlerSet={this.setStep} />}
                        </div>
                    </div>
                </div>
            </section>

            </div>
        );
    }
}

export default Createnew;
