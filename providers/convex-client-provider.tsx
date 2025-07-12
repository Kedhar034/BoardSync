"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import {Loading} from "@/components/auth/loading";

import {
    AuthLoading,
    // Authenticated,
    ConvexReactClient,
} from "convex/react";


interface ConvexClientProviderProps {
    children: React.ReactNode;  
}

const Convexurl = process.env.NEXT_PUBLIC_CONVEX_URL || "https://tough-pheasant-562.convex.cloud";
const convex = new ConvexReactClient(Convexurl);

export const ConvexClientProvider =({
    children,
}: ConvexClientProviderProps) => {
    return (
        <ClerkProvider>
            <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
                {/* <Authenticated>
                    {children}
                </Authenticated> */}
                {children}
                <AuthLoading>
                    <Loading/>
                </AuthLoading>
            </ConvexProviderWithClerk>
        </ClerkProvider>
    );
};