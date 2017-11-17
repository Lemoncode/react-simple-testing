import * as React from 'react';

interface Props {
  error?: string;
}

export const ValidationComponent: React.StatelessComponent<Props> = (props) => {
  let wrapperClass: string = 'form-group clearfix';
  if (Boolean(props.error) && props.error.length > 0) {
    wrapperClass = `${wrapperClass} has-error`;
  }

  return (
    <div className={wrapperClass}>
      {props.children}
      <div className="help-block">
        {props.error}
      </div>
    </div>
  );
};
