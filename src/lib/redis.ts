import { Ratelimit } from "@upstash/ratelimit"
import Redis from "ioredis"

interface RatelimitRedis {
	get: <TData = string>(key: string) => Promise<TData | null>
	set: <TData = string>(
		key: string,
		value: TData,
		options?: { ex?: number },
	) => Promise<"OK" | TData | null>
	sadd: <TData>(key: string, ...members: TData[]) => Promise<number>
	eval: <TArgs extends unknown[], TData = unknown>(
		script: string,
		keys: string[],
		args: TArgs,
	) => Promise<TData>
	scriptLoad: (script: string) => Promise<string>
	smismember: (key: string, members: unknown[]) => Promise<(0 | 1)[]>
	evalsha: <TData>(
		sha1: string,
		keys: string[],
		args: unknown[],
	) => Promise<TData>
	hset: <TData>(key: string, kv: Record<string, TData>) => Promise<number>
}

if (!process.env.REDIS_URL) throw new Error("REDIS_URL is not set")
const redis = new Redis(process.env.REDIS_URL)

const redisAdapter: RatelimitRedis = {
	get: async <TData = string>(key: string) =>
		redis.get(key) as Promise<TData | null>,
	set: async <TData = string>(
		key: string,
		value: TData,
		options?: { ex?: number },
	) => {
		if (options?.ex)
			return redis.set(key, String(value), "EX", options.ex) as Promise<
				"OK" | TData | null
			>
		else return redis.set(key, String(value)) as Promise<"OK" | TData | null>
	},
	sadd: async <TData>(key: string, ...members: TData[]) =>
		redis.sadd(key, ...members.map(String)),
	eval: async <TArgs extends unknown[], TData = unknown>(
		script: string,
		keys: string[],
		args: TArgs,
	) =>
		redis.eval(
			script,
			keys.length,
			...keys,
			...(args ?? []).map(String),
		) as Promise<TData>,
	scriptLoad: async (script: string) =>
		redis.script("LOAD", script) as Promise<string>,
	smismember: async (key: string, members: unknown[]) =>
		redis.smismember(key, ...(members as string[])) as Promise<(0 | 1)[]>,
	evalsha: async <TData>(sha1: string, keys: string[], args: unknown[]) =>
		redis.evalsha(
			sha1,
			keys.length,
			...keys,
			...(args as string[]),
		) as Promise<TData>,
	hset: async <TData>(key: string, kv: Record<string, TData>) =>
		redis.hset(key, kv),
}

export const ratelimit = new Ratelimit({
	redis: redisAdapter,
	limiter: Ratelimit.fixedWindow(5, "24h"),
})
