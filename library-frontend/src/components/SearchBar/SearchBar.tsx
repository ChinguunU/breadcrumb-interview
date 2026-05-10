import { useBookFilters } from "@/contexts/BookFiltersContext";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useBookFilters();
  return (
    <div className="flex items-center gap-2">
      <Label htmlFor="search" className="whitespace-nowrap">
        Search Books:
      </Label>
      <Input
        id="search"
        className="w-64"
        placeholder="Search book"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};
