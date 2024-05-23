'use client';
import React, { useState } from 'react';

export interface DropdownProps {
  items: string[];
  selectedItem: string;
  setSelectedItem: any;
}

const Dropdown = ({ items, selectedItem, setSelectedItem }: DropdownProps) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  return (
    <div className="w-40 overflow-hidden">
      <div
        id="trigger"
        className="cursor-pointer rounded-md border-2 bg-slate-700 p-2"
        onClick={() => setShowMenu(!showMenu)}
      >
        <p className="">{selectedItem || 'Open Menu'}</p>
      </div>
      <div
        id="menu"
        className="absolute mt-2 size-full overflow-auto rounded bg-slate-700 md:max-h-40 md:w-40"
        hidden={!showMenu}
      >
        <ul className="flex flex-col">
          {items?.map((item: string) => {
            return (
              <li
                className="rounded px-2 py-1 hover:cursor-pointer hover:bg-slate-500"
                onClick={() => {
                  setSelectedItem(item);
                  setShowMenu(false);
                }}
              >
                {item}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
