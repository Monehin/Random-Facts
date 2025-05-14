import { HttpClient } from '@angular/common/http';
import { FactoryProvider } from '@angular/core';
import { of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import config from '../config/fact-sources.config.json';
import { FACT_SOURCES, SourceDef } from '../tokens/fact‑sources.token';
import { Fact } from '../types/fact.model';
import { SourceConfig } from '../types/types';
import { isSampleBasedSource, isUrlBasedSource } from '../utils/utils';
export const factSourcesProvider: FactoryProvider = {
  provide: FACT_SOURCES,
  useFactory: (http: HttpClient) => {
    const sources: Record<string, SourceDef> = {};

    for (const [key, value] of Object.entries(config) as [string, SourceConfig][]) {
      if (isUrlBasedSource(value)) {
        sources[key] = {
          displayName: value.displayName,
          fetchOne: () =>
            http.get<Pick<Fact, 'id' | 'text' | 'source'>>(value.url).pipe(
              map((p) => ({ id: p.id, text: p.text, source: p.source })),
              catchError(() => throwError(() => new Error(`${value.displayName} API error`)))
            ),
        };
      } else if (isSampleBasedSource(value)) {
        sources[key] = {
          displayName: value.displayName,
          fetchOne: () => {
            const samples = value.samples;
            return of(samples[Math.floor(Math.random() * samples.length)]);
          },
        };
      }
    }

    return sources;
  },
  deps: [HttpClient],
};
