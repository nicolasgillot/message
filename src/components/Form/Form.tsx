/**
 * Form represents a document section that contains interactive controls
 * to submit information to a web server.
 */
import * as classnames from 'classnames';
import * as React from 'react';
import { IProps } from 'services/props';
import './Form.css';

interface IFormProps extends IProps {
  children?: React.ReactNode;
  variant?: 'compound' | 'horizontal' | 'inline' | 'stacked';
}

export default class Form extends React.PureComponent<IFormProps, {}> {
  public static defaultProps: Partial<IFormProps> = {
    variant: 'stacked',
  };

  public render() {
    const { children, className, variant } = this.props;
    const formClassNames = classnames(`c-form--${variant}`, className);

    return <form className={formClassNames}>{children}</form>;
  }
}
