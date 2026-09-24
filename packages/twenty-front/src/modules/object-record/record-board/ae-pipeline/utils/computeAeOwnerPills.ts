import { getOpportunityAmount } from '@/object-record/record-board/ae-pipeline/utils/getOpportunityAmount';
import { getOwnerDisplayName } from '@/object-record/record-board/ae-pipeline/utils/getOwnerDisplayName';
import { isClosedWonStage } from '@/object-record/record-board/ae-pipeline/utils/isClosedStage';
import { isOpenPipelineStage } from '@/object-record/record-board/ae-pipeline/utils/isClosedStage';
import { isInCurrentQuarter } from '@/object-record/record-board/ae-pipeline/utils/isInCurrentQuarter';
import { type ObjectRecord } from '@/object-record/types/ObjectRecord';
import { isDefined } from 'twenty-shared/utils';

export type AeOwnerPillMetrics = {
  ownerId: string;
  ownerLabel: string;
  closedAmount: number;
  openPipeAmount: number;
};

/**
 * Cerrado = SUM amount where stage=Ganado AND closeDate in current quarter.
 * Open Pipe = SUM amount for stages that are neither Ganado nor Perdido.
 * Grouped by Opportunity.owner (AE dueño).
 */
export const computeAeOwnerPills = ({
  records,
  now = new Date(),
}: {
  records: Array<ObjectRecord | null | undefined>;
  now?: Date;
}): AeOwnerPillMetrics[] => {
  const byOwner = new Map<string, AeOwnerPillMetrics>();

  for (const record of records) {
    if (!isDefined(record)) {
      continue;
    }

    const owner = getOwnerDisplayName(record.owner);
    if (!isDefined(owner)) {
      continue;
    }

    let metrics = byOwner.get(owner.id);
    if (!isDefined(metrics)) {
      metrics = {
        ownerId: owner.id,
        ownerLabel: owner.label,
        closedAmount: 0,
        openPipeAmount: 0,
      };
      byOwner.set(owner.id, metrics);
    }

    const amount = getOpportunityAmount(record);
    const stage = typeof record.stage === 'string' ? record.stage : null;

    if (isClosedWonStage(stage) && isInCurrentQuarter(record.closeDate, now)) {
      metrics.closedAmount += amount;
    }

    if (isOpenPipelineStage(stage)) {
      metrics.openPipeAmount += amount;
    }
  }

  return Array.from(byOwner.values()).sort((a, b) =>
    a.ownerLabel.localeCompare(b.ownerLabel),
  );
};
