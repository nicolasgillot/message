/**
 * Multi-line plain-text editing control.
 */
import * as classnames from 'classnames';
import FormElement from 'components/FormElement';
import * as React from 'react';
import { IProps } from 'services/props';
import * as Utils from 'services/Utils';
import * as uuid from 'uuid';
import './Textarea.css';

interface ITextareaProps extends IProps {
  disabled?: boolean;
  error?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  onBlur?(value: string): void;
  onChange?(value: string): void;
  onFocus?(value: string): void;
  textareaRef?(ref: HTMLTextAreaElement): any;
}

export default class Textarea extends React.PureComponent<ITextareaProps, {}> {
  public static defaultProps: Partial<ITextareaProps> = {
    disabled: false,
    required: false,
  };

  private textareaElement: HTMLTextAreaElement = document.createElement(
    'textarea'
  );
  private id: string = `textarea-${uuid()}`;

  public render() {
    const {
      className,
      disabled,
      error,
      label,
      placeholder,
      required,
      value,
    } = this.props;
    const textareaClassNames = classnames('c-textarea', className);
    return (
      <FormElement error={error} id={this.id} label={label} required={required}>
        <textarea
          className={textareaClassNames}
          disabled={disabled}
          id={this.id}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          placeholder={placeholder}
          ref={this.refTextareaCallback}
          value={value}
        />
      </FormElement>
    );
  }

  private handleBlur = () => {
    const { onBlur } = this.props;
    const value = this.textareaElement.value;

    if (typeof onBlur === 'function') {
      onBlur(value);
    }
  };

  private handleChange = () => {
    const { onChange } = this.props;
    const value = this.textareaElement.value;

    Utils.safeInvoke(onChange, value);
  };

  private handleFocus = () => {
    const { onFocus } = this.props;
    const value = this.textareaElement.value;

    Utils.safeInvoke(onFocus, value);
  };

  private refTextareaCallback = (ref: HTMLTextAreaElement) => {
    const { textareaRef } = this.props;

    this.textareaElement = ref;
    Utils.safeInvoke(textareaRef, ref);
  };
}
