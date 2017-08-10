import React from 'react'
import PropTypes from 'prop-types'
import {VictoryChart, VictoryAxis, VictoryTheme, VictoryLine, VictoryLegend} from 'victory'
import moment from 'moment'
import {getAdjustedRange, getMinDate} from '../utils'


const fontColor = "rgb(46, 154, 208)"
const axisStyle = {
    axis: {stroke: "rgb(46, 154, 208)"},
    ticks: {stroke: fontColor, size: 5},
    tickLabels: {fontSize: 5, padding: 5, fill: fontColor},
    grid: {stroke: fontColor}
}

const averageLineStyle = { stroke: "#c4426b", strokeDasharray: "5, 5", strokeWidth: 1, opacity: 1 }

class Chart extends React.Component {
    static propTypes = {
        chartData: PropTypes.array,
        chartDataAverages: PropTypes.array,
        symbol: PropTypes.string
    }

    constructor(props) {
        super(props)
        this.state = {
            endTime: Date.now()
        }
        this.updateInterval = setInterval(() => {
            this.setState({endTime: Date.now()})
        }, 100)
    }

    componentWillUnmount(){
        clearInterval(this.updateInterval)
    }


    render() {
        const {chartData, chartDataAverages, symbol} = this.props
        const {endTime} = this.state
        return <VictoryChart
            domain={{x: [getMinDate(chartData), endTime], y: getAdjustedRange(chartData)}}
             domainPadding={10}
            scale={{x: 'time', y: 'linear'}}
            >
            <VictoryAxis
                tickFormat={(d) =>{return moment(d).format('hh:mm:ss')}}
                theme={VictoryTheme.material}
                style={{axisLabel: {fontSize: 8, padding: 20, fill: fontColor}, ...axisStyle}}
                label="Time"
            />
            <VictoryAxis
                dependentAxis
                tickFormat={(d) =>{return moment(d).format('hh:mm:ss')}}
                theme={VictoryTheme.material}
                style={{axisLabel: {fontSize: 8, padding: 40, fill: fontColor}, ...axisStyle}}
                label={symbol}
            />
            <VictoryLine
                style={{
                    data: { stroke: "#b7e5ff", strokeWidth: 1, opacity: 1  },
                }}
                x="date"
                y="value"
                data={chartData}
            />
            <VictoryLine
                style={{
                    data: averageLineStyle,
                }}
                x="date"
                y="value"
                data={chartDataAverages}
            />
        </VictoryChart>
    }
}



export default Chart