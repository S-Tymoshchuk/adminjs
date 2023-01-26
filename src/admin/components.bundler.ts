import AdminJS, { OverridableComponent } from 'adminjs';
import * as path from 'path';

export const bundle = (
  url: string,
  componentName?: OverridableComponent,
): string => AdminJS.bundle(path.join(process.cwd(), url), componentName);

export const PRODUCTS_LIST = bundle('components/product-list');
