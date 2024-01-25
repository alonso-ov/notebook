import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";


export default function CreatePost({
    searchParams,
}: {
    searchParams: { message: string };
}) {

    const createPost = async (formData: FormData) => {
        "use server";

        const title = formData.get("title") as string;
        const content = formData.get("content") as string;

        const cookieStore = cookies();
        const supabase = createClient(cookieStore);

        const {
            data: { user: currentUser },
        } = await supabase.auth.getUser();


        const { error } = await supabase.from("posts").insert([
            { title, content, user_id: currentUser?.id },
        ]);

        if (error) {
            return redirect("/dashboard/create-post?message=Could not create post");
        }

        return redirect("/dashboard/create-post?message=Successfully created post");
    };

    return (
        <div className="flex items-center h-full">
            <form
                className="flex flex-col justify-center flex-1 w-64 gap-2 animate-in text-foreground"
                action={createPost}
            >
                <label className="text-md" htmlFor="title">
                    Title
                </label>
                <input
                    className="px-4 py-2 mb-6 border rounded-md bg-inherit"
                    name="title"
                    placeholder="Write your title here..."
                    required
                />
                <label className="text-md" htmlFor="content">
                    Content
                </label>
                <textarea
                    className="px-4 py-2 mb-6 border rounded-md bg-inherit"
                    name="content"
                    placeholder="Write your post here..."
                    required
                />
                <button className="px-4 py-2 mb-2 text-white rounded-md bg-emerald-600 text-foreground">
                    Post
                </button>
                {searchParams.message && (
                    <p className="p-4 mt-4 text-center bg-foreground/10 text-foreground">
                        {searchParams.message}
                    </p>
                )}
            </form>
        </div>
    );
}