import React, {useState, useEffect,useReducer} from 'react';
import * as history from 'history';
import {Form} from "react-bootstrap";
import {useSubstrate} from "../api/contracts";
import reducer from '../api/reducer';
import INIT_STATE from '../api/initState';
import {
    web3Accounts,
    web3Enable,

} from '@polkadot/extension-dapp';

const createHashHistory = history.createHashHistory();


export default function Headertop() {
    const {api, allAccounts} = useSubstrate();

    const [showHeader, setshowHeader] = useState(false);
    let [allList, setallList] = useState([]);
    const [selected, setselected] = useState([]);
    const [state, setState] = useState({});

    useEffect(() => {
        setshowHeader(createHashHistory.location.pathname !== '/')
        createHashHistory.listen((obj) => {
            setshowHeader(createHashHistory.location.pathname !== '/')
        });
    });

    useEffect(() => {
        let selectedStorage = JSON.parse(sessionStorage.getItem('account'));
        if (selectedStorage) {
            setselected(selectedStorage)
        }
        // return () => {
        //     setState({}); // This worked for me
        // };
    }, []);

    const backNav = () => {
        createHashHistory.goBack()

    }

    const backHome = () => {

        createHashHistory.push(`/`)
    }

    const selectAccounts = (e) => {
        let selected = allList.filter(i => i.address === e.target.value);
        setselected(selected);
        sessionStorage.setItem('account', JSON.stringify(selected))
    }

    const connectWallet = async () => {
        await web3Enable('SubDAO');
        const allAccounts = await web3Accounts();
        setallList(allAccounts);
    }


    return (<div className='container header'>
        <div className="row">
            <div className='col-6 leftText'>
                {
                    showHeader &&
                    <div>
                        <span onClick={backNav}><i className='fa fa-chevron-left'/>Prev</span>
                        <span onClick={backHome}>Home</span>
                    </div>
                }
            </div>
            <div className='col-6 rightText'>
                <div className="header-button">
                    {
                        !selected.length && !allList.length &&
                        <button className='btn' onClick={connectWallet}>Connect Wallet</button>
                    }
                    {!selected.length && !!allList.length &&
                    <Form.Control as="select" onChange={(event) => selectAccounts(event)}>
                        <option value=''>Select Option</option>
                        {
                            allList.map((opt) =>
                                <option value={opt.address} key={opt.address}>{opt.meta.name}</option>
                            )
                        }
                    </Form.Control>
                    }
                    {!!selected.length &&
                    <div className='topName'>Account: <span>{selected[0].meta.name}</span></div>
                    }
                </div>
            </div>

        </div>
    </div>);

}

