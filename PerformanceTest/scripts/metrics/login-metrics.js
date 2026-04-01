import { Counter, Rate, Trend } from 'k6/metrics';

export const httpSuccessRate = new Rate('http_success_rate');
export const businessSuccessRate = new Rate('business_success_rate');
export const sloViolationRate = new Rate('slo_violation_rate');
export const loginDuration = new Trend('login_duration', true);
export const loginFailures = new Counter('login_failures');

export function recordLoginMetrics(response, validation, scenarioName) {
  const tags = {
    scenario: scenarioName,
    endpoint: 'login',
  };

  loginDuration.add(response.timings.duration, tags);
  httpSuccessRate.add(validation.isHttpSuccess, tags);
  businessSuccessRate.add(validation.isBusinessSuccess, tags);
  sloViolationRate.add(!validation.isWithinSlo || !validation.isBusinessSuccess, tags);
}