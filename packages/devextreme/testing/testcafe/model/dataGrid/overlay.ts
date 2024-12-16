/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { Selector } from 'testcafe';
import Toolbar from '../toolbar';

const CLASS = {
  overlayWrapper: 'dx-overlay-wrapper',
  overlayContent: 'dx-overlay-content',
  invalidMessage: 'dx-invalid-message',
  revertTooltip: 'dx-datagrid-revert-tooltip',
  toolbar: 'dx-toolbar',
  checkbox: 'dx-checkbox',
};

export class Overlay {
  element: Selector;

  content: Selector;

  constructor(id?: Selector, index?: number) {
    if (id) {
      this.element = index ? id.nth(index) : id;
    } else {
      this.element = Selector(`.${CLASS.overlayWrapper}`).nth(index || 0);
    }

    this.content = this.element.find(`.${CLASS.overlayContent}`);
  }

  getInvalidMessage(): Selector {
    return this.element.filter(`.${CLASS.invalidMessage}`);
  }

  getRevertTooltip(): Selector {
    return this.element.filter(`.${CLASS.revertTooltip}`);
  }

  getPopupCheckbox(): Selector {
    return this.element.find(`.${CLASS.overlayContent} .${CLASS.checkbox}`);
  }

  getToolbar(idx?: number): Toolbar {
    return new Toolbar(this.element.find(`.${CLASS.toolbar}`).nth(idx || 0));
  }
}
