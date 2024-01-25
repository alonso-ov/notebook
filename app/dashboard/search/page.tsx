'use client';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import SearchResultsCard from '@/components/dashboard/SearchResultsCard';
import { fetchFilteredUsers } from '@/lib/data';

export default function UserSearch() {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [username, setUsername] = useState(' i');
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            fetchFilteredUsers(username).then((result) => { setData(result) });
        };

        fetchData();
    }, [username])

    const handleSearch = useDebouncedCallback((term: string) => {

        const params = new URLSearchParams(searchParams.toString());

        if (term) {
            params.set('username', term);
            setUsername(term);
        } else {
            params.delete('username');
        }

        replace(`${pathname}?${params.toString()}`);

        console.log(params);
    }, 300)

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
    }

    return (
        <div className="h-screen">
            <div className="flex items-center justify-center h-1/3">
                <form className="relative animate animate-in" onSubmit={handleSubmit}>
                    <input
                        className="px-4 py-2 pl-10 mb-6 border rounded-md bg-inherit"
                        type="text"
                        placeholder="Search for a user"
                        onChange={(e) => { handleSearch(e.target.value) }}
                        defaultValue={searchParams.get('username')?.toString()}
                    />
                    <Search className="absolute transform -translate-y-full left-3 top-1/2" />
                </form>
            </div>
            <div className="h-2/3">
                <div className="flex flex-col justify-start items-center gap-5 h-full">
                    {data?.map((user, key) => {
                        return (
                            <SearchResultsCard
                                key={key}
                                username={user.username}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}