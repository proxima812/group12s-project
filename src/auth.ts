import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle"
import { GitHub, Google } from "arctic"
import { db, Session, User } from "astro:db"
import { Lucia } from "lucia"
const adapter = new DrizzleSQLiteAdapter(db as any, Session, User) // your adapter

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: import.meta.env.PROD ? true : false,
		},
	},
	getUserAttributes: attributes => {
		return {
			googleId: attributes.google_id,
			githubId: attributes.github_id,
			username: attributes.username,
			email: attributes.email,
		}
	},
})

export const github = new GitHub(
	import.meta.env.GITHUB_CLIENT_ID,
	import.meta.env.GITHUB_CLIENT_SECRET,
)

export const google = new Google(
	import.meta.env.GOOGLE_CLIENT_ID,
	import.meta.env.GOOGLE_CLIENT_SECRET,
	import.meta.env.GOOGLE_AUTH_CALLBACK_URL,
)

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia
		DatabaseUserAttributes: DatabaseUserAttributes
	}
}

interface DatabaseUserAttributes {
	github_id: number
	google_id: number
  username: string
  email: string
}
