import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import styled from 'styled-components'
import SymbolButton from './SymbolButton'
import {SYMBOLS} from '../config'
import {dataReadyForDisplay} from '../utils'

const inactiveGray = "rgb(99, 99, 99)"
const cryptoBlue = "rgb(46, 154, 208)"


const List = styled.div`
    height: 50px;
    width: 200px;
`

const SymbolListDiv = styled.div`
    height: 100vh;
    overflow: scroll;
`

const ListTitles = styled.div`
    font-size: 18px;
    margin-bottom: 5px;
    color: ${props => props.active ? cryptoBlue : inactiveGray  }
`

class SymbolList extends React.PureComponent {
    static propTypes = {
        activeSymbol: PropTypes.string,
        chartData: PropTypes.object,
        selectSymbol: PropTypes.func
    }

    render() {
        const {activeSymbol, chartData, selectSymbol} = this.props
        const [readySymbols, otherSymbols] = _.partition(SYMBOLS, symbol => {
            return dataReadyForDisplay(chartData[symbol])
        })
        const sortedReadySymbols = _.sortBy(readySymbols, symbol => _.get(chartData[symbol], '0.value')).reverse()
        const readySymbolButtons = _.map(sortedReadySymbols, symbol => {
            return <List key={symbol}>
                <SymbolButton
                    onClick={selectSymbol.bind(null, symbol)}
                    text={symbol}
                    ready={true}
                    selected={symbol === activeSymbol ? true : false}
                />
            </List>
        })

        const otherSymbolButtons = _.map(otherSymbols, symbol => {
            return <List key={symbol}>
                <SymbolButton
                    text={symbol}
                    ready={false}
                    active={false}
                />
            </List>
        })

        return <SymbolListDiv>
            <ListTitles active>{readySymbolButtons.length ? 'Currency Pairs' : null}</ListTitles>
            {readySymbolButtons}
            <ListTitles>Waiting for Ticker Data</ListTitles>
            {otherSymbolButtons}
        </SymbolListDiv>
    }
}

export default SymbolList