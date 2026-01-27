import { Mongoose } from "mongoose";

declare global {
  // 这里的 var 是必须的，不能用 let 或 const，否则无法正确挂载到 global
  var mongoose:
    | {
        conn: Mongoose | null;
        promise: Promise<Mongoose> | null;
      }
    | undefined;
}

export {};
