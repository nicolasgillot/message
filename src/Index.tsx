/**
 * Index page.
 */
import Message from 'containers/Message/Message';
import * as React from 'react';
import { Provider } from 'react-redux';
import store from 'store';

class Index extends React.PureComponent<{}, {}> {
  public render() {
    return (
      <Provider store={store()}>
        <Message />
      </Provider>
    );
  }
}

export { Index };
