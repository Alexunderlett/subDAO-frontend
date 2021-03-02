module.exports = (state, action) => {
    switch (action.type) {
        //api
        case 'CONNECT_INIT':
            return { ...state, apiState: 'CONNECT_INIT' };

        case 'CONNECT':
            return { ...state, api: action.payload, apiState: 'CONNECTING' };

        case 'CONNECT_SUCCESS':
            return { ...state, apiState: 'READY' };

        case 'CONNECT_ERROR':
            return { ...state, apiState: 'ERROR', apiError: action.payload };

            //main contract
        case 'LOAD_MAINCONTRACT':
            return { ...state, maincontractState: 'LOAD_MAINCONTRACT' };

        case 'SET_MAINCONTRACT':
            return { ...state, maincontract: action.payload, maincontractState: 'READY' };

        case 'MAINCONTRACT_ERROR':
            return { ...state, maincontract: null, maincontractState: 'ERROR' };

            //accounts
        case 'LOAD_ALLACCOUNTS':
            return { ...state, allaccountsState: 'LOAD_ALLACCOUNTS' };

        case 'SET_ALLACCOUNTS':
            return { ...state, allAccounts: action.payload, allaccountsState: 'READY' };

        case 'ALLACCOUNTS_ERROR':
            return { ...state, allAccounts: null, allaccountsState: 'ERROR' };

            //base
        case 'LOAD_BASE':
            return { ...state, basecontractState: 'LOAD_BASE' };

        case 'SET_BASE':
            return { ...state, basecontract: action.payload, basecontractState: 'READY' };

        case 'BASE_ERROR':
            return { ...state, basecontract: null, basecontractState: 'ERROR' };

            //org
        case 'LOAD_ORG':
            return { ...state, orgcontractState: 'LOAD_ORG' };

        case 'SET_ORG':
            return { ...state, orgcontract: action.payload, orgcontractState: 'READY' };

        case 'ORG_ERROR':
            return { ...state, orgcontract: null, basecontractState: 'ERROR' };


            // vault
        case 'LOAD_VAULT':
            return { ...state, vaultcontractState: 'LOAD_VAULT' };

        case 'SET_VAULT':
            return { ...state, vaultcontract: action.payload, vaultcontractState: 'READY' };

        case 'LOAD_VAULT_ERROR':
            return { ...state, vaultcontract: null, vaultcontractState: 'ERROR' };

        // DAO
        case 'LOAD_DAO':
            return { ...state, daoManagercontractState: 'LOAD_DAO' };

        case 'SET_DAO':
            return { ...state, daoManagercontract: action.payload, daoManagercontractState: 'READY' };

        case 'LOAD_DAO_ERROR':
            return { ...state, daoManagercontract: null, daoManagercontractState: 'ERROR' };



        default:
            throw new Error(`Unknown type: ${action.type}`);
    }
};
