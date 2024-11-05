/* eslint-disable @typescript-eslint/no-floating-promises */
import { createScreenshotsComparer } from 'devextreme-screenshot-comparer';
import DataGrid from 'devextreme-testcafe-models/dataGrid';
import url from '../../../helpers/getPageUrl';
import { createWidget } from '../../../helpers/createWidget';
import { getData } from '../helpers/generateDataSourceData';

fixture.disablePageReloads`Sticky Column - context menu text`.page(
  url(__dirname, '../../container.html'),
);

test('Sticky columns: Rename the context menu texts', async (t) => {
  const dataGrid = new DataGrid('#container');
  const { takeScreenshot, compareResults } = createScreenshotsComparer(t);

  await t.expect(dataGrid.isReady()).ok();
  await t
    .rightClick(dataGrid.getHeaders().getHeaderRow(0).element)
    .click(dataGrid.getContextMenu().getItemByOrder(4))
    .expect(
      await takeScreenshot(
        'sticky_columns_menu_texts.png',
        dataGrid.element,
      ),
    )
    .ok()
    .expect(compareResults.isValid())
    .ok(compareResults.errorMessages());
})
  .before(async () => {
    await createWidget('dxDataGrid', {
      dataSource: getData(5, 5),
      width: '100%',
      columnFixing: {
        enabled: true,
      },
      customizeColumns: (columns) => {
        columns[1].fixed = true;
        columns[1].fixedPosition = 'sticky';
      },
    });
  });
