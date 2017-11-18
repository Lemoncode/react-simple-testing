## 03 Testing components

In this sample we are going to add unit tests. In this case, we will test all necessary app components.

Summary steps:

- Install `enzyme-adapter-react-16` and configure it.
- Add `common` components specs.

# Steps to build it

## Prerequisites

- In order to follow this step guides you will also need to take sample _02 Testing business logic_ as starting point.

# Steps

- From `enzyme` 3.0.0, we need to add some special configuration to work with different `react` version. Enzyme use `Adapters`:

```bash
npm install enzyme-adapter-react-16 --save-dev
```

- We need to configure in the `setup` spec files that it's our starting test point:

### ./config/karma/spec.bundle.js

```diff
require('babel-polyfill');

+ const enzyme = require('enzyme');
+ const Adapter = require('enzyme-adapter-react-16');
+ enzyme.configure({ adapter: new Adapter() });

const testsContext = require.context('../../src', true, /.spec$/);
testsContext.keys().forEach(testsContext);

const componentsContext = require.context('../../src', true, /.ts$/);
componentsContext.keys().forEach(componentsContext);

```

- Now, for testing component implemented by `material-ui` we need to add a `helper` for mount that component with the `muiTheme`. We need to install the lib `prop-types` too, this time as `dev dependency`:

```bash
npm install prop-types --save-dev
```

### ./src/common/test/muiHelper.ts

```javascript
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

```

### ./src/common/test/index.ts

```javascript
export * from './muiHelper';

```

- Add `common` components specs:

### ./src/common/components/form/input.spec.tsx

```javascript
import * as React from 'react';
import { shallow } from 'enzyme';
import { mountMuiWithContext } from '../../test';
import { ValidationComponent } from './validation';
import TextField from 'material-ui/TextField';
import { Input } from './input';

describe('common/Input component', () => {
  it('should render as expected', () => {
    // Arrange
    const props = {
      type: 'Test type',
      name: 'Test name',
      value: 'Test value',
      onChange: () => { },
    };

    // Act
    const component = shallow(
      <Input {...props} />,
    );

    // Assert
    expect(component.find('label').prop('htmlFor')).to.equal(props.name);

    expect(component.find('TextField').prop('type')).to.equal(props.type);
    expect(component.find('TextField').prop('name')).to.equal(props.name);
    expect(component.find('TextField').prop('value')).to.equal(props.value);
  });

  it('should render as expected with optional properties', () => {
    // Arrange
    const props = {
      type: 'Test type',
      name: 'Test name',
      value: 'Test value',
      onChange: () => { },
      wrapperClassName: 'col-lg-3',
      label: 'Test label',
      labelClassName: 'test-classname',
      placeholder: 'Test placeholder',
      error: 'Test error',
      disabled: true,
    };

    // Act
    const component = shallow(
      <Input {...props} />,
    );

    // Assert
    expect(component.find('div').prop('className')).to.equal(props.wrapperClassName);

    expect(component.find(ValidationComponent).prop('error')).to.equal(props.error);

    expect(component.find('label').prop('htmlFor')).to.equal(props.name);
    expect(component.find('label').text()).to.equal(props.label);
    expect(component.find('label').prop('className')).to.equal(props.labelClassName);

    expect(component.find('TextField').prop('type')).to.equal(props.type);
    expect(component.find('TextField').prop('name')).to.equal(props.name);
    expect(component.find('TextField').prop('value')).to.equal(props.value);
    expect(component.find('TextField').prop('hintText')).to.equal(props.placeholder);
    expect(component.find('TextField').prop('disabled')).to.equal(props.disabled);
  });

  it('should trigger onChange and propagate property', () => {
    // Arrange
    const props = {
      name: 'Test name',
      label: 'Test label',
      value: 'Test value',
      type: 'Test type',
      onChange: sinon.spy(),
      placeholder: 'Test placeholder',
    };

    // Act
    const component = mountMuiWithContext(
      <Input {...props} />,
    );

    component.find(TextField).find('input').simulate('change');

    // Assert
    expect(props.onChange.called).to.be.true;
    expect(props.onChange.calledWith('Test name', 'Test value')).to.be.true;
  });
});

```

### ./src/common/components/form/button.spec.tsx

```javascript
import * as React from 'react';
import { shallow } from 'enzyme';
import { mountMuiWithContext } from '../../test';
import RaisedButton from 'material-ui/RaisedButton';
import { Button } from './button';

describe('common/Button component', () => {
  it('should render as expected', () => {
    // Arrange
    const props = {
      type: 'test type',
      onClick: () => { },
    };

    // Act
    const component = shallow(
      <Button {...props} />,
    );

    // Assert
    expect(component.find('RaisedButton').prop('type')).to.be.equal(props.type);
    expect(component.find('RaisedButton').prop('fullWidth')).to.be.true;
    expect(component.find('RaisedButton').prop('primary')).to.be.true;
  });

  it('should render as expected with optional properties', () => {
    // Arrange
    const props = {
      type: 'test type',
      onClick: () => { },
      wrapperClassName: 'test wrapperClassName',
      buttonClassName: 'test buttonClassName',
      label: 'test label',
      icon: <div><img src="test" /></div>,
      disabled: true,
    };

    // Act
    const component = shallow(
      <Button {...props} />,
    );

    // Assert
    expect(component.find('div').prop('className')).to.be.equal(props.wrapperClassName);

    expect(component.find('RaisedButton').prop('type')).to.be.equal(props.type);
    expect(component.find('RaisedButton').prop('className')).to.be.equal(props.buttonClassName);
    expect(component.find('RaisedButton').prop('label')).to.be.equal(props.label);
    expect(component.find('RaisedButton').prop('icon')).to.be.equal(props.icon);
    expect(component.find('RaisedButton').prop('fullWidth')).to.be.true;
    expect(component.find('RaisedButton').prop('primary')).to.be.true;
  });

  it('should trigger onClick and propagate property', () => {
    // Arrange
    const props = {
      type: 'test type',
      onClick: sinon.spy(),
    };

    // Act
    const component = mountMuiWithContext(
      <Button {...props} />,
    );

    const button = component.find(RaisedButton).find('button').simulate('click');

    // Assert
    expect(props.onClick.calledOnce).to.be.true;
  });
});

```

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us. 
