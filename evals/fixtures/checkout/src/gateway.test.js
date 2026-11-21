import { test } from "node:test";
import assert from "node:assert/strict";
import { refund } from "./gateway.js";

test("refund of zero is a no-op", async () => {
  assert.deepEqual(await refund(0), { status: "noop" });
});

test("negative refund is rejected", async () => {
  await assert.rejects(refund(-1), RangeError);
});
