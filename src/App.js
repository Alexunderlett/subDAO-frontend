import React from "react";
import { SubstrateContextProvider } from "./api/contracts";
// import mp4 from "./images/wave.mp4";
import { HashRouter as Router } from "react-router-dom";
import Routerlink from "./router/router";
import FootBtm from "./components/footBtm";
import Headertop from "./components/header";
import GlobalStyle from "./utils/GlobalStyle";

function App(props) {
  return (
      <SubstrateContextProvider>
        <Router>
          {/* <div className="bg-video">
                    <video className="v1" autoPlay muted loop>
                        <source src={mp4} />
                    </video>
                </div> */}
          <div className="maincontainer">
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
            <div className="bodycontainer">
              <Routerlink />
            </div>

            <FootBtm />
          </div>
          <GlobalStyle />
        </Router>
      </SubstrateContextProvider>
  );
}

export default App;
