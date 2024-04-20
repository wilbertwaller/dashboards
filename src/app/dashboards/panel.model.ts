import { v4 as uuid } from 'uuid';

export enum FilterType {
  ButtonToggle = 'button-toggle',
  Search = 'search'
}

export enum PanelType {
  ContentViewer = 'content-viewer',
  List = 'list',
  Table = 'table'
}

export class Panel {
  id = uuid();
  title: string | undefined;
  filterType: FilterType | undefined;
  type!: PanelType;

  constructor(data: Partial<Panel>) {
    Object.assign(this, data);
  }
}