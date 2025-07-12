import Image from "next/image";

export const EmptyFavorites = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <Image
                src="/fav.png"
                height={240}
                width={240}
                alt="No found"
            />
            <h2 className="text-2xl font-semibold mt-6">
                No Favorites
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
                Try favoriting a Board
            </p>
        </div>
    );
};