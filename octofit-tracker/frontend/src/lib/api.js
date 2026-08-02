const getCodespaceName = () => {
  const value = import.meta.env?.VITE_CODESPACE_NAME;
  return typeof value === 'string' ? value.trim() : '';
};

export const getApiBaseUrl = () => {
  const codespaceName = getCodespaceName();

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
};

export const buildApiUrl = (resourcePath) => `${getApiBaseUrl()}${resourcePath}`;

export const normalizeCollectionResponse = (payload, fallbackKey) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (!payload || typeof payload !== 'object') {
    return [];
  }

  if (Array.isArray(payload[fallbackKey])) {
    return payload[fallbackKey];
  }

  if (Array.isArray(payload.results)) {
    return payload.results;
  }

  if (Array.isArray(payload.items)) {
    return payload.items;
  }

  if (Array.isArray(payload.data)) {
    return payload.data;
  }

  if (Array.isArray(payload.records)) {
    return payload.records;
  }

  const nestedKey = Object.keys(payload).find((key) => Array.isArray(payload[key]));
  return nestedKey ? payload[nestedKey] : [];
};
