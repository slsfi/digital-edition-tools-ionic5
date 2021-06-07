import * as uuid from 'uuid';

export class TocItem{
  public text: string;
  public collectionId: string;
  public type: string;
  public unique_id: string;
  public url: string;
  public date: string;
  public children: TocItem[];
  public itemId: string;
  public collapsed: boolean;

  constructor(options: {
    text: string,
    children?: TocItem[]
  }) {
    this.text = options.text;
    this.itemId = '';
    this.collapsed = true;
    this.unique_id = uuid.v4();
    this.children = options.children || [];
}
}
