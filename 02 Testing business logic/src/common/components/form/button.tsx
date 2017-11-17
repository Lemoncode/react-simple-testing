import * as React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

interface Props {
  type: string;
  onClick: any;
  wrapperClassName?: string;
  buttonClassName?: string;
  label?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export const Button: React.StatelessComponent<Props> = (props) => (
  <div className={props.wrapperClassName}>
    <RaisedButton
      type={props.type}
      className={props.buttonClassName}
      label={props.label}
      icon={props.icon}
      fullWidth={true}
      primary={true}
      onClick={onClick(props)}
    />
  </div>
);

const onClick = (props: Props) => (e) => {
  e.preventDefault();
  props.onClick();
};
