export { ExplicitTypes } from "devextreme/ui/splitter";
import Splitter, { Properties } from "devextreme/ui/splitter";
import { createComponent } from "./core/index";
import { createConfigurationComponent } from "./core/index";

type AccessibleOptions = Pick<Properties,
  "allowKeyboardNavigation" |
  "dataSource" |
  "disabled" |
  "elementAttr" |
  "height" |
  "hoverStateEnabled" |
  "items" |
  "itemTemplate" |
  "onContentReady" |
  "onDisposing" |
  "onInitialized" |
  "onItemClick" |
  "onItemCollapsed" |
  "onItemContextMenu" |
  "onItemExpanded" |
  "onItemRendered" |
  "onOptionChanged" |
  "onResize" |
  "onResizeEnd" |
  "onResizeStart" |
  "orientation" |
  "rtlEnabled" |
  "separatorSize" |
  "visible" |
  "width"
>;

interface DxSplitter extends AccessibleOptions {
  readonly instance?: Splitter;
}
const DxSplitter = createComponent({
  props: {
    allowKeyboardNavigation: Boolean,
    dataSource: {},
    disabled: Boolean,
    elementAttr: Object,
    height: [Function, Number, String],
    hoverStateEnabled: Boolean,
    items: Array,
    itemTemplate: {},
    onContentReady: Function,
    onDisposing: Function,
    onInitialized: Function,
    onItemClick: Function,
    onItemCollapsed: Function,
    onItemContextMenu: Function,
    onItemExpanded: Function,
    onItemRendered: Function,
    onOptionChanged: Function,
    onResize: Function,
    onResizeEnd: Function,
    onResizeStart: Function,
    orientation: String,
    rtlEnabled: Boolean,
    separatorSize: Number,
    visible: Boolean,
    width: [Function, Number, String]
  },
  emits: {
    "update:isActive": null,
    "update:hoveredElement": null,
    "update:allowKeyboardNavigation": null,
    "update:dataSource": null,
    "update:disabled": null,
    "update:elementAttr": null,
    "update:height": null,
    "update:hoverStateEnabled": null,
    "update:items": null,
    "update:itemTemplate": null,
    "update:onContentReady": null,
    "update:onDisposing": null,
    "update:onInitialized": null,
    "update:onItemClick": null,
    "update:onItemCollapsed": null,
    "update:onItemContextMenu": null,
    "update:onItemExpanded": null,
    "update:onItemRendered": null,
    "update:onOptionChanged": null,
    "update:onResize": null,
    "update:onResizeEnd": null,
    "update:onResizeStart": null,
    "update:orientation": null,
    "update:rtlEnabled": null,
    "update:separatorSize": null,
    "update:visible": null,
    "update:width": null,
  },
  computed: {
    instance(): Splitter {
      return (this as any).$_instance;
    }
  },
  beforeCreate() {
    (this as any).$_WidgetClass = Splitter;
    (this as any).$_hasAsyncTemplate = true;
    (this as any).$_expectedChildren = {
      item: { isCollectionItem: true, optionName: "items" }
    };
  }
});

const DxItem = createConfigurationComponent({
  emits: {
    "update:isActive": null,
    "update:hoveredElement": null,
    "update:collapsed": null,
    "update:collapsedSize": null,
    "update:collapsible": null,
    "update:maxSize": null,
    "update:minSize": null,
    "update:resizable": null,
    "update:size": null,
    "update:splitter": null,
    "update:template": null,
    "update:text": null,
    "update:visible": null,
  },
  props: {
    collapsed: Boolean,
    collapsedSize: [Number, String],
    collapsible: Boolean,
    maxSize: [Number, String],
    minSize: [Number, String],
    resizable: Boolean,
    size: [Number, String],
    splitter: Object,
    template: {},
    text: String,
    visible: Boolean
  }
});
(DxItem as any).$_optionName = "items";
(DxItem as any).$_isCollectionItem = true;

export default DxSplitter;
export {
  DxSplitter,
  DxItem
};
import type * as DxSplitterTypes from "devextreme/ui/splitter_types";
export { DxSplitterTypes };
