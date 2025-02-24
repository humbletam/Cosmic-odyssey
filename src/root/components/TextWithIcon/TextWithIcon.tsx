import { FC, HTMLAttributes, ReactNode } from "react";
import cn from "classnames";

interface Props extends HTMLAttributes<HTMLSpanElement> {
  text?: string;
  icon?: ReactNode;
  isReversed?: boolean;
  isCol?: boolean;
  isDefault?: boolean;
  isMobAuth?: boolean;
  className?: string;
  value?: string;
}

export const TextWithIcon: FC<Props> = ({
  text,
  icon,
  isReversed = false,
  className,
  isCol = false,
  isDefault = false,
  isMobAuth = false,
  value,
  ...rest
}) => {
  const defaultClasses = cn(
    "flex flex-row",
    {
      "flex-row-reverse items-center gap-2": isReversed,
      "flex-col items-center": isCol,
      "items-center gap-2": isDefault,
      "items-center": isMobAuth,
    },

    className,
  );

  return (
    <div className={defaultClasses} {...rest}>
      {icon}
      <p>
        {value}
        {text}
      </p>
    </div>
  );
};
