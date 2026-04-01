import http from 'k6/http';
import { CONFIG } from '../config/test-config.js';

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

export function executeLogin(user) {
  return http.post(
    `${CONFIG.baseUrl}${CONFIG.loginPath}`,
    buildRequestBody(user),
    buildRequestParams(),
  );
}