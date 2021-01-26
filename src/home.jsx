import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import Slick from "./components/slick";

 class Home extends Component {
    render() {
        return (<div>

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
                                <Slick />
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
                                <Link to='/create'><button className="btn btn-primary trFooter-Form-button" type="submit">Create My DAO
                                </button></Link>
                            </div>

                        </div>

                    </div>
                </div>
            </section>

        </div>)
    }
}

export default Home;
