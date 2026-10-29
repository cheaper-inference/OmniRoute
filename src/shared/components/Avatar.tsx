"use client";

import { Avatar as KitAvatar, type AvatarSize } from "@omniroute/ui-kit/avatar";

interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  className?: string;
}

/** Avatar — adapter over the kit `Avatar` (KEA-7886): image, else initials from `name`. */
export default function Avatar({ src, alt = "Avatar", name, size = "md", className }: AvatarProps) {
  return (
    <KitAvatar
      src={src}
      alt={alt}
      name={name}
      fallback={name ? undefined : "?"}
      size={size}
      className={className}
      // Without an image the initials are the only content; name the avatar like the legacy one.
      {...(src ? {} : { role: "img", "aria-label": alt })}
    />
  );
}
