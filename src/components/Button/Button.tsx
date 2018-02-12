/**
 * Create a button with a "button" or "a" element
 * to retain the native click function.
 * Use a disabled attribute when a button can’t be clicked.
 */
import * as classnames from 'classnames';
import * as React from 'react';
import { IProps } from 'services/props';
import * as Utils from 'services/Utils';
import './Button.css';

export interface IButtonProps extends IProps {
  children?: React.ReactNode;
  variant?: 'neutral';
  onClick?(event: React.MouseEvent<HTMLElement>): void;
}

interface IDefaultProps {
  className: string;
}

type PropsWithDefaults = IButtonProps & IDefaultProps;

export default class Button extends React.PureComponent<IButtonProps, {}> {
  public static defaultProps: IDefaultProps = {
    className: '',
  };

  public render() {
    const { children, className, variant } = this.props;
    const buttonClassName = classnames(
      'c-button',
      { [`c-button--${variant}`]: variant != null },
      className
    );

    return (
      <button
        className={buttonClassName}
        onClick={this.handleClick}
        type="button"
      >
        {children}
      </button>
    );
  }

  private handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const { onClick } = this.props as PropsWithDefaults;

    Utils.safeInvoke(onClick, event);
  };
}
