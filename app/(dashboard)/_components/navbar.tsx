"use client";

import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { SearchInput } from "./search-input";
import { InviteButton } from "./invite-button";

export const Navbar = () => {
    return (
        <div className="flex items-center gap-x-4 p-5 bg-green-900 text-white">
            
            <div className="hidden lg:flex lg:flex-1">
                <SearchInput/>
            </div>
            <div className=" block flex-1 lg:hidden ">
                <OrganizationSwitcher
                    hidePersonal
                    appearance={{
                        elements:{
                            rootBox:{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%",
                                maxWidth: "250px",
                            },
                            organizationSwitcherTrigger: {
                                padding:"8px",
                                width: "100%",
                                borderRadius: "8px",
                                border: "1px solid #E5E7EB",
                                backgroundColor: "white"
                            }
                        }
                    }}
                />
            </div>
            <InviteButton/>
            <UserButton/>
        </div>
    );
};