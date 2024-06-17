import { db } from "~/server/db";

export const dynamic = "force-dynamic";

const mockUrls = [
  "https://utfs.io/f/28b6103d-a7e2-4c7c-a7aa-ae8d16c7e154-pr0pib.png",
  "https://utfs.io/f/bcef28d9-e10d-424e-aacc-4009d98d029a-8tcm71.png",
  "https://utfs.io/f/1ce4811f-248b-4dc4-beec-e574610c77e0-2wt599.png",
];

const mockImages = mockUrls.map((url, index) => ({ id: index, url }));

export default async function HomePage() {
  const posts = await db.query.posts.findMany();

  console.log("Posts: " + JSON.stringify(posts));

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {
          posts.map((post)=>(<div key={post.id}>{post.name}</div>))
        }
        {[...mockImages, ...mockImages, ...mockImages].map((image, index) => (
          <div className="w-48" key={image.id + '-' + index}>
            <img src={image.url} alt="" />
          </div>
        ))}
      </div>
    </main>
  );
}
