import { useState } from 'react';

interface SearchBarProps {
  onSearch: (keyword: string, sortOrder: string) => void;
  onSort: (sortOrder: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch ,onSort}) => {
  const [keyword, setKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('default'); 

  const handleSearch = () => {
    onSearch(keyword, sortOrder);
  };

  const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSortOrder = e.target.value;
    setSortOrder(selectedSortOrder);
    onSort(selectedSortOrder); // Trigger sorting immediately on select change
  };

  return (
    <div className="max-w-xl w-full mb-6">
      <div className="flex items-center border border-gray-300 rounded overflow-hidden">
        <input
          type="text"
          placeholder="Search..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="px-4 py-2 flex-grow focus:outline-none focus:ring focus:border-blue-500"
        />
        <div className="ml-4">
          <label htmlFor="sortOrder" className="text-gray-600 mr-2">
            Sort
          </label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={handleSortOrderChange}
            className="px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
          >
            <option value="default">Default</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-700"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;