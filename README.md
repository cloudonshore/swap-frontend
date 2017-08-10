## Poloniex Moving Average

I expanded on the assignment some and turned it into an app.
In the interface, real time ticker data is graphed along side the moving average for each currency pair.

### Project structure
The non-boilerplate code is in `src`, and the majority of the work is done by the react components in `src/components`.

### Future work
If I were to expand on this app, I would:
* add a state managment system, like Redux
* add some sort of type safety, like tcomb
* add a ledgend to the chart
* add more robust error handling for dropped socket connections