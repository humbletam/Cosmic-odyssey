import { FC, useEffect, useState } from "react";

interface IconProps {
  value: string;
  className?: string;
  isImage?: boolean;
  width?: number;
  height?: number;
}

export interface IconStylingProps {
  className?: string;
  width?: number;
  height?: number;
}

const Icon: FC<IconProps> = ({
  value,
  className,
  isImage = false,
  width,
  height,
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const src = isImage ? `/images/${value}.svg` : `/icons/${value}.svg`;

  return isClient ? (
    <img
      src={src}
      alt={value}
      className={className}
      width={width}
      height={height}
    />
  ) : null;
};

export default Icon;
