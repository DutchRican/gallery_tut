import { db } from "~/server/db";

export const dynamic = "force-dynamic"

export default async function HomePage() {

  const images = await db.query.images.findMany({ orderBy: (model, { desc }) => desc(model.id) });

  return (
    <main className="">
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
    </main>
  );
}
