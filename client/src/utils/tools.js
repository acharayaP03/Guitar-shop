import React from 'react';
import { Link } from 'react-router-dom'


export const WavesButton = ( props ) =>{
    let template = '';

    switch (props.type){
        case 'default':
            template = <Link to={props.linkTo}
                             className={
                                !props.altClass ? 'link_default': props.altClass
                             }
                             style={{
                                 ...props.style
                             }}
            >
                { props.title }
            </Link>
            break;
        default:
            template='';
    }

    return template;
}