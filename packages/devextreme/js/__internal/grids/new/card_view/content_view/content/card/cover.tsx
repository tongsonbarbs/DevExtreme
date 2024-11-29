/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { PureComponent } from '@ts/grids/new/grid_core/core/pure_component';
import type { InfernoNode } from 'inferno';

const CLASSES = {
  cover: 'dx-card-cover',
  image: 'dx-card-cover-image',
};

export interface CoverProps {
  imageExpr?: string;
  altExpr?: string;
  className?: string;
  template?: (src: string, alt: string, className: string) => JSX.Element;
}

export class Cover extends PureComponent<CoverProps> {
  render(): InfernoNode {
    const {
      className, imageExpr, altExpr, template,
    } = this.props;
    const src = imageExpr;
    const alt = altExpr || 'Devexpress';
    const classNames = `${CLASSES.image} ${className || ''}`.trim();

    if (!src) {
      return null;
    }

    if (template) {
      return template(src, alt, className || '');
    }
    return (
      <div className={CLASSES.cover}>
        <img
          src={src}
          alt={alt}
          className={classNames}
          // TODO: move to scss
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
    );
  }
}
