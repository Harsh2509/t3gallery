import { getImage } from "~/server/query";

export default async function ({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const image = await getImage(photoId);
  return (
    <div>{<img src={image?.url} alt="" className=" max-w-screen-lg" />}</div>
  );
}
