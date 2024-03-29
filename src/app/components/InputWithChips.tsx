'use client';

import { useRef, useState } from 'react';
import Chip, { ChipType } from './Chip';
import { UserType } from '../types/UserType';

type InputWithChipsProps = {
  users: UserType[];
  placeholder: string;
  searchedText: string;
  onKeyUp: (keywords: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  removeUser: (id: string) => void;
};

function InputWithChips({
  users = [],
  placeholder,
  searchedText,
  onKeyUp,
  onFocus,
  onBlur,
  removeUser,
}: InputWithChipsProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selected, setSelected] = useState<UserType>();

  const removeOnClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    const chipId = target.getAttribute('data-chipid');
    if (!chipId) return;
    removeUser(chipId);
  };

  const onKeyUpHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const value = target?.value || '';
    if (event.key === 'Backspace' && value === '' && searchedText === '') {
      if (selected) {
        removeUser(selected.email);
        setSelected(undefined);
      } else {
        const lastUser: UserType | null = users[users.length - 1];
        if (!lastUser) return;
        setSelected(lastUser);
      }
    } else {
      onKeyUp(value);
    }
  };

  return (
    <div className="flex flex-col flex-grow">
      <div className="flex flex-wrap pb-2 px-2 gap-3">
        {users.map(({ name, email, avatar }, index) => {
          const isHighlighted = selected && selected.email === email;
          return (
            <Chip
              key={index}
              id={email}
              avatar={avatar}
              name={name}
              removeOnClick={removeOnClick}
              isHighlighted={isHighlighted}
            />
          );
        })}
        <input
          value={searchedText}
          ref={inputRef}
          placeholder={placeholder}
          className="outline-none flex flex-grow"
          onChange={(e) => e?.target?.value && onKeyUp(e.target.value)}
          onKeyUp={onKeyUpHandler}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>
      <div className="border-b-2 border-zinc-900"></div>
    </div>
  );
}

export default InputWithChips;
