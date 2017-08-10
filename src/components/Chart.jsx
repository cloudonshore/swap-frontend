import React from 'react'
import PropTypes from 'prop-types'
import {VictoryChart, VictoryAxis, VictoryTheme, VictoryLine, VictoryScatter} from 'victory'
import moment from 'moment'
import {getAdjustedRange} from '../utils'


const fontColor = "rgb(46, 154, 208)"
const axisStyle = {
    axis: {stroke: "rgb(46, 154, 208)"},
    axisLabel: {fontSize: 20, padding: 30, fill: fontColor},
    ticks: {stroke: fontColor, size: 5},
    tickLabels: {fontSize: 7, padding: 5, fill: fontColor},
    grid: {stroke: fontColor}
}

class Chart extends React.Component {
    static propTypes = {}

    constructor(props) {
        super(props)
    }
    render() {
        const {domain, chartData, chartDataAverages} = this.props

        return <VictoryChart
            domain={{x: domain, y: getAdjustedRange(chartData)}}
             domainPadding={10}
            scale={{x: 'time', y: 'linear'}}
            >
            <VictoryAxis
                tickFormat={(d) =>{return moment(d).format('hh:mm:ss')}}
                theme={VictoryTheme.material}
                style={axisStyle}
            />
            <VictoryAxis
                dependentAxis
                theme={VictoryTheme.material}
                style={axisStyle}
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
                    data: { stroke: "#c4426b", strokeDasharray: "5, 5", strokeWidth: 1, opacity: 1 },
                }}
                x="date"
                y="value"
                data={chartDataAverages}
            />
        </VictoryChart>
    }
}



export default Chart