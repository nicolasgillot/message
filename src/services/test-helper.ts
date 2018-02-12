/**
 * Enzyme test helper.
 */
import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { IntlProvider } from 'react-intl';
import * as messages from 'translations/messages.json';

// Create the IntlProvider to retrieve context for wrapping around.
const intlProvider: any = new IntlProvider({ locale: 'en-GB', messages }, {});
const { intl } = intlProvider.getChildContext();

configure({ adapter: new Adapter() });

export { intl };
