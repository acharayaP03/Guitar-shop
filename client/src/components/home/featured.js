
import React from 'react';
import Carousel from 'utils/carousel'

const Featured = () => {

    const corouselItems = [
        {
            img:'/images/featured/featured_home.jpg',
            lineOne:'Fender',
            lineTwo:'Custom shop',
            lineTitle:'Show Now',
            linkTo:'/shop'
        },
        {
            img:'/images/featured/featured_home_2.jpg',
            lineOne:'B-Stock',
            lineTwo:'Awesome discounts',
            lineTitle:'View offers',
            linkTo:'/shop'
        },
        {
            img:'/images/featured/featured_home_3.jpg',
            lineOne:'B-Stock 2',
            lineTwo:'Awesome discounts',
            lineTitle:'View offers',
            linkTo:'/shop'
        }
    ]


    return(
        <div className="featured_container">
            <Carousel items={corouselItems}/>
        </div>
    )
}

export default Featured;