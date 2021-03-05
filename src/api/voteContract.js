import ConnectContract from './connectContract';
let loadVote = false;
let votecontract;
export default async function voteConnect(state, dispatch)  {

    const {apiState, api, votecontractState} = state;
    let account = JSON.parse(sessionStorage.getItem('account'));
    if (apiState !== 'READY' || account && !account.length) return;
    const asyncLoadVote = async () => {

        try {
            // votecontract = await ConnectContract(api, 'vote','5CPrv4sEHos9Xc6j2AHntSaCaQPyE3ufiKnkDV1QjaV3iVsb');
            votecontract = await ConnectContract(api, 'vote','5CPrv4sEHos9Xc6j2AHntSaCaQPyE3ufiKnkDV1QjaV3iVsb');
            dispatch({ type: 'SET_VOTE', payload: votecontract });
        } catch (e) {
            console.error(e);
            dispatch({ type: 'VOTE_ERROR' });
        }
    };
    if (votecontractState!=='LOAD_VOTE') return;
    if (loadVote) return dispatch({ type: 'SET_VOTE', payload: votecontract });
    loadVote = true;
    asyncLoadVote();
}
