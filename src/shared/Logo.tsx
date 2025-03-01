import Image from "next/image";
import logo from "../../public/logo.png";
import Link from "next/link";
import React, { FC } from "react";

interface IProps {
  className?: string;
}

const Logo: FC<IProps> = ({ className }) => {
  return (
    <Link href={"/user/dashboard"} className={`!w-full !h-full ${className}`}>
      <Image src={logo} width={132} height={100} alt="notfound" />
    </Link>
  );
};
export default Logo;
