import test from 'node:test';
import assert from 'node:assert/strict';
import { app } from './index.ts';
test('express app exposes the API entry point', () => {
    assert.ok(app);
});
