import NavBar from "@/components/dashboard/NavBar"
import { redirect } from 'next/navigation'
import { cookies } from "next/headers"
import { createClient } from "@/utils/supabase/server"


export default async function DashboardRootLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    async function checkCredentials() {
        const cookieStore = cookies();
        const supabase = createClient(cookieStore);
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return redirect("/login?message=You must be logged in to view this page");
        }
    }

    await checkCredentials();

    return (
        <div className="flex justify-center px-6 pt-6">
            <div className="w-4/5">
                <NavBar />
                <div className="h-full grow">
                    {children}
                </div>
            </div>
        </div>
    );
}
