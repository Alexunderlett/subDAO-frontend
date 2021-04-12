# The frontend for SubDAO Network

This is the frontend of SubDAO. It will manage all DAO through the help of `subdao-contracts`.

## Prerequisites
Please install `Polkadot JS Extension` before you start. You can get it from here https://polkadot.js.org/extension/

SubDAO frontend replys on the smart contracts in `subdao-contracts`, SubDAO Node in `subdao-node` and `Polkadot JS Extention` . Before you start, you need deploy all the contracts in [subDAO-contracts](https://github.com/subdao-network/subdao-contracts) on [subDAO-node](https://github.com/subdao-network/subdao-node).

### Get Code
Please get the code from `https://github.com/SubDAO-Network/subDAO-frontend`

```
git clone https://github.com/SubDAO-Network/subDAO-frontend.git
```

### Config
Please find the correct address for `main_v0.1`, and update the correct address in `public/config.js`.
```
window.mainAddress = {
    main: "<MAIN CONTRACT ADDRESS>",
    rpc_server: "<SUBDAO NODE RPC>"
};
```

`<MAIN CONTRACT ADDRESS>` is the main contract's address after the contracts are deployed.
`<SUBDAO NODE RPC>` is the websocket RPC provided by SubDAO Node. If you run it locally, it should be `ws://127.0.0.1:9944` by default.

### `yarn`

Install packages needed for this App.

### `yarn start`

Runs the app in the development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### `yarn test`

Launches the test runner in the interactive watch mode.  

### `yarn build`

Builds the app for production to the `build` folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.
