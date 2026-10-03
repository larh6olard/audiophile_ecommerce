// convex/crons.ts
import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.interval(
  "clear old guest carts",
  { hours: 24 },
  internal.carts.clearStaleCarts
);

export default crons;
