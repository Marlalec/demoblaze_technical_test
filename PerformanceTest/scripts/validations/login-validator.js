import { check } from 'k6';
import { CONFIG } from '../config/test-config.js';

function extractToken(response) {
  try {
    const body = response.json();
    return body && body.token ? body.token : null;
  } catch (error) {
    return null;
  }
}

function truncate(value, maxLength = 500) {
  const text = String(value || '');
  return text.length > maxLength ? `${text.slice(0, maxLength)}... [truncated]` : text;
}

function logFailure(response, scenarioName) {
  console.error(JSON.stringify({
    message: 'Login request validation failed',
    scenario: scenarioName,
    status: response.status,
    duration: response.timings.duration,
    body: truncate(response.body),
  }));
}

export function validateLoginResponse(response, scenarioName) {
  const token = extractToken(response);

  const isHttpSuccess = response.status === CONFIG.expectedStatus;
  const isBusinessSuccess = Boolean(token);
  const isWithinSlo = response.timings.duration < CONFIG.responseTimeThresholdMs;

  const checksPassed = check(response, {
    'login returns expected status': () => isHttpSuccess,
    'login response includes token': () => isBusinessSuccess,
    'login response time is below threshold': () => isWithinSlo,
  });

  const passed = isHttpSuccess && isBusinessSuccess && isWithinSlo && checksPassed;

  if (!passed) {
    logFailure(response, scenarioName);
  }

  return {
    passed,
    isHttpSuccess,
    isBusinessSuccess,
    isWithinSlo,
    duration: response.timings.duration,
  };
}