import { PlusCircle, UserRound, Newspaper, UserSearch } from "lucide-react";
import Link from "next/link";

export default async function NavBar() {
    

    return (
        <nav className="flex justify-between mb-4">
            <Link href="/dashboard/search">
                <UserSearch />
            </Link>
            <Newspaper />
            <Link href="/dashboard/create-post">
                <PlusCircle />
            </Link>
            <Link href="/dashboard/profile">
                <UserRound />
            </Link>
        </nav>
    );
}