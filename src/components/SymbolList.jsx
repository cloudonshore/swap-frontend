import React from 'react'
import PropTypes from 'prop-types'

class SymbolList extends React.PureComponent {
    static propTypes = {}

    constructor(props) {
        super(props)
    }

    state = {}

    render() {
        const {activeSymbol, chartData} = this.props
        const [readySymbols, otherSymbols] = _.partition(SYMBOLS, symbol => {
            return dataReadyForDisplay(chartData[symbol])
        })

        const sortedReadySymbols = _.sortBy(readySymbols, symbol => _.get(chartData[symbol], '0.value')).reverse()
        const readySymbolButtons = _.map(sortedReadySymbols, symbol => {
            return <SymbolButton
                onClick={() => this.setState({activeSymbol: symbol})}
                text={symbol}
                ready={true}
                selected={symbol === activeSymbol ? true : false}
                key={symbol}
            />
        })

        const otherSymbolButtons = _.map(otherSymbols, symbol => {
            return <SymbolButton
                text={symbol}
                ready={false}
                active={false}
                key={symbol}
            />
        })

        return <div>
            <div>ready</div>
            {readySymbolButtons}
            <div>waiting for ticker data</div>
            {otherSymbolButtons}
        </div>
    }
}

export default SymbolList