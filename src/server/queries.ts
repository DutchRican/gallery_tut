import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { RedirectType, redirect } from "next/navigation";
import "server-only";
import { db } from "./db";
import { images } from "./db/schema";


export async function getImages() {
	const { userId } = auth();
	if (!userId) throw new Error("Unauthorized");

	const images = await db.query.images.findMany({
		where: (model, { eq }) => eq(model.userId, userId),
		orderBy: (model, { desc }) => desc(model.id)
	});
	return images;
}

export async function getImage(id: number) {
	const { userId } = auth();
	if (!userId) throw new Error("Unauthorized");

	const image = await db.query.images.findFirst({
		where: (model, { eq }) => eq(model.id, id),
	});

	if (!image) throw new Error("Image not found");
	if (image.userId !== userId) throw new Error("Unauthorized");

	return image;
}

export async function deleteImage(id: number) {
	const { userId } = auth();
	if (!userId) throw new Error("Unauthorized");

	await db
		.delete(images)
		.where(and(eq(images.id, id), eq(images.userId, userId)));

	redirect('/', RedirectType.push);
}