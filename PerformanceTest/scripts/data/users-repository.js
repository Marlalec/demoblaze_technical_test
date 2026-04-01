import { SharedArray } from 'k6/data';
import { fail } from 'k6';
import { CONFIG } from '../config/test-config.js';

function validateHeader(header) {
  if (header.toLowerCase() !== 'user,passwd') {
    fail(`Invalid CSV header: '${header}'. Expected 'user,passwd'.`);
  }
}

function parseLine(line) {
  const [username, password] = line.split(',');

  return {
    username: (username || '').trim(),
    password: (password || '').trim(),
  };
}

function loadUsers() {
  const content = open(CONFIG.csvPath);
  const lines = content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length <= 1) {
    fail(`The CSV file '${CONFIG.csvPath}' does not contain test data.`);
  }

  validateHeader(lines[0]);

  const parsedUsers = lines.slice(1).map(parseLine);
  const hasEmptyValues = parsedUsers.some((user) => !user.username || !user.password);

  if (hasEmptyValues) {
    fail(`The CSV file '${CONFIG.csvPath}' contains empty username or password values.`);
  }

  return parsedUsers;
}

export const users = new SharedArray('login-users', loadUsers);