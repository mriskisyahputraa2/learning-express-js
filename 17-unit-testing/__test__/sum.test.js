import { sum } from "../src/index.js";

test("Penjumlahan 2 dan 4", () => {
  const hasil = sum(2, 4);
  expect(hasil).toBe(6);
});
