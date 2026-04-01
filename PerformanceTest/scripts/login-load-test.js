import exec from 'k6/execution';

import { CONFIG } from './config/test-config.js';
import { users } from './data/users-repository.js';
import { options } from './scenarios/scenario-factory.js';
import { executeLogin } from './services/login-service.js';
import { recordLoginMetrics, loginFailures } from './metrics/login-metrics.js';
import { validateLoginResponse } from './validations/login-validator.js';
import { buildSummaryFiles } from './reporting/summary-reporter.js';

export { options };

export function setup() {
  console.log(`[INFO] Active profile: ${CONFIG.profile}`);
  console.log(`[INFO] Endpoint: ${CONFIG.baseUrl}${CONFIG.loginPath}`);
  console.log(`[INFO] Users loaded: ${users.length}`);

  if (CONFIG.isExternalDependency) {
    console.warn(`[WARN] ${CONFIG.externalDependencyNote}`);
  }
}

function getCurrentUser() {
  const index = exec.scenario.iterationInTest % users.length;
  return users[index];
}

export default function () {
  const scenarioName = exec.scenario.name;
  const user = getCurrentUser();

  const response = executeLogin(user);
  const validation = validateLoginResponse(response, scenarioName);

  recordLoginMetrics(response, validation, scenarioName);

  if (!validation.passed) {
    loginFailures.add(1, { scenario: scenarioName, endpoint: 'login' });
  }
}

export function handleSummary(data) {
  return buildSummaryFiles(data, CONFIG);
}