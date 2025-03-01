import Link from "next/link";
import React, { FC, ReactNode } from "react";

interface IProps {
  children: ReactNode;
  path: string;
  className?: string;
}

const RouteLink: FC<IProps> = ({ children, path, className }) => {
  return (
    <Link href={path} className={` text-white !px-5 !py-3 ${className}`}>
      {children}
    </Link>
  );
};

export default RouteLink;
