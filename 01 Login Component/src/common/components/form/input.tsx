import * as React from 'react';
import { ValidationComponent } from './validation';
import TextField from 'material-ui/TextField';

interface Props {
  type: string;
  name: string;
  value: string | number;
  onChange: any;
  className?: string;
  label?: string;
  labelClassName?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
}

interface State {
  currentValue: string | number;
}

export class Input extends React.Component<Props, State> {
  state = {
    currentValue: this.props.value,
  };

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.value !== this.state.currentValue) {
      this.setState({ currentValue: nextProps.value });
    }
  }

  onChange = (event) => {
    const currentValue = event.target.value;
    this.setState({ currentValue });
    this.props.onChange(event.target.name, currentValue);
  }

  render() {
    return (
      <div className={this.props.className}>
        <ValidationComponent error={this.props.error}>
          <label htmlFor={this.props.name} className={this.props.labelClassName}>
            {this.props.label}
          </label>
          <TextField
            type={this.props.type}
            name={this.props.name}
            hintText={this.props.placeholder}
            value={this.state.currentValue}
            onChange={this.onChange}
            fullWidth={true}
            disabled={this.props.disabled}
          />
        </ValidationComponent>
      </div>
    );
  }
}
