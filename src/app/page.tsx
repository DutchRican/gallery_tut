import { SignedIn, SignedOut } from "@clerk/nextjs";
import { getImages } from "~/server/queries";

export const dynamic = "force-dynamic"

async function Images() {
  const images = await getImages();

  return (
    <div className="flex flex-wrap gap-4">
      {images.map(({ id, name, url }) => (
        <div key={id} className="flex w-48 flex-col">
          <img
            src={url}
            alt={name}
            className="object-cover"
          />
          <div className="text-end">{name}</div>
        </div>
      ))}
    </div>
  );
}

export default async function HomePage() {
  return (
    <main className="">
      <SignedOut>
        <div className="h-full w-full text-2xl text-center"> Please sign in above </div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
}
