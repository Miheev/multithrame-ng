import { Observable } from 'rxjs';
import { DataMap } from './data-map';

export interface IStore {
  init?: () => void;
  destroy?: () => void;
  save?: () => void;
  restore?: () => DataMap;
  restoreAsync?: () => Observable<DataMap>;
}
