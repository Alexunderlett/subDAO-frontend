import Routerlink from './router/router'
import FootBtm from "./components/footBtm";
import React from "react";
import Headertop from "./components/header";
import { SubstrateContextProvider,useSubstrate} from './api/contracts';


function App() {
    // const { apiState, apiError } = useSubstrate();
    // if (apiState === 'ERROR') return console.log(apiError);
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
