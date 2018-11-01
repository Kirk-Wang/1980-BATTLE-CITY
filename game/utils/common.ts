type UpdaterMaker = (amount: number) => (x: number) => number;
export const or: UpdaterMaker = amount => x => x | amount;

export function getRowCol(t: number, N: number) {
    return [Math.floor(t / N), t % N];
}
