import { getImage } from "~/server/queries";

export default async function FullPageImageView(props: { id: number }) {
	const image = await getImage(props.id);

	return (
		<div className="flex w-full h-full min-w-0 ">
			<div className="flex flex-shrink items-center justify-center">
				<img className="flex-shrink object-contain" src={image.url} alt={image.name} />
			</div>
			<div className="w-48 flex flex-col flex-shrink-0 border-l">
				<div className="text-2xl font-bold">{image.name}</div>
			</div>
		</div>
	);
}