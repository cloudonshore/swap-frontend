import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';


const rootEl = document.getElementById('root')
ReactDOM.render(<App />, rootEl);
registerServiceWorker();

if (module.hot) {
    module.hot.accept('./components/App', () => {
        const NextApp = require('./components/App').default
        ReactDOM.render(
            <NextApp />,
            rootEl
        )
    })
}