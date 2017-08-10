import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const cryptoBlue = "rgb(46, 154, 208)"
const background = "rgb(35, 35, 40)"
const inactiveGray = "rgb(99, 99, 99)"

const Button = styled.a`
    background-color: ${props => props.selected ? cryptoBlue : 'transparent' };
    color: ${props => props.ready ? (props.selected ? background : cryptoBlue) : inactiveGray };
    border: 1px solid ${props => props.ready ? cryptoBlue : inactiveGray};
    padding: 10px 20px;
    display: inline-block;
    font-size: 14px;
    cursor: ${props => props.ready ? 'pointer' : 'initial' };
`

const SymbolButton = (props) => {
    const {text} = props
    return <Button {...props}>
        {text}
    </Button>
}

SymbolButton.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func,
    ready: PropTypes.bool,
    selected: PropTypes.bool
}

export default SymbolButton