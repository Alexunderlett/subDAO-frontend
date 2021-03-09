import React, {useEffect, useState} from 'react';
import Slick from "./components/slick";
import {Modal} from "react-bootstrap";
import {useSubstrate} from "./api/contracts";
import Accounts from "./api/Account";
import api from "./api";

export default function Home(props) {
    const {state,dispatch} = useSubstrate();
    const {homepage,maincontract,allAccounts} = state;

    const [showButton, setShowButton] = useState(false);
    const [showlist, setshowlist] = useState(false);
    const [imglist, setimglist] = useState([]);
    const account = JSON.parse(sessionStorage.getItem('account'));
     const handleClick = async ()=> {
         if(account === null || !account.length){
             setShowButton(true);

         }else{
             props.history.push('/create')
         }
     }
    useEffect(() => {
        dispatch({type: 'LOAD_MAINCONTRACT'});

        if(!allAccounts && account){
            dispatch({type: 'SET_ALLACCOUNTS',payload:account});
        }
    }, []);

     useEffect(async() => {

         if(maincontract==null ) return ;
         let addresslist = await api.main.listDaoInstances(maincontract);
         let arr=[];
         if(addresslist && addresslist.length){
             let i=0;
             for(let item of addresslist){
                 let logo = await api.base.InitHome(state, item.dao_manager_addr);
                 arr[i]={
                     address: item.dao_manager_addr,
                     logo
                 };
                 i++;
             }
         }
         setimglist(arr)
         dispatch({type: 'SET_HOME',payload:arr});
    }, [allAccounts,maincontract]);
    useEffect(() => {
        setimglist(homepage)
    }, [homepage]);

    return (<div>
            <section className="padding">
                <div className="container">
                    <div className="trheading">
                        <h2 className="mb-0">SubDAO<br />One DAO serveres ALL</h2>
                    </div>
                </div>
                <div className="testimonial-bg">
                    <div className="container">
                        <div className="testimonial-slider justify-content-center">
                            <div className="slider slider-nav trtestimonial-nav">
                                {
                                    !!imglist && !!imglist.length && <Slick list={imglist} history={props.history}/>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        <section>
                <div className="footer-top ">
                    <div className="container position-relative">
                        <div className="row justify-content-center">
                            <div className="col-12">
                                <button className="btn btn-primary trFooter-Form-button" onClick={handleClick}>Create My DAO
                                </button>
                                <Modal
                                    show={showButton}
                                    aria-labelledby="contained-modal-title-vcenter"
                                    centered
                                    onHide={() => setShowButton(false)}
                                >
                                    <Modal.Header closeButton>
                                            <i className='fa fa-user-times homeTop' />
                                    </Modal.Header>
                                    <Modal.Body className='homebtm'>
                                        <h4>Please connect wallet</h4>
                                    </Modal.Body>
                                </Modal>
                            </div>

                        </div>

                    </div>
                </div>
            </section>


        </div>)
}


