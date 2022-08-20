import React from 'react';
import { Link } from 'react-router-dom'
import AddShoppingCartOutlined from "@material-ui/icons/AddShoppingCartOutlined";
import {CircularProgress} from "@material-ui/core";

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
        case 'bag_link':
            template = <div
                className="bag_link"
                onClick={() => {
                        props.runAction()
                    }
                }
                style={{ ...props.style }}
            >
                <AddShoppingCartOutlined style={{ fontSize: props.iconSize }} />
            </div>
            break;
        default:
            template='';
    }

    return template;
}

export const renderCardImage = (image) => {
    if(image.length > 0){
        return image[0]
    }else{
        return '/images/image_not_availble.png'
    }
}

export const Loader = ({ full }) => (
    <div className={`root_loader ${full ? 'full': ''}`}>
        <CircularProgress />
    </div>
)