import React, {useState} from 'react';
import Slick from "./components/slick";
import {Modal,Button} from "react-bootstrap";

export default function Home(props) {
    let [showButton, setShowButton] = useState(false);

     const handleClick =()=> {
         let account = JSON.parse(sessionStorage.getItem('account'));

         if(account === null || !account.length){
             setShowButton(true)
         }else{
             props.history.push('/create')
         }
     }


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
                                            <i className='fa fa-user-times homeTop'></i>
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


