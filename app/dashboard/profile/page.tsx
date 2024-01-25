import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import PostCard from "@/components/dashboard/PostCard";

export default async function Profile() {

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data: { user: currentUser } } = await supabase.auth.getUser();

    const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("user_id", currentUser?.id);

    return (
        <div className="h-screen">
            <div className="flex items-center justify-center h-1/3">
                <h1 className="text-3xl font-bold text-center">Your Posts</h1>
            </div>
            <div className="flex flex-col justify-center flex-grow gap-6 animate-in">
                {data?.map((posts) => (<PostCard {...posts} username={currentUser?.user_metadata.username} />))}
            </div>
        </div>
    );
}