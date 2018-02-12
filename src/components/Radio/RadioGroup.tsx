/**
 * Radio Group
 */
import Fieldset from 'components/Fieldset';
import * as React from 'react';
import * as Utils from 'services/Utils';
import { IRadioProps } from './Radio';

interface IRadioGroupProps {
  checkedId?: string;
  error?: string;
  label: string;
  name: string;
  required?: boolean;
  onChange?(id: string): void;
}
interface IRadioGroupState {
  checkedId?: string;
}

export default class RadioGroup extends React.Component<
  IRadioGroupProps,
  IRadioGroupState
> {
  public state: IRadioGroupState = {
    checkedId: this.props.checkedId,
  };

  public renderRadios() {
    const { children, name } = this.props;
    const { checkedId } = this.state;

    return React.Children.map(children, (radio: React.ReactChild) =>
      React.cloneElement(radio as React.ReactElement<any>, {
        checked:
          (radio as React.ReactElement<IRadioProps>).props.id === checkedId,
        name,
        onChange: this.handleChange,
      })
    );
  }

  public render() {
    const { error, label, required } = this.props;

    return (
      <Fieldset error={error} label={label} required={required}>
        {this.renderRadios()}
      </Fieldset>
    );
  }

  private handleChange = (id: string) => {
    const { onChange } = this.props;

    this.setState({ checkedId: id });
    Utils.safeInvoke(onChange, id);
  };
}
