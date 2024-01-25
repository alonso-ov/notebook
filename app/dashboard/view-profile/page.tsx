'use client'
import { useSearchParams } from 'next/navigation';
import { getPosts, pushFollow, pushUnfollow, checkFollow } from '@/lib/data';
import PostCard from "@/components/dashboard/PostCard";
import { useEffect, useState } from 'react';

export default function ViewProfile() {

    const searchParams = useSearchParams();
    const [postData, setPostData] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);

    const username = searchParams.get('username')?.toString();

    useEffect(() => {
        if (username) {
            getPosts(username).then(result => {
                setPostData(result);
            });
        }
    }, []);

    useEffect(() => {
        if (username) {
            checkFollow(username).then(result => {
                setIsFollowing(result);
            });
        }
    }, []);

    async function handleFollow() {
        await pushFollow(username);
        setIsFollowing(true);
    }

    async function handleUnfollow() {
        await pushUnfollow(username);
        setIsFollowing(false);
    }

    return (
        <div className="flex flex-col w-full gap-20">
            <div className="flex flex-col items-center justify-center gap-5">
                <h1 className="text-3xl font-bold">@{username}</h1>
                {isFollowing ?
                    (
                        <button
                            className="px-4 py-2 mb-2 text-white bg-blue-600 rounded-md text-foreground"
                            onClick={handleUnfollow}
                        >
                            Unfollow
                        </button>
                    )
                    :
                    (
                        <button
                            className="px-4 py-2 mb-2 text-white rounded-md bg-emerald-600 text-foreground"
                            onClick={handleFollow}
                        >
                            Follow
                        </button>
                    )
                }
            </div>
            <div className="flex flex-col justify-center gap-6 animate-in">
                <h1 className="text-3xl font-bold">Posts</h1>
                {postData?.map((posts) => (<PostCard {...posts} username={username} />))}
            </div>
        </div>
    );
}