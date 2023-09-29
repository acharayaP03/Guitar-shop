import React from 'react'
import { Pagination, Button } from 'react-bootstrap'

const PaginationComponent = ({ products, prevPage, nextPage, resetSearch }) => {
    const goToPrevPage = (page) => {
        console.log('page', page)
        prevPage(page)
    }
    const goToNextPage = (page) => {
        nextPage(page)
    }
    return (
        <>
            {products.docs.length > 0 ? (
                <Pagination>
                    {products.hasPrevPage ? (
                        <>
                            <Pagination.Prev
                                onClick={() => goToPrevPage(products.prevPage)}
                            />
                            <Pagination.Item
                                onClick={() => goToPrevPage(products.prevPage)}
                            >
                                {products.prevPage}
                            </Pagination.Item>
                        </>
                    ) : null}
                    <Pagination.Item active>{products.page}</Pagination.Item>
                    {products.hasNextPage ? (
                        <>
                            <Pagination.Item
                                onClick={() => goToNextPage(products.nextPage)}
                            >
                                {products.nextPage}
                            </Pagination.Item>
                            <Pagination.Next
                                onClick={() => goToNextPage(products.nextPage)}
                            />
                        </>
                    ) : null}
                </Pagination>
            ) : (
                <div>
                    <Button
                        className="mt-3"
                        variant="primary"
                        onClick={resetSearch}
                    >
                        Reset search
                    </Button>
                </div>
            )}
        </>
    )
}

export default PaginationComponent
