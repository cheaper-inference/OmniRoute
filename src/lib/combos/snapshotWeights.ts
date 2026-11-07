/** Normalize a static snapshot in place without removing or reordering candidates. */
export function normalizeSnapshotWeights(models: { weight: number }[]): void {
  const totalWeight = models.reduce((sum, model) => sum + model.weight, 0);
  if (totalWeight <= 0 || models.length === 0) return;

  for (const model of models) {
    model.weight = Math.max(1, Math.floor((model.weight / totalWeight) * 100));
  }
  const roundedTotal = models.reduce((sum, model) => sum + model.weight, 0);
  // A minimum integer weight cannot fit large or highly skewed pools into 100.
  // Scale only those overflowing distributions; retain every candidate's share.
  if (roundedTotal > 100) {
    let assigned = 0;
    for (let i = 0; i < models.length - 1; i++) {
      models[i].weight = (models[i].weight / roundedTotal) * 100;
      assigned += models[i].weight;
    }
    models[models.length - 1].weight = 100 - assigned;
    return;
  }

  let remainder = 100 - roundedTotal;
  for (let i = 0; i < models.length && remainder > 0; i++) {
    models[i].weight++;
    remainder--;
  }
}
