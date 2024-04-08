import { column, defineDb, defineTable } from "astro:db"

const User = defineTable({
	columns: {
		id: column.text({ primaryKey: true, optional: false, unique: true }),
		username: column.text({ unique: true, optional: false }),
		password: column.text({ optional: true }),
	},
})

const Session = defineTable({
	columns: {
		id: column.text({ optional: false, unique: true }),
		userId: column.text({ optional: false, references: () => User.columns.id }),
		expiresAt: column.number({ optional: false }),
	},
})

const Post = defineTable({
	columns: {
		id: column.number({ primaryKey: true }),
		// userId: column.text({ references: () => User.columns.id }),
		title: column.text(),
		description: column.text(),
	},
})

const Like = defineTable({
	columns: {
		postSlug: column.text({ primaryKey: true }),
		likesCount: column.number({ default: 0 }),
	},
})

// https://astro.build/db/config
export default defineDb({
	tables: { Post, Like, User, Session },
})
