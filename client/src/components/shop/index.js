/* eslint-disable no-unused-vars */
import React, { useEffect, useReducer, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductByPaginate } from 'store/actions/products.action'
import { getAllBrands } from 'store/actions/brands.actions'
import Card from '../../utils/products/card.container'
import PaginationComponent from 'utils/products/pagination'
// eslint-disable-next-line no-unused-vars
import GridOff from '@material-ui/icons/GridOff'
import GridOn from '@material-ui/icons/GridOn'

const Shop = () => {
    const defaultValues = {
        keywords: '',
        brand: [],
        min: 0,
        max: 5000,
        frets: [],
        page: 1,
    }
    const [grid, setGrid] = useState(false)
    const [searchValues, setSearchValues] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        defaultValues
    )

    const { byPaginate } = useSelector((state) => state.products)

    const brands = useSelector((state) => state.brands)
    const dispatch = useDispatch()

    const goToPage = (page) => {
        setSearchValues({ page })
    }
    const handleGridAction = () => setGrid(!grid)

    const handleResetSearch = () =>
        setSearchValues({
            keywords: '',
        })
    useEffect(() => {
        dispatch(getAllBrands())
    }, [dispatch])

    //look for search change
    useEffect(() => {
        dispatch(getProductByPaginate(searchValues))
    }, [searchValues, dispatch])
    return (
        <div className="page_container">
            <div className="page_top">
                <div className="container">FORM</div>
            </div>
            <div className="container">
                <div className="shop_wrapper">
                    <div className="left">
                        collapse brand collapse frets collapse price
                    </div>
                    <div className="right">
                        <div className="shop_options">
                            <div className="shop_grids clear">
                                <div
                                    className={`grid_btn ${
                                        grid ? '' : 'active'
                                    }`}
                                    onClick={() => handleGridAction()}
                                >
                                    <GridOn />
                                </div>
                                <div
                                    className={`grid_btn ${
                                        !grid ? '' : 'active'
                                    }`}
                                    onClick={() => handleGridAction()}
                                >
                                    <GridOff />
                                </div>
                            </div>
                            <div>
                                {byPaginate && byPaginate.docs ? (
                                    <>
                                        <Card
                                            grid={grid}
                                            items={byPaginate.docs}
                                            shop={true}
                                        />
                                    </>
                                ) : null}
                            </div>
                        </div>
                        <div>
                            <div className="shop_pagination">
                                <PaginationComponent
                                    products={byPaginate}
                                    prevPage={(page) => goToPage(page)}
                                    nextPage={(page) => goToPage(page)}
                                    resetSearch={() => handleResetSearch()}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shop
