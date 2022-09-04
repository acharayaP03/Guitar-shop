import React from "react";
import { Table, Pagination, Modal, Button } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';

import Moment from "react-moment";
import { Loader} from "utils/tools";

const ProductTable = ({ products }) =>{

    return(
        <>
            { products && products.docs ?
                <>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>
                                Created
                            </th>
                            <th>
                                Model
                            </th>
                            <th>Available</th>
                        </tr>
                        </thead>
                        <tbody>
                        {products.docs.map((item) => (
                            <tr key={item._id}>
                                <td><Moment to={item.date}></Moment></td>
                                <td>{item.model}</td>
                                <td>{item.available}</td>
                                <td className="action_btn remove_btn"
                                    onClick={()=>alert('REMOVE')}
                                >
                                    Remove
                                </td>
                                <td className="action_btn edit_btn"
                                    onClick={()=>alert('edit')}
                                >
                                    Edit
                                </td>
                            </tr>
                        ))
                        }
                        </tbody>
                    </Table>
                    <Pagination>
                        { products.hasPrevPage ?
                            <>
                                <Pagination.Prev onClick={()=>alert('prev')}/>
                                <Pagination.Item onClick={()=>alert('go to prev')}>
                                    {products.prevPage}
                                </Pagination.Item>
                            </>
                            :null}
                        <Pagination.Item active>{products.page}</Pagination.Item>
                        { products.hasNextPage ?
                            <>

                                <Pagination.Item onClick={()=>alert('go to next')}>
                                    {products.nextPage}
                                </Pagination.Item>
                                <Pagination.Next onClick={()=>alert('next')}/>
                            </>
                            :null}
                    </Pagination>
                </>
                :
                <Loader/>
            }
        </>
    )
}

export default ProductTable;