/**
 * Root React component.
 */
import * as React from 'react';
import { IntlProvider } from 'react-intl';
import messages from 'translations/messages.json';

class Root extends React.PureComponent<{}, {}> {
  public render() {
    const { children } = this.props;

    return (
      <IntlProvider locale="en-GB" messages={messages}>
        {children}
      </IntlProvider>
    );
  }
}

export { Root };
