// @ts-ignore
import style from "./style.module.scss";
import { Fragment, useState, useRef, ChangeEvent } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import IconButton from "@mui/material/IconButton";
import { IoCloudUploadSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { resizeImage } from "../../../utils/utils";
import { ACCEPTED_TYPES, FILE_SIZE_LIMIT } from "../../../utils/constant";

type ImageUploadButtonProps = {
  image?: String | string;
  width?: number;
  height?: number;
  children?: React.ReactNode;
  onUpload?: (file: File) => Promise<void | string>;
  onDelete?: () => Promise<void>;
  onEdit?: () => Promise<void | string>;
};
export default function ImageUploadButton({
  image,
  width,
  height,
  children,
  onUpload,
  onDelete,
}: ImageUploadButtonProps) {
  const inputRef = useRef<any>();
  const [currentFile, setFile] = useState<File | null>();
  const [currentImage, setImage] = useState<string | null>(image as string);
  const [isLoading, setLoading] = useState(false);

  if (!height) {
    height = 320;
  }

  async function handleUpload(file: File) {
    // Resize image
    if (FILE_SIZE_LIMIT < file.size) {
      file = await resizeImage(file);
    }
    if (onUpload) {
      const imageUrl = await onUpload(file);
      setImage(imageUrl as string);
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (onDelete) {
      await onDelete();
    }
    setFile(null);
    setImage(null);
    setLoading(false);
  }

  function handleSetFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.length !== 0) {
      let file = (e.target.files as any)[0];
      setLoading(true);
      setFile(file);
      setImage(file ? URL.createObjectURL(file) : null);
      handleUpload(file);
    }
  }

  function handleRemoveFile() {
    setLoading(true);
    handleDelete();
  }

  function handleUploadClick() {
    if (!currentImage) {
      inputRef.current.click();
    }
  }

  return (
    <Fragment>
      <input
        type="file"
        accept={ACCEPTED_TYPES}
        hidden
        ref={inputRef}
        onChange={handleSetFile}
      />
      <div
        className={style.container}
        style={{
          width: `${width}px`,
          height: `${height}px`,
        }}
        onClick={() => handleUploadClick()}
      >
        {!currentImage ? (
          <div className={style.contentWrapper}>
            {children ? (
              children
            ) : (
              <div className={style.content}>
                <IoCloudUploadSharp size={28} />
                Upload Image {currentFile?.name}
              </div>
            )}
          </div>
        ) : (
          <div className={style.imageWrapper}>
            <img src={currentImage as string} alt="" />
          </div>
        )}
        {isLoading ? (
          <div className={style.loading}>
            <LinearProgress />
          </div>
        ) : null}
        {!isLoading && currentImage ? (
          <div className={style.overlay}>
            <IconButton
              aria-label="delete-btn-image-uploader"
              color="error"
              onClick={handleRemoveFile}
            >
              <MdDelete />
            </IconButton>
          </div>
        ) : null}
      </div>
    </Fragment>
  );
}
