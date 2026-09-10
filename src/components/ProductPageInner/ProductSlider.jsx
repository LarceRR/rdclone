import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { dataMain } from '../../data/dataMain.js';
import { useParams } from 'react-router-dom';
import VideoPlayer from '../VideoPlayer/VideoPlayer.jsx';
import './ProductSlider.css';

const ProductSlider = () => {
    const path = useParams();

    const data = dataMain.find((elem) => elem.id === path.productId);

    const settings = {
        infinite: false,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        lazyLoad: true,
        autoplay: true,
        speed: 500,
    };
    return (
        <Slider {...settings}>
            {/* <div>
                <img src={data.imageCard} alt="product-image"/>
            </div>
            <div>
                <img src={data.imageInner} alt="product-image"/>
            </div> */}

            {data.innerBlocks &&
                data.innerBlocks.map((elem) => (
                    <div
                        key={elem.id}
                        className={`content ${elem.location} ${elem.vertical ? 'vert' : ''}`}
                    >
                        <div className="text">
                            <h3>{elem.title}</h3>
                            <h5 className="fw-normal">{elem.text}</h5>
                        </div>

                        {elem.image ? (
                            <img src={elem.image} alt="product-image" />
                        ) : (
                            <VideoPlayer url={elem.video} />
                        )}
                        {/* <video
                                        autoPlay
                                        muted
                                        loop
                                    >
                                        <source src={elem.video} />
                                    </video> */}
                    </div>
                ))}

            {!data.innerBlocks && (
                <div className="content">
                    <div className="text">
                        <h4>Страница</h4>
                        <p className="small">В стадии разработки...</p>
                    </div>

                    <img
                        src="https://www.yarkiy.ru//system/uploads/preview/good/27765/96218.jpg"
                        alt="product-image"
                    />
                </div>
            )}
        </Slider>
        // <div className="imgslider">
        //     <Slider {...settings}>
        //
        //             <div key={data.id}>
        //                 <div className="text">
        //                     <h3>{data.title}</h3>
        //                     <h5 className="fw-normal">{data.text}</h5>
        //                 </div>
        //                 <img
        //                     src={data.imageCard} alt="product-image"
        //                 />
        //                 <video
        //                     autoPlay
        //                     muted
        //                     loop
        //                 >
        //                     <source src={data.video} />
        //                 </video>
        //
        //                 {
        //                     data.innerBlocks &&
        //                     data.innerBlocks.map(elem => (
        //                         <div
        //                             key={elem.id}
        //                             className={`content ${elem.location} ${elem.vertical ? "vert" : ""}`}
        //                         >
        //                             <div className="text">
        //                                 <h3>{elem.title}</h3>
        //                                 <h5 className="fw-normal">{elem.text}</h5>
        //                             </div>
        //
        //                             {
        //                                 elem.image ?
        //                                     <img
        //                                         src={elem.image}
        //                                         alt="product-image"
        //                                     />:
        //                                     <video
        //                                         autoPlay
        //                                         muted
        //                                         loop
        //                                     >
        //                                         <source src={elem.video} />
        //                                     </video>
        //
        //                             }
        //                         </div>
        //                     ))
        //                 }
        //
        //                 {
        //                     !data.innerBlocks &&
        //                     <div className="content">
        //                         <div className="text">
        //                             <h4>Страница</h4>
        //                             <p className="small">
        //                                 В стадии разработки...
        //                             </p>
        //                         </div>
        //
        //                         <img
        //                             src="https://www.yarkiy.ru//system/uploads/preview/good/27765/96218.jpg"
        //                             alt="product-image"
        //                         />
        //                     </div>
        //                 }
        //             </div>
        //         </Slider>
        // </div>
    );
};

export default ProductSlider;
