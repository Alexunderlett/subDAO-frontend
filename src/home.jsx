import React, {useEffect, useState} from 'react';
import Slick from "./components/slick";
import {Modal,Button} from "react-bootstrap";
import {useSubstrate} from "./api/contracts";
import api from "./api";

export default function Home(props) {

    let [showButton, setShowButton] = useState(false);
    const {state,dispatch} = useSubstrate();
    const {maincontract} = state;
    const [list,setlist]= useState([]);

     const handleClick =()=> {
         let account = JSON.parse(sessionStorage.getItem('account'));

         if(account === null || !account.length){
             setShowButton(true)
         }else{
             props.history.push('/create')
         }
     }
    useEffect(() => {
        dispatch({type: 'LOAD_MAINCONTRACT'});
    }, []);

    //  useEffect(() => {
    //      if(list.length){
    //          for(let item of list){
    //              await api.base.InitBase(state, dispatch,'5GPi6oGcFqmJg9JxWBL7pxthya6xbu54oUQzNdFwdgAuGcMV');
    //          }
    //      }
    // }, [list]);

     useEffect(async() => {
         await api.main.listDaoInstances(maincontract).then(data => {
             if (!data) return;
             setlist(data)
         });
    }, [maincontract]);

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
                                <Slick history={props.history}/>
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


