import React, {Component} from 'react';
import t3 from "./images/t-4.png";
import StepNav from './components/stepNav';
import FirstStep from './components/create/firstStep';
import SecondStep from './components/create/secondStep';
import ThirdStep from './components/create/thirdStep';
import ForthStep from './components/create/forthStep';
import PageBackground from "./components/pagebackground";

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

            <section>
                <PageBackground />
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
                            { this.state.type === 4 && <ForthStep handlerSet={this.setStep} history={this.props.history}/>}
                        </div>
                    </div>
                </div>
            </section>

            </div>
        );
    }
}

export default Createnew;
