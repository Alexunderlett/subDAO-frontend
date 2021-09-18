import Routerlink from './router/router'
import FootBtm from "./components/footBtm";
import React from "react";
import Headertop from "./components/header";
import { SubstrateContextProvider} from './api/contracts';
import mp4 from './images/wave.mp4';
import GlobalStyle from './utils/GlobalStyle'


function App(props) {

    return (
        <SubstrateContextProvider>
            <div className="bg-video">
                <video className="v1" autoPlay muted loop>
                    <source src={mp4} />
                </video>
            </div>
            <div className='maincontainer'>

                {/*<div >*/}
                {/*    <div>*/}
                {/*        <button onClick={()=>i18n.changeLanguage(i18n.language=='en'?'zh':'en')}>{i18n.language=='en'?'zh':'en'}</button>*/}
                {/*    </div>*/}

                {/*    /!* 3种常用使用方式 *!/*/}
                {/*    <h1>{t('home')}</h1>*/}
                {/*    <h2><Trans>home</Trans></h2>*/}
                {/*    <Translation>{t => <h3>{t('home')}</h3>}</Translation>*/}
                {/*</div>*/}

                <Headertop />
                <div className='bodycontainer'>
                    <Routerlink />
                </div>

                <FootBtm />
            </div>
            <GlobalStyle/>
      </SubstrateContextProvider>
    );
}

export default App;
