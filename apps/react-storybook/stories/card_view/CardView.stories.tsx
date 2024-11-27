import type { Meta, StoryObj } from "@storybook/react";

import dxCardView from "devextreme/ui/card_view";
import { wrapDxWithReact } from "../utils";
import { items, store } from "./data";

const CardView = wrapDxWithReact(dxCardView);

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof CardView> = {
  title: "Grids/CardView",
  component: CardView,
  argTypes: {
    dataSource: {
      control: false,
    }
  }
};

export default meta;

type Story = StoryObj<typeof CardView>;

export const DefaultMode: Story = {
  args: {
    dataSource: store,
    width: "100%",
    // width: 750,
    height: 500,
    keyExpr: "OrderNumber",
    cardsPerRow: "auto",
    paging: {
      pageSize: 12,
    },
    cardMinWidth: 250,
    cardMaxWidth: 350,
    columns: [
      {
        dataField: "OrderNumber",
        alignment: 'right',
        dataType: "number",
      },
      {
        dataField: "OrderDate",
        visible: false,
      },
      "StoreCity",
      "StoreState",
      "Employee",
      "SaleAmount",
    ],
    filterPanel: { visible: true },
  },
};
