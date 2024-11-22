import type { DataRow } from '@ts/grids/new/grid_core/columns_controller/types';
import { LoadPanel, type LoadPanelProperties } from '@ts/grids/new/grid_core/inferno_wrappers/load_panel';
import { Scrollable } from '@ts/grids/new/grid_core/inferno_wrappers/scrollable';

import { Content } from './content/content';
import type { ErrorRowProperties } from './error_row';
import { ErrorRow } from './error_row';
import type { NoDataTextProperties } from './no_data_text';
import { NoDataText } from './no_data_text';
import { VirtualRow } from './virtual_scrolling/virtual_row';

export const CLASSES = {
  content: 'dx-gridcore-content',
};

export interface ContentViewProps {
  cardsPerRow?: number;
  cardWidth?: number;
  cardMinWidth?: number;

  errorRowProps: ErrorRowProperties;
  loadPanelProps: LoadPanelProperties & { visible: boolean };
  noDataTextProps: NoDataTextProperties & { visible: boolean };

  items: DataRow[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fieldTemplate?: any;

  virtualScrollingProps?: {
    heightUp?: number;
    heightDown?: number;
  };
}

export function ContentView(props: ContentViewProps): JSX.Element {
  return (
    <div>
      <ErrorRow {...props.errorRowProps} />
      {props.loadPanelProps.visible && <LoadPanel {...props.loadPanelProps} />}

      <Scrollable componentRef={this.scrollableRef}>
        {props.noDataTextProps.visible && <NoDataText {...props.noDataTextProps} />}
        <div className={CLASSES.content} tabIndex={0}>
          {
            props.virtualScrollingProps?.heightUp
            && <VirtualRow height={props.virtualScrollingProps?.heightUp}/>
          }
          <Content
            items={props.items}
            fieldTemplate={props.fieldTemplate}
            cardsPerRow={props.cardsPerRow}
          />
          {
            props.virtualScrollingProps?.heightDown
            && <VirtualRow height={props.virtualScrollingProps?.heightDown}/>
          }
        </div>
      </Scrollable>
    </div>
  );
}
