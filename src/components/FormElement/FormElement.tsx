/**
 * FormElement is a wrapper for each element of a form.
 */
import * as classnames from 'classnames';
import * as React from 'react';
import { IProps } from 'services/props';
import './FormElement.css';

export interface IFormElementProps extends IProps {
  children?: React.ReactNode;
  controlClassName?: string;
  error?: string;
  hasLeftIcon?: boolean;
  hasRightIcon?: boolean;
  helpText?: string;
  id: string;
  label?: string;
  labelTag?: 'label' | 'span';
  required?: boolean;
}

interface IDefaultProps {
  controlClassName: string;
  hasLeftIcon: boolean;
  hasRightIcon: boolean;
  labelTag: 'label' | 'span';
  required: boolean;
}

type PropsWithDefaults = IFormElementProps & IDefaultProps;

export default class FormElement extends React.Component<
  IFormElementProps,
  {}
> {
  public static defaultProps: IDefaultProps = {
    controlClassName: '',
    hasLeftIcon: false,
    hasRightIcon: false,
    labelTag: 'label',
    required: false,
  };

  public renderControl() {
    const { children, controlClassName, hasLeftIcon, hasRightIcon } = this
      .props as PropsWithDefaults;
    const elementControlClassName = classnames(
      'c-form-element__control',
      {
        'c-input-has-icon': hasLeftIcon || hasRightIcon,
        'c-input-has-icon--left': hasLeftIcon && !hasRightIcon,
        'c-input-has-icon--left-right': hasLeftIcon && hasRightIcon,
        'c-input-has-icon--right': hasRightIcon && !hasLeftIcon,
      },
      controlClassName
    );

    return <div className={elementControlClassName}>{children}</div>;
  }

  public renderLabel() {
    const { label, labelTag: Tag, id, required } = this
      .props as PropsWithDefaults;
    const props: { htmlFor?: string } = {};

    if (Tag === 'label') {
      props.htmlFor = id;
    }

    return label != null || required ? (
      <Tag className="c-form-element__label" {...props}>
        {this.renderRequired()}
        {label}
      </Tag>
    ) : null;
  }

  public renderHelp() {
    const { error, helpText } = this.props;
    const text = error == null ? helpText : error;

    return text == null ? null : (
      <span className="c-form-element__help">{text}</span>
    );
  }

  public renderRequired() {
    const { required } = this.props as PropsWithDefaults;

    return required ? <abbr className="required">*</abbr> : null;
  }

  public render() {
    const { className, error } = this.props;
    const elementClassName = classnames(
      'c-form-element',
      { 'has-error': error != null },
      className
    );

    return (
      <div className={elementClassName}>
        {this.renderLabel()}
        {this.renderControl()}
        {this.renderHelp()}
      </div>
    );
  }
}
