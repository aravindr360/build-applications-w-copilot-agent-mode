import test from 'node:test';
import assert from 'node:assert/strict';
import { app, getApiBaseUrl } from "./index.js";
test('express app exposes the API entry point', () => {
    assert.ok(app);
});
test('uses the Codespaces URL when a codespace name is available', () => {
    const url = getApiBaseUrl(8000, 'octofit-demo');
    assert.equal(url, 'https://octofit-demo-8000.app.github.dev');
});
test('falls back to localhost when no codespace name is available', () => {
    const originalCodespaceName = process.env.CODESPACE_NAME;
    delete process.env.CODESPACE_NAME;
    try {
        const url = getApiBaseUrl(8000);
        assert.equal(url, 'http://localhost:8000');
    }
    finally {
        if (originalCodespaceName !== undefined) {
            process.env.CODESPACE_NAME = originalCodespaceName;
        }
    }
});
