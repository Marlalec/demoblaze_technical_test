import { CONFIG } from '../config/test-config.js';

function buildConstantArrivalScenario({ rate, duration, startTime, testType }) {
  return {
    executor: 'constant-arrival-rate',
    rate,
    timeUnit: '1s',
    duration,
    startTime,
    gracefulStop: '0s',
    preAllocatedVUs: CONFIG.preAllocatedVUs,
    maxVUs: CONFIG.maxVUs,
    tags: {
      test_type: testType,
      endpoint: 'login',
    },
  };
}

function buildStressScenario(startTime) {
  return {
    executor: 'ramping-arrival-rate',
    startRate: CONFIG.stressStartRate,
    timeUnit: '1s',
    startTime,
    gracefulStop: '0s',
    preAllocatedVUs: CONFIG.preAllocatedVUs,
    maxVUs: CONFIG.maxVUs,
    stages: CONFIG.stressStages,
    tags: {
      test_type: 'stress',
      endpoint: 'login',
    },
  };
}

function getStressDurationInSeconds() {
  return CONFIG.stressStages.reduce(
    (total, stage) => total + CONFIG.parseDurationToSeconds(stage.duration),
    0,
  );
}

function buildScenarios() {
  if (CONFIG.profile === 'baseline') {
    return {
      baseline_comparison: buildConstantArrivalScenario({
        rate: CONFIG.baselineRate,
        duration: CONFIG.baselineDuration,
        startTime: '0s',
        testType: 'baseline',
      }),
    };
  }

  if (CONFIG.profile === 'load') {
    return {
      load_target: buildConstantArrivalScenario({
        rate: CONFIG.loadRate,
        duration: CONFIG.loadDuration,
        startTime: '0s',
        testType: 'load',
      }),
    };
  }

  if (CONFIG.profile === 'stress') {
    return {
      stress_breakpoint: buildStressScenario('0s'),
    };
  }

  if (CONFIG.profile === 'soak') {
    return {
      soak_stability: buildConstantArrivalScenario({
        rate: CONFIG.soakRate,
        duration: CONFIG.soakDuration,
        startTime: '0s',
        testType: 'soak',
      }),
    };
  }

  let offset = 0;

  const scenarios = {
    baseline_comparison: buildConstantArrivalScenario({
      rate: CONFIG.baselineRate,
      duration: CONFIG.baselineDuration,
      startTime: CONFIG.secondsToDuration(offset),
      testType: 'baseline',
    }),
  };

  offset += CONFIG.parseDurationToSeconds(CONFIG.baselineDuration);

  scenarios.load_target = buildConstantArrivalScenario({
    rate: CONFIG.loadRate,
    duration: CONFIG.loadDuration,
    startTime: CONFIG.secondsToDuration(offset),
    testType: 'load',
  });

  offset += CONFIG.parseDurationToSeconds(CONFIG.loadDuration);

  scenarios.stress_breakpoint = buildStressScenario(CONFIG.secondsToDuration(offset));

  offset += getStressDurationInSeconds();

  scenarios.soak_stability = buildConstantArrivalScenario({
    rate: CONFIG.soakRate,
    duration: CONFIG.soakDuration,
    startTime: CONFIG.secondsToDuration(offset),
    testType: 'soak',
  });

  return scenarios;
}

function addStrictThresholds(thresholds, scenarioName) {
  thresholds[`http_req_failed{scenario:${scenarioName}}`] = [`rate<${CONFIG.errorRateThreshold}`];
  thresholds[`http_req_duration{scenario:${scenarioName}}`] = [`p(95)<${CONFIG.responseTimeThresholdMs}`];
  thresholds[`checks{scenario:${scenarioName}}`] = [`rate>${CONFIG.successRateThreshold}`];
  thresholds[`http_success_rate{scenario:${scenarioName}}`] = [`rate>${CONFIG.successRateThreshold}`];
  thresholds[`business_success_rate{scenario:${scenarioName}}`] = [`rate>${CONFIG.successRateThreshold}`];
  thresholds[`dropped_iterations{scenario:${scenarioName}}`] = ['count==0'];
}

function buildThresholds(scenarios) {
  const thresholds = {};
  const strictScenarios = ['baseline_comparison', 'load_target', 'soak_stability'];

  strictScenarios.forEach((scenarioName) => {
    if (scenarios[scenarioName]) {
      addStrictThresholds(thresholds, scenarioName);
    }
  });

  return thresholds;
}

const scenarios = buildScenarios();

export const options = {
  scenarios,
  thresholds: buildThresholds(scenarios),
  summaryTrendStats: ['avg', 'min', 'med', 'max', 'p(90)', 'p(95)', 'p(99)'],
};