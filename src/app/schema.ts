import { z } from "zod";

export const StatusEnum = z.enum([
	"watching",
	"on-hold",
	"planning",
	"dropped",
	"completed",
]);
export const MediaTypeEnum = z.enum(["anime", "movie", "kdrama", "managa"]);
export type StatusEnum = z.infer<typeof StatusEnum>;
export type MediaTypeEnum = z.infer<typeof MediaTypeEnum>;
