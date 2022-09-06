import React from "react";
import { Table, Pagination, Modal, Button } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';

import Moment from "react-moment";
import { Loader} from "utils/tools";

const ProductTable = ({ products, prev, next, gotoEdit, removeModal, handleClose, handleModal, handleRemove }) =>{
    const goToPrevPage = (page) => {
        prev(page)
    }

    const goToNextPage = (page) => {
        next(page)
    }

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
                                    onClick={()=> handleModal(item._id)}
                                >
                                    Remove
                                </td>
                                <td className="action_btn edit_btn"
                                    onClick={()=>gotoEdit(item._id)}
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
                                <Pagination.Prev onClick={()=> goToPrevPage(products.prevPage)}/>
                                <Pagination.Item onClick={()=>goToPrevPage(products.prevPage)}>
                                    {products.prevPage}
                                </Pagination.Item>
                            </>
                            :null}
                        <Pagination.Item active>{products.page}</Pagination.Item>
                        { products.hasNextPage ?
                            <>

                                <Pagination.Item onClick={()=>goToNextPage(products.nextPage)}>
                                    {products.nextPage}
                                </Pagination.Item>
                                <Pagination.Next onClick={()=>goToNextPage(products.nextPage)}/>
                            </>
                            :null}
                    </Pagination>
                    <hr/>
                    <LinkContainer to="/dashboard/admin/add_products">
                        <Button variant="secondary">Add product</Button>
                    </LinkContainer>
                </>
                :
                <Loader/>
            }
            <Modal show={removeModal} onHide={handleClose}>
                <Modal.Header>Are you sure?</Modal.Header>
                <Modal.Body>There is no going back.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Opps, close this now!!
                    </Button>
                    <Button variant="danger" onClick={() => handleRemove}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ProductTable;