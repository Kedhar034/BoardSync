"use client";

import { BoardList } from "./_components/board-list";
import { EmptyOrg } from "./_components/empty-org";
import { useOrganization } from "@clerk/nextjs";

interface DashboardPageProps {
    // Define any props if needed  
    searchParams: {
        search?: string;
        favorites?: string;
    };
}

const DashboardPage = ({
    searchParams, // Destructure searchParams if needed
}:DashboardPageProps) =>{
    const {organization } = useOrganization();
    return (
        <div className=" flex-1 h-[calc(100%-60px)] p-6"> 
            
            {!organization ? (
                <EmptyOrg/>
            ) : (
                <BoardList
                    OrganizationId={organization.id}
                    query={searchParams}    
                />
            )}
        </div>
    );
};

export default DashboardPage;