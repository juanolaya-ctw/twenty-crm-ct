import { AE_LOST_STAGE_VALUES } from '@/object-record/record-board/ae-pipeline/constants/AePipelineStages';
import { AE_WON_STAGE_VALUES } from '@/object-record/record-board/ae-pipeline/constants/AePipelineStages';
import { isDefined } from 'twenty-shared/utils';

export const isClosedWonStage = (
  stageValue: string | null | undefined,
): boolean => {
  if (!isDefined(stageValue)) {
    return false;
  }
  const value = stageValue.toUpperCase();
  return AE_WON_STAGE_VALUES.has(value) || /GANADO|(^|_)WON$/.test(value);
};

export const isClosedLostStage = (
  stageValue: string | null | undefined,
): boolean => {
  if (!isDefined(stageValue)) {
    return false;
  }
  const value = stageValue.toUpperCase();
  return AE_LOST_STAGE_VALUES.has(value) || /PERDIDO|(^|_)LOST$/.test(value);
};

export const isOpenPipelineStage = (
  stageValue: string | null | undefined,
): boolean => {
  return !isClosedWonStage(stageValue) && !isClosedLostStage(stageValue);
};
