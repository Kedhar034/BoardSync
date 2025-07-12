import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Navbar } from "./_components/navbar";
import { OrgSidebar } from "./_components/org-sidebar";
import { Sidebar } from "./_components/sidebar";
import SignInPage from "../sign-in/[[...rest]]/page";

interface DashboardLayoutProps {
    children: React.ReactNode;
};

const DashboardLayout = ({
    children,
}:DashboardLayoutProps) =>{
    return (
        <><SignedIn>
            <main className="h-full">
                <Sidebar />
                <div className="pl-[60px] h-full">
                    <div className="flex gap-x-3 h-full">
                        <OrgSidebar />
                        <div className="h-full flex-1">
                            <Navbar />
                            {children}
                        </div>
                    </div>

                </div>
            </main>
        </SignedIn><SignedOut>
            <div className="flex items-center justify-center h-screen bg-indigo-300">

                <SignInPage  />
            </div>
            </SignedOut></>
        
    )

}

export default DashboardLayout;