import Link from "next/link";

interface SearchResultsCardProps {
    username: string;
}

export default function SearchResultsCard({ username }: SearchResultsCardProps) {


    return (
        <Link
            href={`./view-profile?username=${username}`}
            className="flex w-fit h-fit justify-start border py-4 px-8 rounded-lg hover:bg-btn-background-hover">
            <div className="font-semibold ">
                @{username}
            </div>
        </Link>
    );
}