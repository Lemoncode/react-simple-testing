import { shallow, mount } from 'enzyme';
import * as React from 'react';
import { ValidationComponent } from './validation';
import { Input } from './input';
import TextField from 'material-ui/TextField';
import { mountMuiWithContext } from '../../test/muiHelper';

describe('common/Input component', () => {
  it('should renders as expected', () => {
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

  it('should renders as expected with optional properties', () => {
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

  it('Should trigger onChange and propagate property', () => {
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
