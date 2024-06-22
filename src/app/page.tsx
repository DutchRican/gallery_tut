import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { getImages } from "~/server/queries";

export const dynamic = "force-dynamic"

async function Images() {
  const images = await getImages();

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {images.map(({ id, name, url }) => (
        <div key={id} className="flex w-48 flex-col">
          <Link href={`/img/${id}`}>
            <Image
              src={url}
              alt={name}
              width={192}
              height={192}
              style={{ objectFit: "cover" }}
            />
          </Link>
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
