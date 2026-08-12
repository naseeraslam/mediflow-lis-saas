import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL || "file:./dev.db",
});

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Force fresh PrismaClient instance in development to immediately pick up schema migrations
export const db = new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}

/**
 * Tenant Scoping Security Helper
 * Enforces that write/query operations strictly include the tenant orgId
 */
export function tenantScope<T extends { orgId: string }>(orgId: string, data: Omit<T, "orgId">): T {
  if (!orgId) {
    throw new Error("TENANT SECURITY VIOLATION: Missing orgId in operation context.");
  }
  return {
    ...data,
    orgId,
  } as T;
}
