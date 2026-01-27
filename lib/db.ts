import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("请在 .env.local 中定义 MONGODB_URI 环境变量");
}

/**
 * 使用 global.mongoose 确保在开发环境下热重载不会导致连接数耗尽
 */
// ... 前面的导入和 MONGODB_URI 检查保持不变

/**
 * 获取或初始化缓存
 */
let cached = global.mongoose;

// 如果没有缓存，立即初始化一个完整的对象挂载到全局
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  // 1. 使用类型保护，确保 cached 已经存在（虽然逻辑上已初始化，但需通过 TS 检查）
  if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    // 2. 这里的连接逻辑保持不变
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
