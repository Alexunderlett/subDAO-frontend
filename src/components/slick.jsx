import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../scss/slider.scss"
import React, {Component} from 'react';
import Slider from "react-slick";
import t1 from "../images/t-1.png";
import t2 from "../images/t-2.png";
import t3 from "../images/t-3.png";
import t4 from "../images/t-4.png";

class Slick extends Component {
    handleClicktoAbout(id) {
        this.props.history.push(`/about/${id}`)
    }
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
                        <img src={t3}  alt='' id="3" onClick={this.handleClicktoAbout.bind(this,3)}/>
                    </div>
                    <div className="testimonial-slider-img">
                        <img src={t2}  alt='' id="2" onClick={this.handleClicktoAbout.bind(this,2)}/>
                    </div>


                    <div className="testimonial-slider-img">
                        <img src={t4}  alt=''/>
                    </div>
                    <div className="testimonial-slider-img">
                        <img src={t1}  alt=''/>
                    </div>
                    <div className="testimonial-slider-img">
                        <img src={t2}  alt=''/>
                    </div>
                    <div className="testimonial-slider-img">
                        <img src={t4}  alt=''/>
                    </div>
                    <div className="testimonial-slider-img">
                        <img src={t1}  alt=''/>
                    </div>

                    <div className="testimonial-slider-img">
                        <img src={t3}  alt=''/>
                    </div>
                </Slider>
            </div>
        );
    }

}
export default Slick;
