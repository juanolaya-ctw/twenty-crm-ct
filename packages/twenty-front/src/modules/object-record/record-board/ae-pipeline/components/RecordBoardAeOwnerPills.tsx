import { useRecordsFromStoreIds } from '@/object-record/record-board/ae-pipeline/hooks/useRecordsFromStoreIds';
import { computeAeOwnerPills } from '@/object-record/record-board/ae-pipeline/utils/computeAeOwnerPills';
import { formatPipelineMoney } from '@/object-record/record-board/ae-pipeline/utils/formatPipelineMoney';
import { RecordBoardContext } from '@/object-record/record-board/contexts/RecordBoardContext';
import { visibleRecordGroupIdsComponentFamilySelector } from '@/object-record/record-group/states/selectors/visibleRecordGroupIdsComponentFamilySelector';
import { recordIndexRecordIdsByGroupComponentFamilyState } from '@/object-record/record-index/states/recordIndexRecordIdsByGroupComponentFamilyState';
import { useAtomComponentFamilySelectorValue } from '@/ui/utilities/state/jotai/hooks/useAtomComponentFamilySelectorValue';
import { useAtomComponentFamilyStateCallbackState } from '@/ui/utilities/state/jotai/hooks/useAtomComponentFamilyStateCallbackState';
import { ViewType } from '@/views/types/ViewType';
import { styled } from '@linaria/react';
import { useStore } from 'jotai';
import { useContext, useEffect, useMemo, useState } from 'react';
import { Tag } from 'twenty-ui/primitives/data-display';
import { themeCssVariables } from 'twenty-ui/theme-constants';

const StyledPillsBar = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: ${themeCssVariables.spacing[2]};
  padding-bottom: ${themeCssVariables.spacing[2]};
  padding-left: ${themeCssVariables.spacing[1]};
  padding-right: ${themeCssVariables.spacing[1]};
`;

const useRecordIdsFromVisibleGroups = (groupIds: string[]): string[] => {
  const store = useStore();
  const recordIdsByGroupState = useAtomComponentFamilyStateCallbackState(
    recordIndexRecordIdsByGroupComponentFamilyState,
  );
  const groupIdsKey = groupIds.join('|');
  const [recordIds, setRecordIds] = useState<string[]>([]);

  useEffect(() => {
    const ids = groupIdsKey.length > 0 ? groupIdsKey.split('|') : [];

    const read = () => {
      const all: string[] = [];
      for (const groupId of ids) {
        all.push(...store.get(recordIdsByGroupState(groupId)));
      }
      setRecordIds(all);
    };

    read();

    const unsubs = ids.map((groupId) =>
      store.sub(recordIdsByGroupState(groupId), read),
    );

    return () => {
      for (const unsub of unsubs) {
        unsub();
      }
    };
  }, [groupIdsKey, recordIdsByGroupState, store]);

  return recordIds;
};

/**
 * Header pills above Opportunity kanban: one per AE dueño with
 * `Cerrado $X · Open Pipe $Y` from loaded board cards.
 */
export const RecordBoardAeOwnerPills = () => {
  const { objectMetadataItem } = useContext(RecordBoardContext);

  const visibleRecordGroupIds = useAtomComponentFamilySelectorValue(
    visibleRecordGroupIdsComponentFamilySelector,
    ViewType.KANBAN,
  );

  const recordIds = useRecordIdsFromVisibleGroups(visibleRecordGroupIds);
  const records = useRecordsFromStoreIds(recordIds);
  const pills = useMemo(() => computeAeOwnerPills({ records }), [records]);

  if (objectMetadataItem.nameSingular !== 'opportunity') {
    return null;
  }

  if (pills.length === 0) {
    return null;
  }

  return (
    <StyledPillsBar data-testid="ae-owner-pills">
      {pills.map((pill) => (
        <Tag key={pill.ownerId} color="sky" weight="medium">
          {`${pill.ownerLabel} — Cerrado ${formatPipelineMoney(pill.closedAmount)} · Open Pipe ${formatPipelineMoney(pill.openPipeAmount)}`}
        </Tag>
      ))}
    </StyledPillsBar>
  );
};
