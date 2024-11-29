/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { PureComponent } from '@ts/grids/new/grid_core/core/pure_component';
import type { InfernoNode, RefObject } from 'inferno';
import { createRef } from 'inferno';

export const CLASSES = {
  field: 'dx-cardview-field',
  fieldName: 'dx-cardview-field-name',
  fieldValue: 'dx-cardview-field-value',
  overflowHint: 'dx-cardview-overflow-hint',
};

export interface FieldProps {
  title: string | undefined;
  value: unknown;
  alignment: 'right' | 'center' | 'left';
  wordWrapEnabled?: boolean;
  cellHintEnabled?: boolean;
  elementRef?: RefObject<HTMLDivElement>;
  fieldTemplate?: (props: FieldProps) => JSX.Element;
  fieldCaptionTemplate?: (title: string) => JSX.Element;
  fieldValueTemplate?: (value: unknown) => JSX.Element;

  onFieldClick?: (e: MouseEvent) => void;
  onFieldDblClick?: (e: MouseEvent) => void;
  onFieldHoverChanged?: (hovered: boolean) => void;
  onFieldPrepared?: (element: HTMLElement) => void;
}

export class Field extends PureComponent<FieldProps> {
  private readonly containerRef: RefObject<HTMLDivElement>;

  constructor(props: FieldProps) {
    super(props);
    this.containerRef = this.props.elementRef || createRef<HTMLDivElement>();
  }

  componentDidMount(): void {
    const { onFieldPrepared } = this.props;
    if (onFieldPrepared && this.containerRef.current) {
      onFieldPrepared(this.containerRef.current);
    }
  }

  handleMouseEnter = (): void => {
    const { onFieldHoverChanged } = this.props;
    if (onFieldHoverChanged) {
      onFieldHoverChanged(true);
    }
  };

  handleMouseLeave = (): void => {
    const { onFieldHoverChanged } = this.props;
    if (onFieldHoverChanged) {
      onFieldHoverChanged(false);
    }
  };

  handleClick = (event: MouseEvent): void => {
    const { onFieldClick } = this.props;
    if (onFieldClick) {
      onFieldClick(event);
    }
  };

  handleDblClick = (event: MouseEvent): void => {
    const { onFieldDblClick } = this.props;
    if (onFieldDblClick) {
      onFieldDblClick(event);
    }
  };

  renderCaption(): JSX.Element | string {
    const { title, fieldCaptionTemplate } = this.props;
    if (fieldCaptionTemplate && title) {
      return fieldCaptionTemplate(title);
    }
    return <span className={CLASSES.fieldName}>{title}:</span>;
  }

  renderValue(): JSX.Element | string {
    const {
      value, fieldValueTemplate, wordWrapEnabled, alignment, cellHintEnabled,
    } = this.props;

    if (fieldValueTemplate && value) {
      return fieldValueTemplate(value);
    }

    const valueStyle = {
      textAlign: alignment,
      whiteSpace: wordWrapEnabled ? 'normal' : 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    };

    return (
      <span
        className={CLASSES.fieldValue}
        style={valueStyle}
        title={cellHintEnabled && typeof value === 'string' ? value : undefined}
      >
        {value}
      </span>
    );
  }

  render(): InfernoNode {
    const { fieldTemplate } = this.props;

    const containerProps = {
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave,
      onClick: this.handleClick,
      onDblClick: this.handleDblClick,
      ref: this.containerRef,
      tabIndex: 0,
      className: `${CLASSES.field}`.trim(),
    };

    if (fieldTemplate) {
      return fieldTemplate(this.props);
    }

    return (
      <div {...containerProps}>
        {this.renderCaption()}
        {this.renderValue()}
      </div>
    );
  }
}
