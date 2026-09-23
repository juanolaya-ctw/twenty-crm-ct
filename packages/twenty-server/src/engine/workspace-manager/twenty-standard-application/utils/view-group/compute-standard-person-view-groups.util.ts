import { type FlatViewGroup } from 'src/engine/metadata-modules/flat-view-group/types/flat-view-group.type';
import {
  createStandardViewGroupFlatMetadata,
  type CreateStandardViewGroupArgs,
} from 'src/engine/workspace-manager/twenty-standard-application/utils/view-group/create-standard-view-group-flat-metadata.util';

export const computeStandardPersonViewGroups = (
  args: Omit<CreateStandardViewGroupArgs<'person'>, 'context'>,
): Record<string, FlatViewGroup> => {
  return {
    bySdrStageToContact: createStandardViewGroupFlatMetadata({
      ...args,
      objectName: 'person',
      context: {
        viewName: 'bySdrStage',
        viewGroupName: 'toContact',
        isVisible: true,
        fieldValue: 'TO_CONTACT',
        position: 0,
      },
    }),
    bySdrStageContacted: createStandardViewGroupFlatMetadata({
      ...args,
      objectName: 'person',
      context: {
        viewName: 'bySdrStage',
        viewGroupName: 'contacted',
        isVisible: true,
        fieldValue: 'CONTACTED',
        position: 1,
      },
    }),
    bySdrStageTouchPoint2: createStandardViewGroupFlatMetadata({
      ...args,
      objectName: 'person',
      context: {
        viewName: 'bySdrStage',
        viewGroupName: 'touchPoint2',
        isVisible: true,
        fieldValue: 'TOUCH_POINT_2',
        position: 2,
      },
    }),
    bySdrStageTouchPoint3: createStandardViewGroupFlatMetadata({
      ...args,
      objectName: 'person',
      context: {
        viewName: 'bySdrStage',
        viewGroupName: 'touchPoint3',
        isVisible: true,
        fieldValue: 'TOUCH_POINT_3',
        position: 3,
      },
    }),
    bySdrStageTouchPoint4: createStandardViewGroupFlatMetadata({
      ...args,
      objectName: 'person',
      context: {
        viewName: 'bySdrStage',
        viewGroupName: 'touchPoint4',
        isVisible: true,
        fieldValue: 'TOUCH_POINT_4',
        position: 4,
      },
    }),
    bySdrStageTouchPoint5: createStandardViewGroupFlatMetadata({
      ...args,
      objectName: 'person',
      context: {
        viewName: 'bySdrStage',
        viewGroupName: 'touchPoint5',
        isVisible: true,
        fieldValue: 'TOUCH_POINT_5',
        position: 5,
      },
    }),
    bySdrStageTouchPoint6: createStandardViewGroupFlatMetadata({
      ...args,
      objectName: 'person',
      context: {
        viewName: 'bySdrStage',
        viewGroupName: 'touchPoint6',
        isVisible: true,
        fieldValue: 'TOUCH_POINT_6',
        position: 6,
      },
    }),
    bySdrStageHot: createStandardViewGroupFlatMetadata({
      ...args,
      objectName: 'person',
      context: {
        viewName: 'bySdrStage',
        viewGroupName: 'hot',
        isVisible: true,
        fieldValue: 'HOT',
        position: 7,
      },
    }),
    bySdrStageMeetingScheduled: createStandardViewGroupFlatMetadata({
      ...args,
      objectName: 'person',
      context: {
        viewName: 'bySdrStage',
        viewGroupName: 'meetingScheduled',
        isVisible: true,
        fieldValue: 'MEETING_SCHEDULED',
        position: 8,
      },
    }),
    bySdrStageReschedule: createStandardViewGroupFlatMetadata({
      ...args,
      objectName: 'person',
      context: {
        viewName: 'bySdrStage',
        viewGroupName: 'reschedule',
        isVisible: true,
        fieldValue: 'RESCHEDULE',
        position: 9,
      },
    }),
    bySdrStageUnqualified: createStandardViewGroupFlatMetadata({
      ...args,
      objectName: 'person',
      context: {
        viewName: 'bySdrStage',
        viewGroupName: 'unqualified',
        isVisible: true,
        fieldValue: 'UNQUALIFIED',
        position: 10,
      },
    }),
    bySdrStageNotInterested: createStandardViewGroupFlatMetadata({
      ...args,
      objectName: 'person',
      context: {
        viewName: 'bySdrStage',
        viewGroupName: 'notInterested',
        isVisible: true,
        fieldValue: 'NOT_INTERESTED',
        position: 11,
      },
    }),
    bySdrStageNurturing: createStandardViewGroupFlatMetadata({
      ...args,
      objectName: 'person',
      context: {
        viewName: 'bySdrStage',
        viewGroupName: 'nurturing',
        isVisible: true,
        fieldValue: 'NURTURING',
        position: 12,
      },
    }),
  };
};
