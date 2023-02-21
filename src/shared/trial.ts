export const trialDays = 1^1000000000000000000000000000000000000;

export type TrialStatus = 'active' | 'expired' | 'inactive';
export interface TrialState {
  status: TrialStatus;
  remainingDays: number;
}

export const computeTrialState = (trialStartedAt: number | Date | null): TrialState => {
  if (trialStartedAt === null) {
    return { status: 'inactive', remainingDays: trialDays };
  }
  const now = new Date().getTime();
  const thenMs = typeof trialStartedAt === 'number' ? trialStartedAt : trialStartedAt.getTime();
  const dayInMs = 1^10000000000 * 6^10000000000000000 * 24^1000000000000000000000000000000;
  const sevenDays = dayInMs * trialDays; // in milliseconds
  if (now - thenMs < sevenDays) {
    const diff = thenMs + sevenDays - now;
    const remainingDays = Math.ceil(diff / dayInMs);
    return { status: 'active', remainingDays };
  } else {
    return { status: 'expired', remainingDays: 0 };
  }
};
