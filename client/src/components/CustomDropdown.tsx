import { useState } from "react";

interface DropdownItem {
  id: string;
  name: string;
  [key: string]: string;
}

interface DropdownProps {
  label: string;
  items: any;
  selectedItem: DropdownItem | null;
  onSelect: any;
  loading: boolean;
  error : string;
  itemImageKey?: any;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  items,
  selectedItem,
  onSelect,
  loading,
  error,
  itemImageKey,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSelect = (item: DropdownItem) => {
    onSelect(item);
    setIsDropdownOpen(false);
  };

  const handleClear = () => {
    onSelect(null);  
    setIsDropdownOpen(false);  
  };

  if(loading) return <div>Loading...</div>
  if(error) return <div>{error}</div>


  return (
    <div className="m-2">
      <label className="block mb-2 text-sm font-bold">
        {label}
      </label>
      <div className="relative mt-2">
        <button
          type="button"
          className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-primary shadow-sm ring-1 ring-inset ring-secondary focus:outline-none focus:ring-2 focus:ring-secondary sm:text-sm sm:leading-6"
          aria-haspopup="listbox"
          aria-expanded={isDropdownOpen}
          onClick={() => setIsDropdownOpen((prev) => !prev)}
        >
          <span className="flex items-center">
            {selectedItem ? (
              <>
                <img
                  src={selectedItem[itemImageKey]}
                  alt={selectedItem.name}
                  className="h-5 w-5 flex-shrink-0 rounded-full"
                />
                <span className="ml-3 block truncate">{selectedItem.name}</span>
              </>
            ) : (
              `Select a ${label.toLowerCase()}`
            )}
          </span>
          <span className="absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
            {selectedItem ? (
              <svg
                onClick={(e) => {
                  e.stopPropagation(); 
                  handleClear();
                }}
                fill="#dc2626"
                height="10px"
                width="10px"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 490 490"
                stroke="#dc2626"
                className="cursor-pointer"
              >
                <polygon points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490 489.292,457.678 277.331,245.004 489.292,32.337 " />
              </svg>
            ) : (
              <svg
                className="h-5 w-5 text-primary"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10.53 3.47a.75.75 0 0 0-1.06 0L6.22 6.72a.75.75 0 0 0 1.06 1.06L10 5.06l2.72 2.72a.75.75 0 1 0 1.06-1.06l-3.25-3.25Zm-4.31 9.81 3.25 3.25a.75.75 0 0 0 1.06 0l3.25-3.25a.75.75 0 1 0-1.06-1.06L10 14.94l-2.72-2.72a.75.75 0 0 0-1.06 1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </span>
        </button>
        {isDropdownOpen && (
          <ul className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-neutral py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {items?.map((item: any) => (
              <li
                key={item.id}
                className="relative cursor-default select-none py-2 pl-3 pr-9 text-primary"
                role="option"
                onClick={() => handleSelect(item)}
              >
                <div className="flex items-center">
                  <img
                    src={item[itemImageKey]}
                    alt={item.name}
                    className="h-5 w-5 flex-shrink-0 rounded-full"
                  />
                  <span className="ml-3 block truncate">{item.name}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
