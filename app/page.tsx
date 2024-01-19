import AuthButton from "../components/AuthButton";
import { NotepadText } from "lucide-react"
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Index() {

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <Link href="/">
            <NotepadText />
          </Link>
          <p>{user ? (user.user_metadata.username): ("Notebook")}</p>
          <AuthButton user={user}/>
        </div>
      </nav>
    </div>
  );
}
