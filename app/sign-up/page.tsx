import { headers, cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function SignUp() {

    const signUp = async (formData: FormData) => {
        "use server";

        const origin = headers().get("origin");
        const username = formData.get("username") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const cookieStore = cookies();
        const supabase = createClient(cookieStore);

        const signUpResult = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${origin}/auth/callback`,
                data: {
                    username: username,
                },
            },
        });

        if (signUpResult.error) {
            return redirect("/login?message=Could not authenticate user");
        }

        return redirect("/login?message=Check email to continue sign in process");
    };

    return (
        <div className="flex flex-col justify-center flex-1 w-full gap-2 px-8 sm:max-w-md">
            <Link
                href="/login"
                className="absolute flex items-center px-4 py-2 text-sm no-underline rounded-md left-8 top-8 text-foreground bg-btn-background hover:bg-btn-background-hover group"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1"
                >
                    <polyline points="15 18 9 12 15 6" />
                </svg>{" "}
                Back
            </Link>
            <form
                className="flex flex-col justify-center flex-1 w-full gap-2 animate-in text-foreground"
                action={signUp}
            >
                <label className="text-md" htmlFor="username">
                    Username
                </label>
                <input
                    className="px-4 py-2 mb-6 border rounded-md bg-inherit"
                    name="username"
                    placeholder="practical-pen"
                    required
                />
                <label className="text-md" htmlFor="email">
                    Email
                </label>
                <input
                    className="px-4 py-2 mb-6 border rounded-md bg-inherit"
                    name="email"
                    placeholder="you@example.com"
                    required
                />
                <label className="text-md" htmlFor="password">
                    Password
                </label>
                <input
                    className="px-4 py-2 mb-6 border rounded-md bg-inherit"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    required
                />
                <button
                    className="px-4 py-2 mb-2 text-center border rounded-md bg-emerald-600 border-foreground/20 text-foreground text-white"
                >
                    Sign Up
                </button>

            </form>
        </div>);

}