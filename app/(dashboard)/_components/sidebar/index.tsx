import { List } from "./list"
import { NewButton } from "./new-button"

export const Sidebar = () => {
    return (
        <aside className="fixed z-[1] gap-y-4 left-0 w-[70px] h-full flex p-3 flex-col bg-gray-800 text-white">
            <List/>
            <NewButton/>
        </aside>
    )
}