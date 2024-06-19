import { db } from "~/server/db";

const mockUrls = [
  'https://utfs.io/f/28f79215-b456-40c4-a6a5-f74e55e95452-8fimc9.jpg',
  'https://utfs.io/f/64cddda6-39b0-4c07-9592-f5560df87ceb-tvexkw.jpg',
  'https://utfs.io/f/284909d6-274c-4d08-8a17-721013f8b876-lvlij4.jpg',
  'https://utfs.io/f/f05325fe-b931-4108-a230-b8581b171813-vt1u68.jpg',
  'https://utfs.io/f/18f28760-b7f4-4b76-945d-c95509fb6de4-8haqan.jpg'
];

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url
}));

export default async function HomePage() {

  const posts = await db.query.posts.findMany();

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {posts.map((post) => (
          <div key={post.id} className="w-48">{post.name}</div>
        ))}
        {mockImages.map(({ id, url }) => (
          <div key={id} className="w-48">
            <img
              src={url}
              alt="image"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </main>
  );
}
