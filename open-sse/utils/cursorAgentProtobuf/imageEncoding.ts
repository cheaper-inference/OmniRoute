import crypto from "node:crypto";
import {
  encodeBytes,
  encodeMessage,
  encodeString,
  encodeUInt32Field,
} from "./wire.ts";

const SI_UUID = 2;
const SI_PATH = 3;
const SI_DIMENSION = 4;
const SI_MIME_TYPE = 7;
const SI_BLOB_ID_WITH_DATA = 9;

const SIBD_BLOB_ID = 1;
const SIBD_DATA = 2;

const DIM_WIDTH = 1;
const DIM_HEIGHT = 2;

export type EncodedImage = {
  data: Buffer;
  mimeType?: string;
  width?: number;
  height?: number;
  uuid: string;
};

export function cursorImageAttachmentPath(uuid: string, mimeType?: string): string {
  const normalized = (mimeType || "").toLowerCase();
  const ext =
    normalized === "image/jpeg" || normalized === "image/jpg"
      ? "jpg"
      : normalized === "image/gif"
        ? "gif"
        : normalized === "image/webp"
          ? "webp"
          : "png";
  return `attachment-${uuid}.${ext}`;
}

export function encodeSelectedImageBody(
  img: EncodedImage,
  blobStore?: Map<string, Buffer>
): Buffer {
  const blobId = crypto.createHash("sha256").update(img.data).digest();
  if (blobStore) {
    blobStore.set(blobId.toString("hex"), img.data);
  }

  const parts: Buffer[] = [
    encodeString(SI_UUID, img.uuid),
    encodeString(SI_PATH, cursorImageAttachmentPath(img.uuid, img.mimeType)),
  ];
  if (
    typeof img.width === "number" &&
    typeof img.height === "number" &&
    Number.isFinite(img.width) &&
    Number.isFinite(img.height) &&
    img.width > 0 &&
    img.height > 0
  ) {
    parts.push(
      encodeMessage(SI_DIMENSION, [
        encodeUInt32Field(DIM_WIDTH, Math.floor(img.width)),
        encodeUInt32Field(DIM_HEIGHT, Math.floor(img.height)),
      ])
    );
  }
  if (img.mimeType) {
    parts.push(encodeString(SI_MIME_TYPE, img.mimeType));
  }
  parts.push(
    encodeMessage(SI_BLOB_ID_WITH_DATA, [
      encodeBytes(SIBD_BLOB_ID, blobId),
      encodeBytes(SIBD_DATA, img.data),
    ])
  );
  return Buffer.concat(parts);
}
