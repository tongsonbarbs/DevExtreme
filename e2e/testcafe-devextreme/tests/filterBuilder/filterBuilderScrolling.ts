import FilterBuilder from 'devextreme-testcafe-models/filterBuilder';
import { ClientFunction } from 'testcafe';
import { createScreenshotsComparer } from 'devextreme-screenshot-comparer';
import url from '../../helpers/getPageUrl';
import { fields, filter } from './data';
import { safeSizeTest } from '../../helpers/safeSizeTest';
import { createWidget } from '../../helpers/createWidget';

fixture`Filter Builder Scrolling Test`.page(
  url(__dirname, '../container.html'),
);

// T1273328
safeSizeTest('FilterBuilder - The field drop-down window moves with the page scroll', async (t) => {
  const filterBuilder = new FilterBuilder('#container');
  const { takeScreenshot, compareResults } = createScreenshotsComparer(t);

  await filterBuilder.isReady();

  await t
    .click(filterBuilder.getItem('operation'))
    .scrollIntoView(filterBuilder.getItem('operation', 4))
    .scrollIntoView(filterBuilder.getItem('operation', 0));

  await t
    .expect(await takeScreenshot('filterBuilder_scroll_with_popup.png', filterBuilder.element))
    .ok()
    .expect(compareResults.isValid())
    .ok(compareResults.errorMessages());
}).before(async () => {
  const shrinkContainer = ClientFunction(() => {
    const style = document.createElement('style');
    style.innerHTML = `
            #container {
                height: 150px;
                overflow: scroll;
            }
        `;
    document.head.appendChild(style);
  });

  await shrinkContainer();

  await createWidget('dxFilterBuilder', {
    fields,
    value: filter,
  });
});
