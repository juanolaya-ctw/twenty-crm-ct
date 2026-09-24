import { AE_LOST_STAGE_VALUES } from '@/object-record/record-board/ae-pipeline/constants/AePipelineStages';
import { AE_WON_STAGE_VALUES } from '@/object-record/record-board/ae-pipeline/constants/AePipelineStages';
import { isDefined } from 'twenty-shared/utils';

export type StageOptionLike = {
  value: string;
  label?: string | null;
  probability?: number | null;
};

const LABEL_PERCENT_REGEX = /(\d+)\s*%/;

/**
 * Resolve forecast probability (0–100) for a stage option.
 * Prefer explicit `probability` on the option JSON; else parse `(N%)` from the label;
 * else fall back to won/lost heuristics.
 */
export const getStageProbability = (
  option: StageOptionLike | undefined | null,
): number => {
  if (!isDefined(option)) {
    return 0;
  }

  if (
    typeof option.probability === 'number' &&
    Number.isFinite(option.probability)
  ) {
    return Math.min(100, Math.max(0, option.probability));
  }

  if (isDefined(option.label)) {
    const match = option.label.match(LABEL_PERCENT_REGEX);
    if (isDefined(match?.[1])) {
      return Math.min(100, Math.max(0, Number(match[1])));
    }
  }

  const value = option.value?.toUpperCase?.() ?? '';
  if (AE_WON_STAGE_VALUES.has(value) || /GANADO|WON/.test(value)) {
    return 100;
  }
  if (AE_LOST_STAGE_VALUES.has(value) || /PERDIDO|LOST/.test(value)) {
    return 0;
  }

  return 0;
};

export const getStageProbabilityForValue = (
  stageValue: string | null | undefined,
  options: StageOptionLike[] | null | undefined,
): number => {
  if (!isDefined(stageValue) || !isDefined(options)) {
    return 0;
  }

  const option = options.find((item) => item.value === stageValue);
  return getStageProbability(option ?? { value: stageValue });
};
