import React from "react";
import { SubstrateContextProvider } from "./api/contracts";
// import mp4 from "./images/wave.mp4";
import { GeistProvider, CssBaseline } from "@geist-ui/react";

import { HashRouter as Router } from "react-router-dom";
import Routerlink from "./router/router";
import FootBtm from "./components/footBtm";
import Headertop from "./components/header";
import GlobalStyle from "./utils/GlobalStyle";

// GeistStyle
const myTheme = {
    "type": "Custom",
    "palette": {
      "background": "#f9faff",
      "foreground": "#10164b",
      "success": "#d52473"
    }
  }

function App(props) {
  return (
    <GeistProvider themes={[myTheme]}>
      <CssBaseline />

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

    </GeistProvider>
  );
}

export default App;
