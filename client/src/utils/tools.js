import React from 'react';
import { Link } from 'react-router-dom'
import AddShoppingCartOutlined from "@material-ui/icons/AddShoppingCartOutlined";
import {CircularProgress} from "@material-ui/core";
import { toast } from 'react-toastify';

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
/**
 * Loader when request is sent..
 * @param full
 * @returns {JSX.Element}
 * @constructor
 */
export const Loader = ({ full }) => (
    <div className={`root_loader ${full ? 'full': ''}`}>
        <CircularProgress />
    </div>
);

/**
 * Toast to show notifications..
 * @param type
 * @param msg
 * @returns {boolean}
 */
export const showToast = (type, msg) => {

    switch(type){
        case 'SUCCESS':
            toast.success(msg,{
                position:toast.POSITION.BOTTOM_RIGHT
            })
            break;
        case 'ERROR':
            toast.error(msg,{
                position:toast.POSITION.BOTTOM_RIGHT
            })
            break;
        default:
            return false
    }
}

export const errorHelper = (formik, value) =>({
    error: formik.errors[value] && formik.touched[value] ? true : false,
    helperText: formik.errors[value] && formik.touched[value] ? formik.errors[value] : null
})