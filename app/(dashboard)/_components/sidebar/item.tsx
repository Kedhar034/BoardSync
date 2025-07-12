"use client";

// import {Image} from "lucide-react";
import Image from "next/image";
import {
    useOrganizationList,
    useOrganization,
} from "@clerk/nextjs";

import {cn} from "@/lib/utils";
import {Hint} from "@/components/hint";

interface ItemProps{
    id:string;
    name:string;
    imageUrl:string;
};

export const Item = ({
    id,
    name,
    imageUrl,
}:ItemProps) => {
    const {organization} = useOrganization();
    const { setActive} = useOrganizationList();
    
    const isActive  = organization?.id === id;

    const onClick = () =>{
        if(!setActive) return ;

        setActive({organization: id});

    }

    return (
        <div className="aspect-square relative">
            <Hint label={name} side="right" alighn="start" sideOffset={12}>
                <Image
                fill
                alt={name}
                src={imageUrl}
                onClick={onClick}
                className={cn(
                    "rounded-md cursor-pointer opacity-75 hover:opacity-100 transition",
                    isActive && "ring-2 ring-blue-500 opacity-100"
                )}
            />
            </Hint>
            
        </div>
    )
}

