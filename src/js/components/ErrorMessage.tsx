import * as React from 'react';

interface Props {
  message: string;
}

const ErrorMessage: React.FC<Props> = (props) => {
  return <span className="errorMassage">{props.message}</span>;
};

export default ErrorMessage;
