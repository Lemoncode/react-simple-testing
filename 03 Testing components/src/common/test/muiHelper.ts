import { mount } from 'enzyme';
import { object } from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export const mountMuiWithContext = (node) => mount(node, {
  context: {
    muiTheme: getMuiTheme(),
  },
  childContextTypes: {
    muiTheme: object.isRequired,
  },
});
