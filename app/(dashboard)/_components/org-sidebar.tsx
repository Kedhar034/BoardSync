"use client";

import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { LayoutDashboard, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"]
});

export const OrgSidebar = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const favorites = searchParams.get("favorites") === "true";

    const handleBoardsClick = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("favorites");
        router.push(`?${params.toString()}`);
    };

    const handleFavoritesClick = () => {
        const params = new URLSearchParams(searchParams.toString());
        if (!favorites) {
            params.set("favorites", "true");
        } else {
            params.delete("favorites");
        }
        router.push(`?${params.toString()}`);
    };

    return (
        <div className="hidden lg:flex flex-col space-y-4 w-[250px] pl-5 pt-5 text-black">
            <div className="flex items-center gap-x-2">
                <Image
                    src="/boardsync.png"
                    alt="Logo"
                    width={40}
                    height={40}
                />
                <span className={cn(
                    "font-bold text-2xl",
                    font.className,
                )}>
                    BoardSync
                </span>
            </div>
            <OrganizationSwitcher
                hidePersonal
                appearance={{
                    elements: {
                        rootBox: {
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                        },
                        organizationSwitcherTrigger: {
                            padding: "6px",
                            width: "100%",
                            borderRadius: "8px",
                            border: "1px solid #E5E7EB",
                            backgroundColor: "white"
                        }
                    }
                }}
            />
            <div className="space-y-1 w-full">
                <Button
                    size="lg"
                    variant={!favorites ? "secondary" : "ghost"}
                    className="font-normal justify-start px-2 w-full"
                    onClick={handleBoardsClick}
                >
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Team Boards
                </Button>
                <Button
                    size="lg"
                    variant={favorites ? "secondary" : "ghost"}
                    className="font-normal justify-start px-2 w-full"
                    onClick={handleFavoritesClick}
                >
                    <Star className="h-4 w-4 mr-2" />
                    Favorite Boards
                </Button>
            </div>
        </div>
    );
};