/**
 * Fieldset is used to group several controls within a web form.
 */
import * as classnames from 'classnames';
import * as React from 'react';

interface IFieldsetProps {
  children?: React.ReactNode;
  error?: string;
  label?: string;
  required?: boolean;
}

interface IDefaultProps {
  required: boolean;
}

type PropsWithDefaults = IFieldsetProps & IDefaultProps;

export default class Fieldset extends React.PureComponent<IFieldsetProps, {}> {
  public static defaultProps: IDefaultProps = {
    required: false,
  };

  public renderRequired() {
    const { required } = this.props as PropsWithDefaults;

    return required ? <abbr className="required">{'*'}</abbr> : null;
  }

  public render() {
    const { children, error } = this.props;
    const fieldsetClassName = classnames('c-form-element', {
      'has-error': error != null,
    });

    return (
      <fieldset className={fieldsetClassName}>
        {this.renderLegend()}
        <div className="c-form-element__control">{children}</div>
        {this.renderHelpError()}
      </fieldset>
    );
  }

  private renderHelpError() {
    const { error } = this.props;

    return error == null ? null : (
      <span className="c-form-element__help">{error}</span>
    );
  }

  private renderLegend() {
    const { label } = this.props;

    return (
      <legend className="c-form-element__legend c-form-element__label">
        {this.renderRequired()}
        {label}
      </legend>
    );
  }
}
