import { recordStoreFamilyState } from '@/object-record/record-store/states/recordStoreFamilyState';
import { type ObjectRecord } from '@/object-record/types/ObjectRecord';
import { useStore } from 'jotai';
import { useEffect, useState } from 'react';

/**
 * Subscribe to record-store atoms for the given ids and return current snapshots.
 */
export const useRecordsFromStoreIds = (
  recordIds: string[],
): Array<ObjectRecord | null | undefined> => {
  const store = useStore();
  const recordIdsKey = recordIds.join('|');

  const [records, setRecords] = useState<
    Array<ObjectRecord | null | undefined>
  >(() =>
    recordIds.map((id) => store.get(recordStoreFamilyState.atomFamily(id))),
  );

  useEffect(() => {
    const ids = recordIdsKey.length > 0 ? recordIdsKey.split('|') : [];

    const read = () => {
      setRecords(
        ids.map((id) => store.get(recordStoreFamilyState.atomFamily(id))),
      );
    };

    read();

    const unsubs = ids.map((id) =>
      store.sub(recordStoreFamilyState.atomFamily(id), read),
    );

    return () => {
      for (const unsub of unsubs) {
        unsub();
      }
    };
  }, [recordIdsKey, store]);

  return records;
};
