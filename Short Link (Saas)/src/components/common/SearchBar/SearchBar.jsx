import { Search } from "lucide-react"

export const SearchBar = ({ className, placeholder = 'Search', IconSize = 20,onSearch, id="searchBar" }) => {
    return (
        <div id={id} className={className}>
            <Search onClick={onSearch} size={IconSize} className="cursor-pointer"></Search>
            <input className="outline-none w-full flex items-center justify-center"  type="text" placeholder={placeholder} />
        </div>
    )
}

