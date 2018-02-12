/**
 * Checkbox input
 */
import FormElement from 'components/FormElement';
import * as React from 'react';
import * as uuid from 'uuid';
import './Checkbox.css';

interface ICheckboxProps {
  checked: boolean;
  disabled?: boolean;
  error?: string;
  grouped?: boolean;
  hiddenLabel?: boolean;
  indeterminate?: boolean;
  label?: string;
  onChange?: React.FormEventHandler<HTMLInputElement>;
  required?: boolean;
}

export default class Checkbox extends React.PureComponent<ICheckboxProps, {}> {
  private id: string = `checkbox-${uuid()}`;

  public renderCheckbox() {
    const { checked, label, onChange } = this.props;

    return (
      <span className="c-checkbox">
        <input
          aria-checked={checked}
          checked={checked}
          id={this.id}
          onChange={onChange}
          type="checkbox"
        />
        <label className="c-checkbox__label" htmlFor={this.id}>
          <span className="c-checkbox_faux" />
          <span className="c-form-element__label">{label}</span>
        </label>
      </span>
    );
  }

  public render() {
    const { error } = this.props;

    return (
      <FormElement error={error} id={this.id}>
        {this.renderCheckbox()}
      </FormElement>
    );
  }
}
