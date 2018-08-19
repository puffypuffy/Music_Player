import React from 'react'
import { render } from 'react-dom';
import {AppContainer} from 'react-hot-loader'
import Root from './root.js'

render (
  <AppContainer>
    <Root />
  </AppContainer>, document.getElementById('root')
);


if (module.hot){
  module.hot.accept('./root.js', () => {
    const NewRoot = require('./root.js').default;
    render(
      <AppContainer>
        <NewRoot />
      </AppContainer>, document.getElementById('root')
    )

  });
}
