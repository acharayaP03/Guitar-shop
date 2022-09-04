
import React from 'react';
import Carousel from 'utils/carousel'

const Featured = () => {

    const corouselItems = [
        {
            img:'/images/featured/unsplash.jpeg',
            lineOne:'Fender',
            lineTwo:'Custom shop',
            linkTitle:'Show Now',
            linkTo:'/shop'
        },
        {
            img:'/images/featured/featured_home_2.jpg',
            lineOne:'B-Stock',
            lineTwo:'Awesome discounts',
            linkTitle:'View offers',
            linkTo:'/shop'
        },
        {
            img:'/images/featured/featured_home_3.jpg',
            lineOne:'B-Stock 2',
            lineTwo:'Awesome discounts',
            linkTitle:'View offers',
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