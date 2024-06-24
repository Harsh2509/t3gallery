import { clerkClient } from "@clerk/nextjs/server";
import { Button } from "~/components/ui/button";
import { deleteImage, getImage } from "~/server/query";

export async function FullPageImageView(props: { photoId: string }) {
  const image = await getImage(props.photoId);
  const uploader = await clerkClient.users.getUser(image.userId);
  if (!image) {
    throw new Error("Image not found");
  }

  return (
    <div className="flex h-full w-screen min-w-0 items-center text-white">
      <div className="flex-shrink flex-grow">
        <img src={image.url} />
      </div>

      <div className="flex h-full w-72 flex-shrink-0 flex-grow flex-col border-l md:w-52">
        <div className="flex items-center justify-center border border-l p-4 text-lg font-bold">
          <div>{image.name}</div>
        </div>
        <div className=" flex flex-col p-3">
          <span>Uploaded By: </span>
          <span className="font-bold">{uploader.fullName}</span>
        </div>

        <div className=" flex flex-col p-3">
          <span>Uploaded At: </span>
          <span className="font-bold">
            {new Date(image.createdAt).toLocaleDateString()}
          </span>
        </div>

        <div className="p-3">
          <form
            action={async () => {
              "use server";
              await deleteImage(JSON.stringify(image.id));
            }}
          >
            <Button type="submit" variant={"destructive"}>
              Delete
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
