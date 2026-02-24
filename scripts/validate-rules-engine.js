import { validateAllBanksWithRulesEngine } from './query-offers.js';

async function main() {
  const report = await validateAllBanksWithRulesEngine();
  if (report.failedBanks > 0) {
    console.error(`Rules validation failed for ${report.failedBanks}/${report.totalBanks} bank JSON files`);
    for (const failure of report.failures) {
      console.error(`- ${failure.bankSlug}: ${failure.error}`);
    }
    process.exit(1);
    return;
  }

  console.log(`Rules validation passed for all ${report.totalBanks} bank JSON files`);
}

main().catch((err) => {
  console.error(err && err.message ? err.message : err);
  process.exit(1);
});
