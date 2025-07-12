"use client";
import {Plus} from "lucide-react";
import{OrganizationProfile} from "@clerk/nextjs";


import { Dialog,
    DialogContent,
    DialogTrigger,
 } from "@/components/ui/dialog";   

import { Button } from "@/components/ui/button";


export const InviteButton= () =>{
    return (
        <Dialog>
            <DialogTrigger asChild>
                {/* Replace 'Button' with your actual Button component import if different */}
                <Button variant="outline" className="text-black border-black hover:bg-indigo-600 hover:text-white">
                    <Plus  className="h-4 w-4 hover:bg-white to-black" />
                    Invite Members
                </Button>
            </DialogTrigger>
            <DialogContent className="p-0 bg-transparent border-none max-w-[880px]">
                <OrganizationProfile/>
            </DialogContent>

        </Dialog>
    );
}