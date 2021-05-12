import { Publication } from 'src/app/models/publication';
export class Collection{
  public date_created: string;
  public date_modified: string;
  public date_published_externally: number;
  public deleted: number;
  public id: number;
  public legacy_id: string;
  public name: string;
  public published: number;
  public published_by: string;
  public zts_id: string;
  public publications: Publication[];
}
