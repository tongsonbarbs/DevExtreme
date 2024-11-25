/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, expect, it } from '@jest/globals';
import { render } from 'inferno';

import { Card } from './card';

const props = {
  row: {
    cells: [
      {
        column: {
          dataField: 'Name',
          name: 'Field',
        },
        value: 'devextreme',
      },
    ],
    key: 0,
  },
  toolbar: [
    {
      location: 'before',
      widget: 'dxCheckBox',
    },
    {
      location: 'before',
      text: 'Card Header',
    },
    {
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'edit',
        stylingMode: 'text',
      },
    },
    {
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'trash',
        stylingMode: 'text',
      },
    },
  ],
  cover: {
    src: 'https://www.devexpress.com/support/demos/i/demo-thumbs/aspnetcore-grid.png',
    alt: 'Card Cover',
    className: 'cover-image',
  },
};

describe('Rendering', () => {
  it('should be rendered correctly', () => {
    const container = document.createElement('div');
    // @ts-expect-error
    render(<Card {...props} />, container);

    expect(container).toMatchSnapshot();
  });

  it('should render content correctly', () => {
    const container = document.createElement('div');
    // @ts-expect-error
    render(<Card {...props} />, container);

    const fieldValue = container.querySelector('.dx-cardview-field-value');
    expect(fieldValue?.textContent).toEqual('devextreme');
  });
});

describe('Card Header', () => {
  it('should render the card header components correctly', () => {
    const container = document.createElement('div');
    // @ts-expect-error
    render(<Card {...props} />, container);

    const cardHeaderText = container.querySelector('.dx-cardheader-text span');
    expect(cardHeaderText?.textContent).toBe('Card Header');

    const checkbox = container.querySelector('.dx-checkbox');
    expect(checkbox).not.toBeNull();

    const editButton = container.querySelector('.dx-icon-edit');
    expect(editButton).not.toBeNull();

    const trashButton = container.querySelector('.dx-icon-trash');
    expect(trashButton).not.toBeNull();
  });
});

describe('Image', () => {
  it('should render the image correctly', () => {
    const container = document.createElement('div');
    // @ts-expect-error
    render(<Card {...props} />, container);

    const image = container.querySelector('img');
    expect(image).not.toBeNull();
    expect(image?.src).toBe(props.cover.src);
    expect(image?.alt).toBe(props.cover.alt);
  });
});

describe('Field Template', () => {
  it('should render field template correctly', () => {
    const container = document.createElement('div');
    // @ts-expect-error
    render(<Card {...props} />, container);

    const fieldName = container.querySelector('.dx-cardview-field-name');
    const fieldValue = container.querySelector('.dx-cardview-field-value');

    expect(fieldName?.textContent).toBe('Field: ');
    expect(fieldValue?.textContent).toBe('devextreme');
  });
});
