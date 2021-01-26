import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../scss/slider.scss"
import React, {Component} from 'react';
import Slider from "react-slick";
import t1 from "../images/t-1.png";
import t2 from "../images/t-2.png";
import t3 from "../images/t-3.png";
import t4 from "../images/t-4.png";
import {Link} from 'react-router-dom';

class Slick extends Component {
    render() {
        const settings = {
            slidesToShow: 5,
            slidesToScroll: 1,
            dots: false,
            arrows: true,
            infinite: true,
            centerMode: true,
            focusOnSelect: true,
            responsive: [{
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        };
        return (
            <div className='sliderBrdr'>
                <Slider {...settings}>
                    <div className="testimonial-slider-img">
                        <Link to='/about'><img src={t3} /></Link>
                    </div>
                    <div className="testimonial-slider-img">
                        <img src={t2} />
                    </div>


                    <div className="testimonial-slider-img">
                        <img src={t4} />
                    </div>
                    <div className="testimonial-slider-img">
                        <img src={t1} />
                    </div>
                    <div className="testimonial-slider-img">
                        <img src={t2} />
                    </div>
                    <div className="testimonial-slider-img">
                        <img src={t4} />
                    </div>
                    <div className="testimonial-slider-img">
                        <img src={t1} />
                    </div>

                    <div className="testimonial-slider-img">
                        <img src={t3} />
                    </div>




                </Slider>
            </div>
        );
    }

}
export default Slick;
