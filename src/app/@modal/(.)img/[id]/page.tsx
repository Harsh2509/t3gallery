import { Modal } from "./modal";
import { FullPageImageView } from "~/common/full-page-image-view";

export default async function ({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  return (
    <Modal>
      <FullPageImageView photoId={photoId}></FullPageImageView>
    </Modal>
  );
}
