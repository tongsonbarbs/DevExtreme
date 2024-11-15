/* eslint-disable @typescript-eslint/no-misused-promises */
import DataGrid from 'devextreme-testcafe-models/dataGrid';
import { ClientFunction } from 'testcafe';
import { createWidget } from '../../../helpers/createWidget';
import url from '../../../helpers/getPageUrl';

fixture`Editing performance`
  .page(url(__dirname, '../../container.html'));

const setGridChanges = ClientFunction((changes) => {
  // @ts-expect-error instance
  const grid = $('#otherContainer').dxDataGrid('instance');
  grid.option('editing.changes', changes);
});

const getPerformanceNow = ClientFunction(() => performance.now());

test('DataGrid - Performance drops on adding a large number of rows via editing.changes (T1251098)', async (t) => {
  const gridContainer = new DataGrid('#container');
  const dataRows = gridContainer.dataRows.count;
  const changes = [...new Array(1000)].map((_, index) => ({
    type: 'insert',
    data: {
      id: index + 1,
      text: `item ${index + 1}`,
    },
  }));

  await t.expect(gridContainer.element.exists).ok();
  const startTime = await getPerformanceNow();
  await setGridChanges(changes);
  await t
    .expect(await dataRows)
    .eql(1000);

  const endTime = await getPerformanceNow();
  const loadTime = endTime - startTime;
  // eslint-disable-next-line spellcheck/spell-checker
  await t.expect(loadTime).lte(3000);
  // should be less than or equal to 3 seconds given it is 1000 rows of 2 cell data
}).before(async () => {
  await createWidget('dxDataGrid', {
    dataSource: [],
    keyExpr: 'id',
    columns: ['id', 'text'],
    scrolling: { mode: 'virtual' },
    editing: {
      mode: 'batch',
      allowAdding: true,
    },
  }, '#container');
});
