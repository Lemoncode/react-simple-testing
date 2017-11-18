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
