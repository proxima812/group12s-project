import { Lucia } from "lucia"
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle"
import { db, Session, User } from "astro:db"
const adapter = new DrizzleSQLiteAdapter(db as any, Session, User) // your adapter

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: import.meta.env.PROD,
		},
	},
	getUserAttributes: attributes => {
		return {
			username: attributes.username,
		}
	},
})


declare module "lucia" {
	interface Register {
		Lucia: typeof lucia
		DatabaseUserAttributes: DatabaseUserAttributes
	}
}
interface DatabaseUserAttributes {
	github_id: number
	username: string
}
