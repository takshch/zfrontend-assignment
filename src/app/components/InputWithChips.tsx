'use client';

import { useEffect, useState } from 'react';
import { mockUsers } from '../mockUsers';
import Chip, { ChipType } from './Chip';

type InputWithChipsProps = {
  placeholder: string;
};

function InputWithChips({ placeholder }: InputWithChipsProps) {
  const [chips, setChips] = useState<ChipType[]>([]);

  useEffect(() => {
    setChips(
      mockUsers.map(({ email, name, avatar }) => ({ id: email, name, avatar }))
    );
  }, []);

  const remove = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    const chipId = target.getAttribute('data-chipid');
    if (!chipId) return;
    setChips((chips) => chips.filter(({ id }) => id !== chipId));
  };

  return (
    <div className="flex flex-col flex-grow">
      <div className="flex flex-wrap pb-2 px-2 gap-3">
        {chips.map((chip, index) => (
          <Chip {...chip} key={index} removeOnClick={remove} />
        ))}
        <input
          placeholder={placeholder}
          className="outline-none flex flex-grow"
        />
      </div>
      <div className="border-b-2 border-zinc-900"></div>
    </div>
  );
}

export default InputWithChips;
