import { fail } from 'k6';

function toNumber(value, fallback) {
  const parsed = Number(value);
  return Number.isNaN(parsed) ? fallback : parsed;
}

function parseDurationToSeconds(duration) {
  const matches = String(duration).match(/(\d+)([smh])/g);

  if (!matches) {
    fail(`Unsupported duration format: '${duration}'`);
  }

  return matches.reduce((total, part) => {
    const [, rawValue, unit] = part.match(/(\d+)([smh])/);
    const value = Number(rawValue);

    if (unit === 's') return total + value;
    if (unit === 'm') return total + value * 60;
    return total + value * 3600;
  }, 0);
}

function secondsToDuration(seconds) {
  return `${seconds}s`;
}

export const CONFIG = {
  baseUrl: __ENV.BASE_URL || 'https://fakestoreapi.com',
  loginPath: __ENV.LOGIN_PATH || '/auth/login',
  expectedStatus: toNumber(__ENV.EXPECTED_STATUS, 201),
  timeout: __ENV.TIMEOUT || '60s',
  csvPath: __ENV.CSV_PATH || '../../data/users.csv',

  responseTimeThresholdMs: toNumber(__ENV.RESPONSE_TIME_THRESHOLD_MS, 1500),
  errorRateThreshold: toNumber(__ENV.ERROR_RATE_THRESHOLD, 0.03),
  successRateThreshold: toNumber(__ENV.SUCCESS_RATE_THRESHOLD, 0.97),

  preAllocatedVUs: toNumber(__ENV.PRE_ALLOCATED_VUS, 30),
  maxVUs: toNumber(__ENV.MAX_VUS, 150),

  profile: (__ENV.TEST_PROFILE || 'full').toLowerCase(),

  baselineRate: toNumber(__ENV.BASELINE_RATE, 5),
  baselineDuration: __ENV.BASELINE_DURATION || '30s',

  loadRate: toNumber(__ENV.LOAD_RATE, 20),
  loadDuration: __ENV.LOAD_DURATION || '1m',

  soakRate: toNumber(__ENV.SOAK_RATE, 20),
  soakDuration: __ENV.SOAK_DURATION || '3m',

  stressStartRate: toNumber(__ENV.STRESS_START_RATE, 10),
  stressStages: [
    { target: toNumber(__ENV.STRESS_STAGE_1_TARGET, 20), duration: __ENV.STRESS_STAGE_1_DURATION || '30s' },
    { target: toNumber(__ENV.STRESS_STAGE_2_TARGET, 30), duration: __ENV.STRESS_STAGE_2_DURATION || '30s' },
    { target: toNumber(__ENV.STRESS_STAGE_3_TARGET, 40), duration: __ENV.STRESS_STAGE_3_DURATION || '30s' },
    { target: toNumber(__ENV.STRESS_STAGE_4_TARGET, 50), duration: __ENV.STRESS_STAGE_4_DURATION || '30s' },
    { target: 0, duration: __ENV.STRESS_RAMP_DOWN_DURATION || '15s' },
  ],

  resultsDir: __ENV.RESULTS_DIR || 'results',
};

CONFIG.isExternalDependency = CONFIG.baseUrl.includes('fakestoreapi.com');
CONFIG.externalDependencyNote = CONFIG.isExternalDependency
  ? 'The test uses fakestoreapi.com as an external public dependency. Results can vary due to internet latency, public throttling, or third-party instability.'
  : 'The test points to a custom environment through BASE_URL.';

CONFIG.parseDurationToSeconds = parseDurationToSeconds;
CONFIG.secondsToDuration = secondsToDuration;

if (CONFIG.loadRate < 20 && (CONFIG.profile === 'load' || CONFIG.profile === 'full')) {
  fail(`LOAD_RATE must be at least 20 TPS. Current value: ${CONFIG.loadRate}`);
}

if (CONFIG.preAllocatedVUs <= 0 || CONFIG.maxVUs < CONFIG.preAllocatedVUs) {
  fail('Invalid VU configuration. Ensure PRE_ALLOCATED_VUS > 0 and MAX_VUS >= PRE_ALLOCATED_VUS.');
}