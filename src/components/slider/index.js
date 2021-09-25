import { memo, useEffect, useState } from 'react'
import Swiper, { Autoplay, Pagination } from 'swiper/swiper.cjs' 
import { SliderContainer } from './style';
import 'swiper/swiper-bundle.css';

Swiper.use([Pagination, Autoplay])

function Slider(props) {
    const [sliderSwiper, setSliderSwiper] = useState(null);
    const { bannerlist } = props;


    useEffect(() => {
        if (bannerlist.length && !sliderSwiper) {
            let newSliderSwiper = new Swiper(".slider-container", {
                loop: true,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.swiper-pagination',
                }
            });
            setSliderSwiper(newSliderSwiper);
        }
    }, [bannerlist?.length, sliderSwiper]);

    return (
        <SliderContainer>
            <div className="before"></div>
            <div className="slider-container">
                <div className="swiper-wrapper">
                    {
                        bannerlist.map(slider => {
                            return (
                                <div className="swiper-slide" key={slider.id}>
                                    <div className="slider-nav">
                                        <img src={slider.imageUrl} width="100%" height="100%" alt="推荐"></img>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="swiper-pagination"></div>
            </div>
        </SliderContainer>
    )
}

export default memo(Slider)