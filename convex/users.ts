import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createUser = mutation({
    args: {
        fullname: v.string(),
        email: v.string(),
        image: v.optional(v.string()),
        clerkId: v.string(),
        lastSeen: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        const existingUser = await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
            .first();

        if (existingUser) return;

        await ctx.db.insert("users", {
            fullname: args.fullname,
            email: args.email,
            image: args.image,
            clerkId: args.clerkId,
            lastSeen: args.lastSeen ?? Date.now(),
        });
    },
});
