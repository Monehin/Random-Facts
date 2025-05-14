import { Fact } from './fact.model';

export type SourceConfig = UrlBasedSourceConfig | SampleBasedSourceConfig;

export type FactSourceConfigMap = Record<string, SourceConfig>;

export interface UrlBasedSourceConfig {
  displayName: string;
  url: string;
}

export interface SampleBasedSourceConfig {
  displayName: string;
  samples: Fact[];
}
