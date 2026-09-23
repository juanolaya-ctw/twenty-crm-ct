import { type FlatViewGroup } from 'src/engine/metadata-modules/flat-view-group/types/flat-view-group.type';
import {
  createStandardViewGroupFlatMetadata,
  type CreateStandardViewGroupArgs,
} from 'src/engine/workspace-manager/twenty-standard-application/utils/view-group/create-standard-view-group-flat-metadata.util';

export const computeStandardOpportunityViewGroups = (
  args: Omit<CreateStandardViewGroupArgs<'opportunity'>, 'context'>,
): Record<string, FlatViewGroup> => {
  return {
    byStageNew: createStandardViewGroupFlatMetadata({
      ...args,
      objectName: 'opportunity',
      context: {
        viewName: 'byStage',
        viewGroupName: 'new',
        isVisible: true,
        fieldValue: 'NEW',
        position: 0,
      },
    }),
    byStageQualification: createStandardViewGroupFlatMetadata({
      ...args,
      objectName: 'opportunity',
      context: {
        viewName: 'byStage',
        viewGroupName: 'qualification',
        isVisible: true,
        fieldValue: 'QUALIFICATION',
        position: 1,
      },
    }),
    byStageDemoDiscovery: createStandardViewGroupFlatMetadata({
      ...args,
      objectName: 'opportunity',
      context: {
        viewName: 'byStage',
        viewGroupName: 'demoDiscovery',
        isVisible: true,
        fieldValue: 'DEMO_DISCOVERY',
        position: 2,
      },
    }),
    byStageProposal: createStandardViewGroupFlatMetadata({
      ...args,
      objectName: 'opportunity',
      context: {
        viewName: 'byStage',
        viewGroupName: 'proposal',
        isVisible: true,
        fieldValue: 'PROPOSAL',
        position: 3,
      },
    }),
    byStageNegotiation: createStandardViewGroupFlatMetadata({
      ...args,
      objectName: 'opportunity',
      context: {
        viewName: 'byStage',
        viewGroupName: 'negotiation',
        isVisible: true,
        fieldValue: 'NEGOTIATION',
        position: 4,
      },
    }),
    byStageWon: createStandardViewGroupFlatMetadata({
      ...args,
      objectName: 'opportunity',
      context: {
        viewName: 'byStage',
        viewGroupName: 'won',
        isVisible: true,
        fieldValue: 'WON',
        position: 5,
      },
    }),
    byStageLost: createStandardViewGroupFlatMetadata({
      ...args,
      objectName: 'opportunity',
      context: {
        viewName: 'byStage',
        viewGroupName: 'lost',
        isVisible: true,
        fieldValue: 'LOST',
        position: 6,
      },
    }),
  };
};
