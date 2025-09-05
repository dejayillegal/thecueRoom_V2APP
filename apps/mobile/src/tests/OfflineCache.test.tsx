import React from 'react';
import { render } from '@testing-library/react-native';
import { QueryClient } from '@tanstack/react-query';
import { useOfflineCache } from '../lib/useOfflineCache';
import { persistQueryClient } from '@tanstack/react-query-persist-client';

jest.mock('@tanstack/react-query-persist-client', () => ({
  persistQueryClient: jest.fn(),
}));

jest.mock('react-native-mmkv', () => ({
  MMKV: class {
    getString() { return null; }
    set() {}
    delete() {}
  },
}));

test('restores cache within 48h', () => {
  const qc = new QueryClient();
  render(<Test qc={qc} />);
  expect(persistQueryClient).toHaveBeenCalledWith(
    expect.objectContaining({ maxAge: 1000 * 60 * 60 * 48 })
  );
});

function Test({ qc }: { qc: QueryClient }) {
  useOfflineCache(qc);
  return null;
}
