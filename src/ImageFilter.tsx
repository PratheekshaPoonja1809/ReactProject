interface IImgProp {
  src: string;
  alt: string;
  onClick: () => void;
}

export function ImageFilter({ src, alt, onClick }: IImgProp) {
  return (
    <input
      type="image"
      src={src}
      alt={alt}
      className="input-img-style"
      onClick={onClick}
      title={alt}
    />
  );
}
