import { HttpErrorResponse } from '@angular/common/http';

export interface AppHttpError extends HttpErrorResponse {
  operation: string;
}

export interface AppHttpParams {
  [key: string]: string | string[];
}
