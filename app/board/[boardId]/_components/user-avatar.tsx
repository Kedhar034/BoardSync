import { Hint } from "@/components/hint";
import { Avatar, AvatarFallback, AvatarImage  } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
interface UserAvatarProps {
    src?: string;
    name?: string;
    fallback?:string;
    bordercolor?:string;
}

export const UserAvatar = ({
    src,
    name,
    fallback,
    bordercolor,
}: UserAvatarProps) => {
    return (
        <Hint label={name || "Teammate"} side="bottom" sideOffset={10}>
            <Avatar className={cn("border-2",bordercolor)}
            style={{borderColor:bordercolor}}
            >
                <AvatarImage src={src}/>
                <AvatarFallback className="text-xs font-semibold">{fallback}</AvatarFallback>
            </Avatar>
        </Hint>
    )
}