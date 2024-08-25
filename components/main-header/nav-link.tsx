'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CustomLinkProps } from "@/models";

const NavLink: React.FC<CustomLinkProps> = (props) => {
    const path = usePathname();
    const isActive = path.startsWith(props.href);

    return(
        <Link href={props.href}
        className={`text-gray-400 font-bold px-4 py-2 rounded-lg 
            hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-orange-500 hover:to-yellow-500 hover:shadow-[0_0_18px_rgba(248,190,42,0.8)]
            ${isActive ? 'text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500' : ''}
          `}
    > 
        {props.children}
    </Link>
    );
};

export default NavLink;