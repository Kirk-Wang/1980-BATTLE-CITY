type UpdaterMaker = (amount: number) => (x: number) => number;
export const or: UpdaterMaker = amount => x => x | amount;
