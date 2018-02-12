/**
 * Radio Input
 */
import * as React from 'react';
import * as Utils from 'services/Utils';
import './Radio.css';

export interface IRadioProps {
  checked?: boolean;
  id: string;
  label: string;
  name?: string;
  onChange?(id: string): void;
}

const Radio: React.StatelessComponent<IRadioProps> = ({
  checked,
  id,
  label,
  name,
  onChange,
}): JSX.Element => {
  const handleChange = () => {
    Utils.safeInvoke(onChange, id);
  };

  return (
    <span className="c-radio">
      <input
        aria-checked={checked}
        checked={checked}
        id={id}
        name={name}
        onChange={handleChange}
        type="radio"
      />
      <label className="c-radio__label" htmlFor={id}>
        <span className="c-radio--faux" />
        <span className="c-form-element__label">{label}</span>
      </label>
    </span>
  );
};

export default Radio;
