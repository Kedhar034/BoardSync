import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from  "@/components/ui/tooltip";


export interface HintProps {
    label : string;
    children: React.ReactNode;
    side?: "top" | "bottom" | "left" | "right";
    alighn?: "start" | "center" | "end";
    sideOffset?: number;
    alignOffset?: number;
};

export const Hint = ({
    label,
    children,
    side,
    alighn,
    sideOffset,
    alignOffset,
}: HintProps) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent
                    className="bg-gray-800 text-white p-2 rounded-md"
                    side={side}
                    align={alighn}
                    sideOffset={sideOffset}
                    alignOffset={alignOffset}
                >
                    <p>
                        {label}
                    </p>
                    
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};