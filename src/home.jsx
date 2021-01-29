import React, { Component } from 'react';
import Slick from "./components/slick";

 class Home extends Component {

     handleClick =()=> {
         this.props.history.push('/create')
     }

    render() {
        return (<div>
            <div className='container header'>
                <div className="row ">
                    <div className='col-12 rightText'>
                        <div className="header-button">
                            <button className='btn'>Connect Wallet</button>
                        </div>
                    </div>

                </div>
            </div>
            <section className="padding">
                <div className="container">
                    <div className="trheading wow ">
                        <h2 className="mb-0">SubDAO<br />One DAO serveres ALL</h2>
                    </div>
                </div>
                <div className="testimonial-bg">
                    <div className="container">
                        <div className="testimonial-slider justify-content-center">
                            <div className="slider slider-nav trtestimonial-nav">
                                <Slick history={this.props.history}/>
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
                                <button className="btn btn-primary trFooter-Form-button" onClick={this.handleClick}>Create My DAO
                                </button>
                            </div>

                        </div>

                    </div>
                </div>
            </section>

        </div>)
    }
}

export default Home;

