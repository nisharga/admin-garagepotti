/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image';
import React, { FC } from 'react';

interface IProps {
    className?: string;
    alt?: string;
    src: any;
}

const Avatar: FC<IProps> = ({ className, src, alt }) => {
    return (
        <Image
            src={src}
            width={132}
            height={100}
            alt={alt ? alt : 'Avatar'}
            className={`${className} h-full w-auto object-fill`}
            unoptimized
        />
    );
};
export default Avatar;
