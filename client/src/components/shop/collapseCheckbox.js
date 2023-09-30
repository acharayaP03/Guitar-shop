/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { ArrowDropUp, ArrowDropDown } from '@material-ui/icons'
import {
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Checkbox,
    Collapse,
} from '@material-ui/core'

const CollapseCheckbox = ({ initState, title, list, handleFilters }) => {
    const [open, setOpen] = useState(initState)
    const [checked, setChecked] = useState([])

    const handleCollapseOpen = () => {
        setOpen(!open)
    }
    const handleToggle = (value) => {
        const currentIndex = checked.indexOf(value)
        const newChecked = [...checked]
        if (currentIndex === -1) newChecked.push(value)
        else newChecked.splice(currentIndex, 1)

        setChecked(newChecked)
        handleFilters(newChecked)
    }

    const renderList = (list) =>
        list &&
        list.map((value) => (
            <ListItem key={value._id} style={{ padding: '10px 0' }}>
                <ListItemText primary={value.name} />
                <ListItemSecondaryAction>
                    <Checkbox
                        color="primary"
                        onChange={() => handleToggle(value._id)}
                        checked={checked.indexOf(value._id) !== -1}
                    />
                </ListItemSecondaryAction>
            </ListItem>
        ))

    return (
        <>
            <List style={{ borderBottom: '1px solid #dbdbdb' }}>
                <ListItem
                    onClick={() => handleCollapseOpen()}
                    style={{ padding: '10px 23px 10px 0' }}
                >
                    <ListItemText primary={title} className="collapse_title" />
                    {open ? <ArrowDropUp /> : <ArrowDropDown />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {renderList(list)}
                    </List>
                </Collapse>
            </List>
        </>
    )
}

export default CollapseCheckbox
