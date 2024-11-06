import { Selector } from 'testcafe';
import List from '../../list';

const CLASS = {
  filterMenu: 'dx-header-filter-menu',
  content: 'dx-overlay-content',
  list: 'dx-list',
  button: 'dx-button',
  selectAll: 'dx-list-select-all',
};

export default class HeaderFilter {
  body = Selector('body');

  element = this.body.find(`.${CLASS.filterMenu}`);

  getList(): List {
    return new List(this.element.find(`.${CLASS.list}`));
  }

  getButtons(): Selector {
    return this.element.find(`.${CLASS.button}`);
  }

  getContent(): Selector {
    return this.element.find(`.${CLASS.content}`);
  }

  getSelectAll(): Selector {
    return this.element.find(`.${CLASS.selectAll}`);
  }
}
