import { Photo } from "@medusajs/icons";

type ThumbnailProps = {
  src?: string | null;
  alt?: string;
};

export const Thumbnail = ({ src, alt }: ThumbnailProps) => {
  const isPdf = src?.endsWith(".pdf");

  return (
    <div className="bg-ui-bg-component flex h-8 w-6 items-center justify-center overflow-hidden rounded-[4px]">
      {src ? (
        <a href={src} target="_blank" className="flex h-full w-full">
          <img
            src={isPdf ? "/static/pdf-thumnail.png" : src}
            alt={alt}
            className="h-full w-full object-cover object-center"
          />
        </a>
      ) : (
        <Photo className="text-ui-fg-subtle" />
      )}
    </div>
  );
};
