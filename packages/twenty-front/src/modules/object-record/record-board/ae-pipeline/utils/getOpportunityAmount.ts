import { isDefined } from 'twenty-shared/utils';

/**
 * Read Opportunity.amount as a currency number (not micros).
 */
export const getOpportunityAmount = (record: {
  amount?:
    | {
        amountMicros?: number | null;
      }
    | number
    | null;
}): number => {
  const amount = record.amount;

  if (!isDefined(amount)) {
    return 0;
  }

  if (typeof amount === 'number') {
    return Number.isFinite(amount) ? amount : 0;
  }

  const micros = amount.amountMicros;
  if (!isDefined(micros) || !Number.isFinite(micros)) {
    return 0;
  }

  return micros / 1_000_000;
};
