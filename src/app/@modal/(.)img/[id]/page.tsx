import { getImage } from "~/server/query";
import { Modal } from "./modal";

export default async function ({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const image = await getImage(photoId);
  return <Modal>{<img src={image?.url} alt="" className="w-96" />}</Modal>;
}
