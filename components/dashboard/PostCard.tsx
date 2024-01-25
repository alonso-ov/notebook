interface PostCardProps {
    title: string;
    content: string;
    created_at: string;
    username: string;
}

export default function PostCard({title, content, created_at, username}: PostCardProps){
    
    const timestamp = new Date(created_at).toLocaleString();
    
    return(
        <div className="flex gap-2 flex-col w-full border rounded-lg p-6">
            <div className="text-lg flex">
                <h1 className="font-bold flex-grow">{title}</h1>
                <h2>{timestamp}</h2>
            </div>
            <div>
                {content}
            </div>
            <div className="flex justify-end">
                - {username}
            </div>
        </div>
    );
}