import React, {Component} from 'react';
import _ from 'lodash'
import styled from 'styled-components'


import Chart from './Chart'
import SymbolList from './SymbolList'
import {subscribeToTicker, unSubscribeToTicker} from '../API'
import {dataReadyForDisplay} from '../utils'

const timeInterval = 60 * 1000; // 1 minute
const MA = require('moving-average');


const movingAverages = {}
const chartData = {}
const chartDataAverages = {}

const AppDiv = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px;
`

const LoadingMessage = styled.div`
    font-size: 50px;
    align-self: center;
    justify-self: center;
    flex-grow: 1;
    text-align: center;
    position: relative;
`


class App extends Component {
    state = {}

    constructor(props) {
        super(props)
        subscribeToTicker(this.updateMovingAverages.bind(this))
        this.throttledForceUpdate = _.throttle(this.forceUpdate.bind(this), 500) //forceUpdate is throttled so if many ticker packets get sent simultaniously the UI won't get laggy
    }

    componentWillUnmount() {
        unSubscribeToTicker()
    }

    //because of the number of ticker packets that can return simultaniously, forceUpdate with extenal variables is used instead of setState (for performance reasons).
    // Immutable data structures could also solve this issue
    updateMovingAverages(tickerResult) {
        const [symbolPair, rawValue] = tickerResult
        const value = parseFloat(rawValue)
        if (_.isUndefined(movingAverages[symbolPair])) {
            movingAverages[symbolPair] = MA(timeInterval)
            chartData[symbolPair] = []
            chartDataAverages[symbolPair] = []
        }

        const now = Date.now()

        movingAverages[symbolPair].push(now, value)
        chartData[symbolPair].push({
            date: now,
            value
        })
        chartDataAverages[symbolPair].push({
            date: now,
            value: movingAverages[symbolPair].movingAverage()
        })

        if (!this.state.activeSymbol && dataReadyForDisplay(chartData[symbolPair])) {
            this.setState({activeSymbol: symbolPair})
        }
        this.throttledForceUpdate()
    }

    renderMovingAverages() {
        const {activeSymbol} = this.state
        if (!_.every([activeSymbol, chartData[activeSymbol]]) || chartData[activeSymbol].length < 2)
            return <LoadingMessage>
                Waiting for ticker data from Poloniex
                <br/>
                <div className="spinner" />
            </LoadingMessage>

        return <Chart
            chartData={chartData[activeSymbol]}
            chartDataAverages={chartDataAverages[activeSymbol]}
            symbol={activeSymbol}
        />
    }

    render() {
        const {loadingSymbols} = this.props
        const {activeSymbol} = this.state;
        return <AppDiv>
            <SymbolList
                activeSymbol={activeSymbol}
                chartData={chartData}
                selectSymbol={(symbol) => this.setState({activeSymbol: symbol})}
            />
            {loadingSymbols ? "loading..." : this.renderMovingAverages()}
        </AppDiv>
    }
}


export default App;
