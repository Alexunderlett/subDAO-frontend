import Routerlink from './router/router'
import FootBtm from "./components/footBtm";
import React, { createRef } from "react";
// import Headertop from "./components/Headertop";
import Headertop from "./components/header";
import { SubstrateContextProvider} from './api/contracts';


function App() {
    // const { apiState, keyring, keyringState, apiError } = useSubstrate();
    // if (apiState === 'ERROR') return console.log(apiError);
    // const contextRef = createRef();
    return (
        <SubstrateContextProvider>
            <div >
                <Headertop />
                <Routerlink />
                <FootBtm />
            </div>
      </SubstrateContextProvider>
    );
}

export default App;
