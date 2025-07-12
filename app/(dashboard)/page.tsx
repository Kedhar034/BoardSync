"use client";

import { BoardList } from "./_components/board-list";
import { EmptyOrg } from "./_components/empty-org";
import { useOrganization } from "@clerk/nextjs";
import { useEffect, useState } from "react";

interface DashboardPageProps {
    searchParams: Promise<{
        search?: string;
        favorites?: string;
    }>;
}

const DashboardPage = ({
    searchParams,
}: DashboardPageProps) => {
    const { organization } = useOrganization();
    const [resolvedSearchParams, setResolvedSearchParams] = useState<{
        search?: string;
        favorites?: string;
    }>({});

    useEffect(() => {
        const resolveParams = async () => {
            const params = await searchParams;
            setResolvedSearchParams(params);
        };
        resolveParams();
    }, [searchParams]);
    
    return (
        <div className=" flex-1 h-[calc(100%-60px)] p-6"> 
            
            {!organization ? (
                <EmptyOrg/>
            ) : (
                <BoardList
                    OrganizationId={organization.id}
                    query={resolvedSearchParams}    
                />
            )}
        </div>
    );
};

export default DashboardPage;