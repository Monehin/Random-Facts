import { SampleBasedSourceConfig, SourceConfig, UrlBasedSourceConfig } from '../types/types';

export function isUrlBasedSource(config: SourceConfig): config is UrlBasedSourceConfig {
  return 'url' in config;
}

export function isSampleBasedSource(config: SourceConfig): config is SampleBasedSourceConfig {
  return 'samples' in config;
}
