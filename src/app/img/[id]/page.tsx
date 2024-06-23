import { FullPageImageView } from "~/common/full-page-image-view";
import { getImage } from "~/server/query";

export default async function ({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  return (
    <div className="flex h-full min-h-0 w-full min-w-0 overflow-y-hidden">
      <FullPageImageView photoId={photoId}></FullPageImageView>
    </div>
  );
}
