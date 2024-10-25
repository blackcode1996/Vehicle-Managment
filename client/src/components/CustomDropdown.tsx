// Dropdown.js
import { useState } from "react";

interface DropdownItem {
  id: string;
  name: string;
  [key: string]: string;
}

interface DropdownProps {
  label: string;
  items: DropdownItem[] | null;
  selectedItem: DropdownItem | null;
  onSelect: (item: DropdownItem) => void;
  itemImageKey?: any;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  items,
  selectedItem,
  onSelect,
  itemImageKey,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSelect = (item: DropdownItem) => {
    onSelect(item);
    setIsDropdownOpen(false);
  };

  return (
    <div className="m-2">
      <label className="block mb-2 text-sm font-medium font-semibold">{label}</label>
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
          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
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
          </span>
        </button>
        {isDropdownOpen && (
          <ul className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-neutral py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {items?.map((item) => (
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
