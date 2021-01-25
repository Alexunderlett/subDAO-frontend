import { Button } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
        <div id="wrap">

            <div className="wrap-top-header-slider parallax parallax-image-1">

                <div className="shape-image-one col-5 col-lg-3 col-xl-4 wow fadeIn" data-wow-delay="1s">
                    <img src="static/picture/shape-1.png" className="img-fluid"
                         alt="The Animated background shape Image" />
                </div>

                <header className="header" id="myHeader">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-6 col-md-4 col-lg-2">
                                <div className="logo">
                                    <a href="index.html">
                                        <img src="static/picture/logo.png" className="img-fluid"
                                             alt="The Adevnto Logo Image" />
                                    </a>
                                </div>
                            </div>
                            <div className="col-6 col-md-8 col-lg-10">

                                <nav className="navbar navbar-expand-lg nabar-own p-0">
                                    <button className="navbar-toggler collapsed" type="button" data-toggle="collapse"
                                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                            aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon">
                                    <span className="menu_line_1"></span>
                                    <span className="menu_line_2"></span>
                                    <span className="menu_line_3"></span>
                                </span>
                                    </button>
                                    <div className="collapse navbar-collapse tr-nabar-collapse"
                                         id="navbarSupportedContent">
                                        <ul className="navbar-nav mr-auto align-self-center">
                                            <li className="nav-item tr-nav-item"><a className="nav-link"
                                                                                    href="#TripPlanner">TripPlanner</a>
                                            </li>
                                            <li className="nav-item tr-nav-item"><a className="nav-link"
                                                                                    href="#Destination">Destination</a>
                                            </li>
                                            <li className="nav-item tr-nav-item"><a className="nav-link"
                                                                                    href="#Stories">Stories</a>
                                            </li>
                                            <li className="nav-item tr-nav-item"><a className="nav-link"
                                                                                    href="#Clients">Clients</a>
                                            </li>
                                            <li className="nav-item tr-nav-item d-block d-lg-none"><a
                                                className="nav-link" href="#Contact">Contact
                                                Us</a>
                                            </li>
                                        </ul>
                                        <div className="header-button d-none d-lg-inline-block">
                                            <button className="btn">Contact Us</button>
                                        </div>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </header>

                <section className="padding trmain-slider" id="TripPlanner">
                    <div className="tr-slider-image col-xl-5 col-lg-6 col-sm-6 col-7 p-0 ">
                        <img src="static/picture/slider-image.png" className="img-fluid wow fadeIn"
                             alt="the Girl on the beach - best destination Image" data-wow-delay="1s" />
                    </div>
                    <div className="container trtop-baner-content">
                        <div className="row">
                            <div className="col-12 col-sm-11 col-md-9 col-lg-9 col-xl-10">
                                <div className="siider-content">
                                    <p className="wow fadeInDown" data-wow-duration="1s" data-wow-delay=".3s">Choose the
                                        best
                                        destination</p>
                                    <h1 className="wow fadeInDown" data-wow-duration="1.5s" data-wow-delay=".4s">Adventure<br />Without BOUNDARIES...</h1>
                                    <form className="tr-slider-form wow fadeInUp" data-wow-duration="1.5s"
                                          data-wow-delay=".4s">
                                        <div className="form-group position-relative mb-0">
                                            <input type="email" className="form-control trform-control"
                                                   placeholder="Find out the best place..." />
                                                <button type="submit"
                                                        className="btn btn-primary tr-form-button">Search
                                                </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>


            <section className="padding" id="Clients">
                <div className="container">
                    <div className="trheading wow fadeInDown" data-wow-duration="2s" data-wow-delay=".4s">
                        <h2 className="mb-0">Our<br />Awesome Clients.</h2>
                    </div>
                    <div className="trsubHeading mb-0">
                        <p className="wow fadeIn mb-0" data-wow-duration="2s" data-wow-delay=".4s">Lorem ipsum dolor sit
                            amet,
                            consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                            aliqua. Ut
                            enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo
                            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                            fugiat
                            nulla pariatur.</p>
                    </div>
                </div>
                <div className="testimonial-bg">
                    <div className="container">
                        <div className="testimonial-slider justify-content-center">
                            <div className="slider slider-nav trtestimonial-nav">
                                <div className="testimonial-slider-img">
                                    <img src="static/picture/t-1.png" className="img-fluid"
                                         alt="Clara Maria | Client Image" />
                                </div>
                                <div className="testimonial-slider-img">
                                    <img src="static/picture/t-2.png" className="img-fluid"
                                         alt="Maria Clara | Client Image" />
                                </div>
                                <div className="testimonial-slider-img">
                                    <img src="static/picture/t-3.png" className="img-fluid"
                                         alt="Clara Maria | Client Image" />
                                </div>
                                <div className="testimonial-slider-img">
                                    <img src="static/picture/t-4.png" className="img-fluid"
                                         alt="Maria Clara | Client Image" />
                                </div>
                                <div className="testimonial-slider-img">
                                    <img src="static/picture/t-5.png" className="img-fluid"
                                         alt="Clara Maria | Client Image" />
                                </div>
                                <div className="testimonial-slider-img">
                                    <img src="static/picture/t-1.png" className="img-fluid"
                                         alt="Maria Clara | Client Image" />
                                </div>
                                <div className="testimonial-slider-img">
                                    <img src="static/picture/t-2.png" className="img-fluid"
                                         alt="Clara Maria | Client Image" />
                                </div>
                                <div className="testimonial-slider-img">
                                    <img src="static/picture/t-5.png" className="img-fluid"
                                         alt="Clara Maria | Client Image" />
                                </div>
                                <div className="testimonial-slider-img">
                                    <img src="static/picture/t-5.png" className="img-fluid"
                                         alt="Clara Maria | Client Image" />
                                </div>
                                <div className="testimonial-slider-img">
                                    <img src="static/picture/t-5.png" className="img-fluid"
                                         alt="Clara Maria | Client Image" />
                                </div>
                            </div>
                            <div className="slider slider-for col-12 col-lg-4 m-auto p-0">
                                <div className="tr-testimonial-desc text-center">
                                    <h3>Maria Clara</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,</p>
                                </div>
                                <div className="tr-testimonial-desc text-center">
                                    <h3>Clara Maria</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,Lorem ipsum
                                        dolor
                                        sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                                        labore et
                                        dolore magna aliqua.</p>
                                </div>
                                <div className="tr-testimonial-desc text-center">
                                    <h3>Maria Clara</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,</p>
                                </div>
                                <div className="tr-testimonial-desc text-center">
                                    <h3>Clara Maria</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,Lorem ipsum
                                        dolor
                                        sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                                        labore et
                                        dolore magna aliqua.</p>
                                </div>
                                <div className="tr-testimonial-desc text-center">
                                    <h3>Maria Clara</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,</p>
                                </div>
                                <div className="tr-testimonial-desc text-center">
                                    <h3>Clara Maria</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,Lorem ipsum
                                        dolor
                                        sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                                        labore et
                                        dolore magna aliqua.</p>
                                </div>
                                <div className="tr-testimonial-desc text-center">
                                    <h3>Maria Clara</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
      {/*<header className="App-header">*/}
      {/*  <img src={logo} className="App-logo" alt="logo" />*/}
      {/*  <p>*/}
      {/*    Edit <code>src/App.js</code> and save to reload.*/}
      {/*  </p>*/}
      {/*  <a*/}
      {/*    className="App-link"*/}
      {/*    href="https://reactjs.org"*/}
      {/*    target="_blank"*/}
      {/*    rel="noopener noreferrer"*/}
      {/*  >*/}
      {/*    Learn React*/}
      {/*  </a>*/}
      {/*</header>*/}
    </div>
  );
}

export default App;
