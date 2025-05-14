import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Fact } from '../types/fact.model';

export interface SourceDef {
  displayName: string;
  fetchOne: () => Observable<Fact>;
}

export const FACT_SOURCES = new InjectionToken<Record<string, SourceDef>>('FACT_SOURCES');
