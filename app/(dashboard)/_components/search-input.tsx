"use client";
import qs from "query-string";
import { Search } from "lucide-react";
import { useDebounce } from "@uidotdev/usehooks";
import { useRouter } from "next/navigation";

import{
    ChangeEvent,
    useEffect,
    useState,
} from "react";

import { Input } from "@/components/ui/input";

export const SearchInput = () => {
    const Router = useRouter();
    const [value, setValue] = useState("");
    const debouncedValue = useDebounce(value, 500);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    useEffect(()=>{
        const url = qs.stringifyUrl({
            url: "/",
            query: {
                search: debouncedValue,
            },
        },{skipEmptyString:true, skipNull: true});
        Router.push(url);
    },[debouncedValue, Router]);

    return (
        <div className="relative w-full">
            <Search
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4"
                size={20}
            />
            <Input 
            className="w-full max-w-[520px] pl-8"
            onChange={handleChange}
            value={value}
            placeholder="Search boards..."
            />
        </div>
    )
}