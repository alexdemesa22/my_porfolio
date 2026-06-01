export function calculateYearsOfExperience(
  startDate = new Date(2019, 10, 1),
  currentDate = new Date()
): number {
  const diffTime = Math.max(0, currentDate.getTime() - startDate.getTime());
  const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);

  return Math.floor(diffYears);
}
