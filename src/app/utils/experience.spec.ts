import { calculateYearsOfExperience } from './experience';

describe('calculateYearsOfExperience', () => {
  it('returns full elapsed years from the default start date', () => {
    const result = calculateYearsOfExperience(
      new Date(2019, 10, 1),
      new Date(2026, 10, 1)
    );

    expect(result).toBe(7);
  });

  it('does not return negative years for dates before the start date', () => {
    const result = calculateYearsOfExperience(
      new Date(2019, 10, 1),
      new Date(2018, 10, 1)
    );

    expect(result).toBe(0);
  });
});
