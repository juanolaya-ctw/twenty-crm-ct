import { formatPipelineMoney } from '@/object-record/record-board/ae-pipeline/utils/formatPipelineMoney';
import { computeColumnForecast } from '@/object-record/record-board/ae-pipeline/utils/computeColumnForecast';
import { useRecordsFromStoreIds } from '@/object-record/record-board/ae-pipeline/hooks/useRecordsFromStoreIds';
import { type StageOptionLike } from '@/object-record/record-board/ae-pipeline/utils/getStageProbability';
import { RecordBoardColumnContext } from '@/object-record/record-board/record-board-column/contexts/RecordBoardColumnContext';
import { RecordBoardContext } from '@/object-record/record-board/contexts/RecordBoardContext';
import { styled } from '@linaria/react';
import { useContext, useMemo } from 'react';
import { Tag } from 'twenty-ui/primitives/data-display';
import { Tooltip } from 'twenty-ui/primitives/surfaces';

const StyledForecast = styled.div`
  flex-shrink: 0;
`;

/**
 * Column header badge: forecast = SUM(amount × stageProbability/100)
 * for loaded cards in this kanban column.
 */
export const RecordBoardColumnForecastBadge = () => {
  const { columnDefinition, recordIds } = useContext(RecordBoardColumnContext);
  const { selectFieldMetadataItem, objectMetadataItem } =
    useContext(RecordBoardContext);

  const records = useRecordsFromStoreIds(recordIds);

  const stageOptions = selectFieldMetadataItem?.options as
    | StageOptionLike[]
    | null
    | undefined;

  const forecast = useMemo(
    () =>
      computeColumnForecast({
        records,
        stageValue: columnDefinition?.value ?? null,
        stageOptions,
      }),
    [records, columnDefinition?.value, selectFieldMetadataItem?.options],
  );

  if (objectMetadataItem.nameSingular !== 'opportunity') {
    return null;
  }

  const label = `Forecast ${formatPipelineMoney(forecast)}`;

  return (
    <StyledForecast>
      <Tooltip
        content="Forecast = Amount × % etapa (cards cargadas)"
        side="bottom"
        positionMethod="fixed"
      >
        <Tag color="transparent" weight="regular">
          {label}
        </Tag>
      </Tooltip>
    </StyledForecast>
  );
};
