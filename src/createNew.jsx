import React, { useState, useEffect } from 'react';
import StepNav from './components/stepNav';
import MySteps from './components/MySteps';
import FirstStep from './components/create/firstStep';
import SecondStep from './components/create/secondStep';
import ThirdStep from './components/create/thirdStep';
import ForthStep from './components/create/forthStep';
import styled from 'styled-components';


const Container = styled.div`
    width: 60%;
    margin: 0 auto;
    .createSingle{
        margin-top: 6rem;
    }
`


export default function Createnew(props) {

    const [type, settype] = useState(1);

    const setStep = (i) => {
        settype(i);
        sessionStorage.setItem('step', i)
    }
    return (<div>
        <section>
            <Container className="container">
                <div className="createSingle row">
                    {/* <StepNav type={type} /> */}
                    <MySteps type={type} />

                    <div className='createBrdr'>
                        {type === 1 && <FirstStep handlerSet={setStep} />}
                        {type === 2 && <SecondStep handlerSet={setStep} history={props.history} />}
                        {type === 3 && <ForthStep handlerSet={setStep} history={props.history} />}
                        {/*{type === 4 && <ForthStep handlerSet={setStep}  history={props.history}/>}*/}
                    </div>
                </div>
            </Container>
        </section>
    </div>
    );

}
