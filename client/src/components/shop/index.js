/* eslint-disable no-unused-vars */
import React, { useEffect, useReducer, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductByPaginate } from 'store/actions/products.action'
import { getAllBrands } from 'store/actions/brands.actions'
import Card from '../../utils/products/card.container'
import PaginationComponent from 'utils/products/pagination'
import SearchBar from './searchBar'
import RangeSelect from './rangeSelect'
import CollapseCheckbox from './collapseCheckbox'
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

    const frets = [
        { _id: 20, name: 20 },
        { _id: 21, name: 21 },
        { _id: 22, name: 22 },
        { _id: 24, name: 24 },
    ]

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
            page: 1,
        })

    const handleKeywords = (values) => {
        setSearchValues({ keywords: values, page: 1 })
    }

    const handleFilters = (filters, category) => {
        const newSearchValues = { ...searchValues }
        newSearchValues[category] = filters

        if (category === 'brand') {
            setSearchValues({ brand: filters, page: 1 })
        }

        if (category === 'frets') {
            setSearchValues({ frets: filters, page: 1 })
        }
        setSearchValues(newSearchValues)
    }

    const handleRange = (values) => {
        console.log(values)
        setSearchValues({ min: values[0], max: values[1], page: 1 })
    }
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
                <div className="container">
                    <SearchBar
                        handleKeywords={(values) => handleKeywords(values)}
                    />
                </div>
            </div>
            <div className="container">
                <div className="shop_wrapper">
                    <div className="left">
                        <CollapseCheckbox
                            initState={true}
                            title="Brands"
                            list={brands.all}
                            handleFilters={(filters) =>
                                handleFilters(filters, 'brand')
                            }
                        />

                        <CollapseCheckbox
                            initState={false}
                            title="Frets"
                            list={frets}
                            handleFilters={(filters) => {
                                handleFilters(filters, 'frets')
                            }}
                        />
                        <RangeSelect
                            title="Price Range"
                            initState={false}
                            handleRange={(values) => handleRange(values)}
                        />
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
                                        <PaginationComponent
                                            products={byPaginate}
                                            prevPage={(page) => goToPage(page)}
                                            nextPage={(page) => goToPage(page)}
                                            resetSearch={() =>
                                                handleResetSearch()
                                            }
                                        />
                                    </>
                                ) : null}
                            </div>
                        </div>
                        <div>
                            <div className="shop_pagination"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shop
