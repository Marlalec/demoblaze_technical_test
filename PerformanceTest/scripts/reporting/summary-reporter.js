function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function csvEscape(value) {
  const normalized = String(value ?? '');
  if (normalized.includes(',') || normalized.includes('"') || normalized.includes('\n')) {
    return `"${normalized.replace(/"/g, '""')}"`;
  }
  return normalized;
}

function buildMetricsRows(data) {
  return Object.entries(data.metrics)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([metricName, metricData]) => {
      const values = Object.entries(metricData.values || {})
        .map(([key, value]) => `${key}=${value}`)
        .join(' | ');

      const thresholds = Object.entries(metricData.thresholds || {})
        .map(([key, threshold]) => `${key}:${threshold.ok ? 'PASS' : 'FAIL'}`)
        .join(' | ');

      return {
        metricName,
        metricType: metricData.type || '',
        contains: metricData.contains || '',
        values,
        thresholds,
      };
    });
}

function buildTextSummary(data, config) {
  const rows = buildMetricsRows(data);

  const lines = [
    'SOFKA - Login Load Test Summary',
    `Profile: ${config.profile}`,
    `Endpoint: ${config.baseUrl}${config.loginPath}`,
    `Latency target: p(95) < ${config.responseTimeThresholdMs} ms`,
    `Error target: rate < ${(config.errorRateThreshold * 100).toFixed(2)}%`,
    `Dependency note: ${config.externalDependencyNote}`,
    '',
    'Aggregated metrics:',
  ];

  rows.forEach((row) => {
    lines.push(`- ${row.metricName}`);
    lines.push(`  type=${row.metricType}`);
    if (row.contains) lines.push(`  contains=${row.contains}`);
    if (row.values) lines.push(`  values=${row.values}`);
    if (row.thresholds) lines.push(`  thresholds=${row.thresholds}`);
  });

  return lines.join('\n');
}

function buildCsvSummary(data) {
  const rows = buildMetricsRows(data);
  const header = 'metric_name,metric_type,contains,values,thresholds';

  const body = rows.map((row) => [
    csvEscape(row.metricName),
    csvEscape(row.metricType),
    csvEscape(row.contains),
    csvEscape(row.values),
    csvEscape(row.thresholds),
  ].join(','));

  return [header, ...body].join('\n');
}

function buildHtmlSummary(data, config) {
  const rows = buildMetricsRows(data)
    .map((row) => `
      <tr>
        <td>${escapeHtml(row.metricName)}</td>
        <td>${escapeHtml(row.metricType)}</td>
        <td>${escapeHtml(row.contains)}</td>
        <td>${escapeHtml(row.values)}</td>
        <td>${escapeHtml(row.thresholds)}</td>
      </tr>`)
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>k6 Login Test Summary</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 24px; color: #1f2937; }
    table { width: 100%; border-collapse: collapse; margin-top: 16px; }
    th, td { border: 1px solid #d1d5db; padding: 10px; text-align: left; vertical-align: top; }
    th { background: #f3f4f6; }
  </style>
</head>
<body>
  <h1>SOFKA - Login Load Test Summary</h1>
  <p><strong>Profile:</strong> ${escapeHtml(config.profile)}</p>
  <p><strong>Endpoint:</strong> ${escapeHtml(`${config.baseUrl}${config.loginPath}`)}</p>
  <p><strong>Latency target:</strong> p(95) &lt; ${escapeHtml(config.responseTimeThresholdMs)} ms</p>
  <p><strong>Error target:</strong> rate &lt; ${escapeHtml((config.errorRateThreshold * 100).toFixed(2))}%</p>
  <p><strong>Dependency note:</strong> ${escapeHtml(config.externalDependencyNote)}</p>

  <table>
    <thead>
      <tr>
        <th>Metric</th>
        <th>Type</th>
        <th>Contains</th>
        <th>Values</th>
        <th>Thresholds</th>
      </tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>
</body>
</html>`;
}

export function buildSummaryFiles(data, config) {
  const text = buildTextSummary(data, config);

  return {
    stdout: `${text}\n`,
    [`${config.resultsDir}/summary.txt`]: text,
    [`${config.resultsDir}/summary.json`]: JSON.stringify(data, null, 2),
    [`${config.resultsDir}/summary.csv`]: buildCsvSummary(data),
    [`${config.resultsDir}/summary.html`]: buildHtmlSummary(data, config),
  };
}