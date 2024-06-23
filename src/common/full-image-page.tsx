import { clerkClient } from "@clerk/nextjs/server";
import { deleteImage, getImage } from "~/server/queries";
import { Button } from "../components/ui/button";

export default async function FullPageImageView(props: { photoId: string }) {
	const idAsNumber = Number(props.photoId);
	if (Number.isNaN(idAsNumber)) throw new Error("Invalid photo id");

	const image = await getImage(idAsNumber);
	const uploaderInfo = await clerkClient.users.getUser(image.userId);

	return (
		<div className="flex w-full h-full min-w-0 ">
			<div className="flex flex-shrink items-center justify-center">
				<img className="flex-shrink object-fill" src={image.url} alt={image.name} />
			</div>
			<div className="w-48 flex flex-col flex-shrink-0 border-l">
				<div className="border-b text-lg text-center p-2">{image.name}</div>
				<div className="flex flex-col p-2">
					<span>Uploaded by:</span>
					<span>{uploaderInfo.fullName}</span>
				</div>
				<div className="p-2">
					<span>Created on:</span>
					<span>{new Date(image.createdAt).toLocaleDateString()}</span>
				</div>
				<div className="p-2">
					<form action={async () => {
						"use server";
						await deleteImage(idAsNumber);
					}} >
						<Button type="submit" variant="destructive">Delete</Button>
					</form>
				</div>
			</div>
		</div>
	);
}