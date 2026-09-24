import { formatToShortNumber } from 'twenty-shared/utils';

export const formatPipelineMoney = (amount: number): string => {
  if (!Number.isFinite(amount) || amount === 0) {
    return '$0';
  }

  const absolute = Math.abs(amount);
  const formatted =
    absolute >= 1000
      ? formatToShortNumber(absolute)
      : absolute.toLocaleString(undefined, { maximumFractionDigits: 0 });

  return amount < 0 ? `-$${formatted}` : `$${formatted}`;
};
