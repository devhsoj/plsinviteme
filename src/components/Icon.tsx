import Image from 'next/image';

type IconProps = {
    src: string,
    alt: string,
    className?: string
}

export default function Icon(props: IconProps) {
    return (
        <Image
            className={props.className ?? 'inline'}
            src={props.src}
            alt={props.alt}
            width={24}
            height={24}
        />
    );
}