import { isDefined } from 'twenty-shared/utils';

export const getCurrentQuarterBounds = (
  now: Date = new Date(),
): { start: Date; end: Date } => {
  const year = now.getFullYear();
  const quarter = Math.floor(now.getMonth() / 3);
  const start = new Date(year, quarter * 3, 1, 0, 0, 0, 0);
  const end = new Date(year, quarter * 3 + 3, 0, 23, 59, 59, 999);
  return { start, end };
};

export const isInCurrentQuarter = (
  dateValue: string | Date | null | undefined,
  now: Date = new Date(),
): boolean => {
  if (!isDefined(dateValue)) {
    return false;
  }

  const date = dateValue instanceof Date ? dateValue : new Date(dateValue);
  if (Number.isNaN(date.getTime())) {
    return false;
  }

  const { start, end } = getCurrentQuarterBounds(now);
  return date >= start && date <= end;
};
