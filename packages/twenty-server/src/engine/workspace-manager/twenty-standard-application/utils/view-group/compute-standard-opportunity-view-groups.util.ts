import { type FlatViewGroup } from 'src/engine/metadata-modules/flat-view-group/types/flat-view-group.type';
import {
  createStandardViewGroupFlatMetadata,
  type CreateStandardViewGroupArgs,
} from 'src/engine/workspace-manager/twenty-standard-application/utils/view-group/create-standard-view-group-flat-metadata.util';

export const computeStandardOpportunityViewGroups = (
  args: Omit<CreateStandardViewGroupArgs<'opportunity'>, 'context'>,
): Record<string, FlatViewGroup> => {
  return {
    byStageDiscoveryDone: createStandardViewGroupFlatMetadata({
      ...args,
      objectName: 'opportunity',
      context: {
        viewName: 'byStage',
        viewGroupName: 'discoveryDone',
        isVisible: true,
        fieldValue: 'DISCOVERY_DONE',
        position: 0,
      },
    }),
    byStageProposalBuilding: createStandardViewGroupFlatMetadata({
      ...args,
      objectName: 'opportunity',
      context: {
        viewName: 'byStage',
        viewGroupName: 'proposalBuilding',
        isVisible: true,
        fieldValue: 'PROPOSAL_BUILDING',
        position: 1,
      },
    }),
    byStageProposalPresented: createStandardViewGroupFlatMetadata({
      ...args,
      objectName: 'opportunity',
      context: {
        viewName: 'byStage',
        viewGroupName: 'proposalPresented',
        isVisible: true,
        fieldValue: 'PROPOSAL_PRESENTED',
        position: 2,
      },
    }),
    byStageProposalReviewed: createStandardViewGroupFlatMetadata({
      ...args,
      objectName: 'opportunity',
      context: {
        viewName: 'byStage',
        viewGroupName: 'proposalReviewed',
        isVisible: true,
        fieldValue: 'PROPOSAL_REVIEWED',
        position: 3,
      },
    }),
    byStageProposalNegotiation: createStandardViewGroupFlatMetadata({
      ...args,
      objectName: 'opportunity',
      context: {
        viewName: 'byStage',
        viewGroupName: 'proposalNegotiation',
        isVisible: true,
        fieldValue: 'PROPOSAL_NEGOTIATION',
        position: 4,
      },
    }),
    byStageCommitted: createStandardViewGroupFlatMetadata({
      ...args,
      objectName: 'opportunity',
      context: {
        viewName: 'byStage',
        viewGroupName: 'committed',
        isVisible: true,
        fieldValue: 'COMMITTED',
        position: 5,
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
        position: 6,
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
        position: 7,
      },
    }),
  };
};
