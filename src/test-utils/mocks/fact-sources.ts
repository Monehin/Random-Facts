import { of } from 'rxjs';
import { SourceDef } from '../../app/tokens/fact‑sources.token';

export const mockSources: Record<string, SourceDef> = {
  uselessfacts: {
    displayName: 'Useless Facts',
    fetchOne: () => of({ id: 'u1', text: 'Stub useless fact', source: 'uselessfacts' }),
  },
  history: {
    displayName: 'History Facts',
    fetchOne: () => of({ id: 'h1', text: 'Stub history fact', source: 'history' }),
  },
};
