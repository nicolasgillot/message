/**
 * Unit test for FormElement component.
 */
import { expect } from 'chai';
import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import 'services/test-helper';
import FormElement, { IFormElementProps } from './';

describe('FormElement', () => {
  let shallowFormElement: ShallowWrapper<IFormElementProps, {}>;

  beforeEach(() => {
    shallowFormElement = shallow(<FormElement id="form-element-id" />);
  });

  it('should render correctly', () => {
    expect(shallowFormElement.type()).to.equal('div');
    expect(shallowFormElement.hasClass('c-form-element')).to.be.true;
  });

  it('should set custom classname', () => {
    const className = 'custom-classname';

    shallowFormElement.setProps({ className });
    expect(shallowFormElement.hasClass(className)).to.be.true;
  });

  it('should render children', () => {
    const children = 'Children';

    shallowFormElement.setProps({ children });
    expect(
      shallowFormElement.find('.c-form-element__control').children()
    ).to.have.lengthOf(1);
  });

  it('should set control classname', () => {
    const className = 'control-classname';

    shallowFormElement.setProps({ controlClassName: className });
    expect(
      shallowFormElement.find('.c-form-element__control').hasClass(className)
    ).to.be.true;
  });

  it('should have has-error className when the error props is configured', () => {
    shallowFormElement.setProps({ error: 'This field is required' });
    expect(shallowFormElement.hasClass('has-error')).to.be.true;
  });

  it('should render error text', () => {
    const errorText = 'This field is required';

    shallowFormElement.setProps({ error: errorText });
    expect(shallowFormElement.find('.c-form-element__help').text()).to.be.equal(
      errorText
    );
  });

  it('should render help text', () => {
    const helpText = 'Help Text';

    shallowFormElement.setProps({ helpText });
    expect(shallowFormElement.find('.c-form-element__help').text()).to.be.equal(
      helpText
    );
  });

  it('should the error text has the priority on the help text', () => {
    const errorText = 'This field is required';
    const helpText = 'Help Text';

    shallowFormElement.setProps({
      error: errorText,
      helpText,
    });
    expect(shallowFormElement.find('.c-form-element__help').text()).to.be.equal(
      errorText
    );
  });

  it('should render label', () => {
    const textLabel = 'Text Label';

    shallowFormElement.setProps({ label: textLabel });

    const labelElement = shallowFormElement.find('.c-form-element__label');

    expect(labelElement).to.have.lengthOf(1);
    expect(labelElement.text()).to.be.equal(textLabel);
  });

  it('should the tag of the label element is "label" by default', () => {
    const textLabel = 'Text Label';

    shallowFormElement.setProps({ label: textLabel });

    const labelElement = shallowFormElement.find('.c-form-element__label');

    expect(labelElement.type()).to.equal('label');
  });

  it('should the tag of the label element has a htmlFor atrribute', () => {
    const textLabel = 'Text Label';

    shallowFormElement.setProps({ label: textLabel });

    const labelElement = shallowFormElement.find('.c-form-element__label');

    expect(labelElement.prop('for')).to.equal(shallowFormElement.prop('id'));
  });

  it('should change the tag of the label element to "span"', () => {
    const textLabel = 'Text Label';

    shallowFormElement.setProps({
      label: textLabel,
      labelTag: 'span',
    });

    const labelElement = shallowFormElement.find('.c-form-element__label');

    expect(labelElement.type()).to.equal('span');
  });

  it('should render required symbol', () => {
    const textLabel = 'Text Label';

    shallowFormElement.setProps({
      label: textLabel,
      required: true,
    });

    const labelElement = shallowFormElement.find('.c-form-element__label');

    expect(labelElement.find('.required')).to.have.lengthOf(1);
  });

  it('should have the good icon classname', () => {
    shallowFormElement.setProps({ hasLeftIcon: true });
    expect(
      shallowFormElement
        .find('.c-form-element__control')
        .hasClass('c-input-has-icon--left')
    ).to.be.true;
    shallowFormElement.setProps({ hasRightIcon: true });
    expect(
      shallowFormElement
        .find('.c-form-element__control')
        .hasClass('c-input-has-icon--left-right')
    ).to.be.true;
    shallowFormElement.setProps({ hasLeftIcon: false });
    expect(
      shallowFormElement
        .find('.c-form-element__control')
        .hasClass('c-input-has-icon--right')
    ).to.be.true;
  });
});
