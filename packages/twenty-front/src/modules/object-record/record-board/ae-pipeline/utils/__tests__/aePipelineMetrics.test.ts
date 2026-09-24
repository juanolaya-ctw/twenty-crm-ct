import { getStageProbability } from '@/object-record/record-board/ae-pipeline/utils/getStageProbability';
import { getStageProbabilityForValue } from '@/object-record/record-board/ae-pipeline/utils/getStageProbability';
import { computeColumnForecast } from '@/object-record/record-board/ae-pipeline/utils/computeColumnForecast';
import { computeAeOwnerPills } from '@/object-record/record-board/ae-pipeline/utils/computeAeOwnerPills';
import { isInCurrentQuarter } from '@/object-record/record-board/ae-pipeline/utils/isInCurrentQuarter';

describe('getStageProbability', () => {
  it('uses explicit probability on the option', () => {
    expect(
      getStageProbability({ value: 'COMMITTED', label: 'Committed', probability: 90 }),
    ).toBe(90);
  });

  it('parses percent from the label', () => {
    expect(
      getStageProbability({
        value: 'DISCOVERY_REALIZADA',
        label: 'Discovery realizada (20%)',
      }),
    ).toBe(20);
  });

  it('treats ganado as 100 when no percent', () => {
    expect(getStageProbability({ value: 'CIERRE_GANADO', label: 'Ganado' })).toBe(
      100,
    );
  });
});

describe('computeColumnForecast', () => {
  it('multiplies amount by stage probability', () => {
    const forecast = computeColumnForecast({
      records: [
        { amount: { amountMicros: 100_000_000_000 } },
        { amount: { amountMicros: 50_000_000_000 } },
      ],
      stageValue: 'COMMITTED',
      stageOptions: [{ value: 'COMMITTED', label: 'Committed (90%)', probability: 90 }],
    });

    expect(forecast).toBe(135_000);
  });
});

describe('computeAeOwnerPills', () => {
  it('aggregates cerrado (Q) and open pipe per AE owner', () => {
    const now = new Date('2026-09-24T12:00:00Z');
    const pills = computeAeOwnerPills({
      now,
      records: [
        {
          stage: 'CIERRE_GANADO',
          closeDate: '2026-09-10',
          amount: { amountMicros: 85_000_000_000 },
          owner: {
            id: 'ae-1',
            name: { firstName: 'Juanes', lastName: 'Olaya' },
          },
        },
        {
          stage: 'PROPUESTA_EN_NEGOCIACION',
          closeDate: '2026-10-01',
          amount: { amountMicros: 120_000_000_000 },
          owner: {
            id: 'ae-1',
            name: { firstName: 'Juanes', lastName: 'Olaya' },
          },
        },
        {
          stage: 'CIERRE_PERDIDO',
          closeDate: '2026-09-01',
          amount: { amountMicros: 10_000_000_000 },
          owner: {
            id: 'ae-1',
            name: { firstName: 'Juanes', lastName: 'Olaya' },
          },
        },
      ],
    });

    expect(pills).toHaveLength(1);
    expect(pills[0].ownerLabel).toBe('Juanes Olaya');
    expect(pills[0].closedAmount).toBe(85_000);
    expect(pills[0].openPipeAmount).toBe(120_000);
  });
});

describe('isInCurrentQuarter', () => {
  it('accepts dates in the current quarter', () => {
    expect(isInCurrentQuarter('2026-09-10', new Date('2026-09-24'))).toBe(true);
    expect(isInCurrentQuarter('2026-01-15', new Date('2026-09-24'))).toBe(false);
  });
});

describe('getStageProbabilityForValue', () => {
  it('looks up the matching option', () => {
    expect(
      getStageProbabilityForValue('DISCOVERY_REALIZADA', [
        { value: 'DISCOVERY_REALIZADA', label: 'Discovery (20%)', probability: 20 },
      ]),
    ).toBe(20);
  });
});
