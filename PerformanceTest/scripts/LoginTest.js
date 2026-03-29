import http from 'k6/http';
import { check, fail } from 'k6';
import exec from 'k6/execution';
import { SharedArray } from 'k6/data';
import { Counter, Rate } from 'k6/metrics';

const CONFIG = {
  baseUrl: __ENV.BASE_URL || 'https://fakestoreapi.com',
  loginPath: __ENV.LOGIN_PATH || '/auth/login',
  rate: Number(__ENV.RATE || 20),
  duration: __ENV.DURATION || '30s',
  preAllocatedVUs: Number(__ENV.PRE_ALLOCATED_VUS || 20),
  maxVUs: Number(__ENV.MAX_VUS || 100),
  responseTimeThresholdMs: Number(__ENV.RESPONSE_TIME_THRESHOLD_MS || 1500),
  errorRateThreshold: Number(__ENV.ERROR_RATE_THRESHOLD || 0.03),
  timeout: __ENV.TIMEOUT || '60s',
  csvPath: __ENV.CSV_PATH || '../data/users.csv',
};

const httpSuccessRate = new Rate('http_success_rate');
const businessSuccessRate = new Rate('business_success_rate');
const loginFailures = new Counter('login_failures');

function parseCsvLine(line) {
  const [username, password] = line.split(',');

  return {
    username: (username || '').trim(),
    password: (password || '').trim(),
  };
}

function validateCsvHeader(header) {
  if (header.toLowerCase() !== 'user,passwd') {
    fail(`Invalid CSV header: '${header}'. Expected 'user,passwd'.`);
  }
}

function loadUsers() {
  const fileContent = open(CONFIG.csvPath);
  const lines = fileContent
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length <= 1) {
    fail(`The CSV file '${CONFIG.csvPath}' does not contain test data.`);
  }

  validateCsvHeader(lines[0]);

  const users = lines.slice(1).map(parseCsvLine);

  const hasInvalidData = users.some((user) => !user.username || !user.password);
  if (hasInvalidData) {
    fail(`The CSV file '${CONFIG.csvPath}' contains empty username or password values.`);
  }

  return users;
}

const users = new SharedArray('login-users', loadUsers);

export const options = {
  scenarios: {
    login_load_test: {
      executor: 'constant-arrival-rate',
      rate: CONFIG.rate,
      timeUnit: '1s',
      duration: CONFIG.duration,
      preAllocatedVUs: CONFIG.preAllocatedVUs,
      maxVUs: CONFIG.maxVUs,
      tags: {
        test_type: 'load',
        endpoint: 'login',
      },
    },
  },
  thresholds: {
    http_req_failed: [`rate<${CONFIG.errorRateThreshold}`],
    http_req_duration: [`p(95)<${CONFIG.responseTimeThresholdMs}`],
    http_success_rate: ['rate>0.97'],
    business_success_rate: ['rate>0.97'],
    checks: ['rate>0.97'],
  },
  summaryTrendStats: ['avg', 'min', 'med', 'max', 'p(90)', 'p(95)', 'p(99)'],
};

function getCurrentUser() {
  const userIndex = exec.scenario.iterationInTest % users.length;
  return users[userIndex];
}

function buildRequestBody(user) {
  return JSON.stringify({
    username: user.username,
    password: user.password,
  });
}

function buildRequestParams() {
  return {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    tags: {
      name: 'POST /auth/login',
      endpoint: 'login',
    },
    timeout: CONFIG.timeout,
  };
}

function isValidLoginResponse(response) {
  const validStatus = response.status === 201;
  const hasToken = Boolean(response.json('token'));
  return validStatus && hasToken;
}

function logFailure(response, user) {
  console.error(
    JSON.stringify({
      message: 'Login request validation failed',
      username: user.username,
      status: response.status,
      duration: response.timings.duration,
      body: response.body,
    }),
  );
}

export default function () {
  const user = getCurrentUser();
  const requestBody = buildRequestBody(user);
  const requestParams = buildRequestParams();

  const response = http.post(
    `${CONFIG.baseUrl}${CONFIG.loginPath}`,
    requestBody,
    requestParams,
  );

  const isHttpSuccess = response.status === 201;;
  const isBusinessSuccess = isValidLoginResponse(response);

  httpSuccessRate.add(isHttpSuccess);
  businessSuccessRate.add(isBusinessSuccess);

  const validationsPassed = check(response, {
    'login returns a successful status': (res) => res.status === 201,
    'login response time is below threshold': (res) =>
      res.timings.duration < CONFIG.responseTimeThresholdMs,
    'login response includes token': (res) => Boolean(res.json('token')),
  });

  if (!validationsPassed) {
    loginFailures.add(1);
    logFailure(response, user);
  }
}

export function handleSummary(data) {
  return {
    'results/summary.json': JSON.stringify(data, null, 2),
  };
}