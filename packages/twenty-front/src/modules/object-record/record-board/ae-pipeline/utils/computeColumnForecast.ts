import { getOpportunityAmount } from '@/object-record/record-board/ae-pipeline/utils/getOpportunityAmount';
import { getStageProbabilityForValue } from '@/object-record/record-board/ae-pipeline/utils/getStageProbability';
import { type StageOptionLike } from '@/object-record/record-board/ae-pipeline/utils/getStageProbability';
import { type ObjectRecord } from '@/object-record/types/ObjectRecord';
import { isDefined } from 'twenty-shared/utils';

export const computeColumnForecast = ({
  records,
  stageValue,
  stageOptions,
}: {
  records: Array<ObjectRecord | null | undefined>;
  stageValue: string | null;
  stageOptions: StageOptionLike[] | null | undefined;
}): number => {
  const probability =
    getStageProbabilityForValue(stageValue, stageOptions) / 100;

  if (probability === 0) {
    return 0;
  }

  let sum = 0;
  for (const record of records) {
    if (!isDefined(record)) {
      continue;
    }
    sum += getOpportunityAmount(record) * probability;
  }

  return sum;
};
