
// Helper function to check if a deadline is in the future (still active)
export function isActive(deadline: string): boolean {
  const deadlineDate = new Date(deadline);
  const now = new Date();
  return deadlineDate >= now;
}
