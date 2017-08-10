import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const cryptoBlue = "rgb(46, 154, 208)"
const background = "rgb(35, 35, 40)"

const Button = styled.a`
    background-color: ${props => props.selected ? cryptoBlue : 'transparent' };
    color: ${props => props.selected ? background : cryptoBlue };
    border: 1px solid ${cryptoBlue};
    padding: 6px 14px;
    font-size: 14px;
    cursor: pointer;
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