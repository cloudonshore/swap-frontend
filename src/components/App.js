import React, {Component} from 'react';
import _ from 'lodash'
import Chart from './Chart'
import SymbolButton from './SymbolButton'

import {SYMBOLS} from '../config'
import {dataReadyForDisplay} from '../utils'
import {subscribeToTicker} from '../API'


const timeInterval = 60 * 1000; // 1 minute
const MA = require('moving-average');


const movingAverages = {}
const chartData = {}
const chartDataAverages = {}


class App extends Component {
    state = {}

    constructor(props) {
        super(props)
        subscribeToTicker(this.updateMovingAverages.bind(this))
    }

    componentWillUnmount() {
        clearInterval(this.updateInterval)
    }


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

        if (!this.state.activeSymbol && chartData[symbolPair].length >= 2) {
            this.setState({activeSymbol: symbolPair})
        }

        if (!this.state.startTime) {
            this.setState({startTime: now})
            this.updateInterval = setInterval(() => {
                this.setState({endTime: Date.now()})
            }, 50)
        }
    }

    renderMovingAverages() {
        const {startTime, endTime, activeSymbol} = this.state
        if (!_.every([activeSymbol, chartData[activeSymbol], startTime, endTime]) || chartData[activeSymbol].length < 2)
            return <div>loading chart</div>

        return <Chart
            domain={[startTime, endTime]}
            chartData={chartData[activeSymbol]}
            chartDataAverages={chartDataAverages[activeSymbol]}/>
    }

    renderSymbolButtons() {

    }

    render() {
        const {loadingSymbols} = this.props
        return <div className="App" style={{width: "75%", margin: "100px auto"}}>
            {this.renderSymbolButtons()}
            {loadingSymbols ? "loading..." : this.renderMovingAverages()}

        </div>
    }
}


export default App;
