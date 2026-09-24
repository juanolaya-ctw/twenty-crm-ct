import { isDefined } from 'twenty-shared/utils';

export const getOwnerDisplayName = (
  owner:
    | {
        id?: string;
        name?:
          | string
          | {
              firstName?: string | null;
              lastName?: string | null;
            }
          | null;
      }
    | null
    | undefined,
): { id: string; label: string } | null => {
  if (!isDefined(owner?.id)) {
    return null;
  }

  const name = owner.name;
  let label = '';

  if (typeof name === 'string') {
    label = name.trim();
  } else if (isDefined(name)) {
    label = `${name.firstName ?? ''} ${name.lastName ?? ''}`.trim();
  }

  if (!label) {
    label = 'Sin AE';
  }

  return { id: owner.id, label };
};
