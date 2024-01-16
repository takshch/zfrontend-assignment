'use client';

import { useEffect, useState } from 'react';
import { mockUsers } from '../mockUsers';
import Chip, { ChipType } from './Chip';

type InputWithChipsProps = {
  placeholder: string;
};

function InputWithChips({ placeholder }: InputWithChipsProps) {
  const [chips, setChips] = useState<ChipType[]>([]);
  const [selectedChip, setSelectedChip] = useState<ChipType>();

  useEffect(() => {
    setChips(
      mockUsers.map(({ email, name, avatar }) => ({ id: email, name, avatar }))
    );
  }, []);

  const removeOnClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    const chipId = target.getAttribute('data-chipid');
    if (!chipId) return;
    setChips((chips) => chips.filter(({ id }) => id !== chipId));
    if (selectedChip && selectedChip.id === chipId) {
      setSelectedChip(undefined);
    }
  };

  const onKeyUpHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Backspace') return;

    if (selectedChip) {
      setChips((chips) => chips.filter(({ id }) => id !== selectedChip.id));
      setSelectedChip(undefined);
    } else {
      const lastChip: ChipType | null = chips[chips.length - 1];
      if (!lastChip) return;
      setSelectedChip(lastChip);
    }
  };

  return (
    <div className="flex flex-col flex-grow">
      <div className="flex flex-wrap pb-2 px-2 gap-3">
        {chips.map((chip, index) => {
          const isHighlighted = selectedChip && selectedChip.id === chip.id;
          return (
            <Chip
              key={index}
              {...chip}
              removeOnClick={removeOnClick}
              isHighlighted={isHighlighted}
            />
          );
        })}
        <input
          placeholder={placeholder}
          className="outline-none flex flex-grow"
          onKeyUp={onKeyUpHandler}
        />
      </div>
      <div className="border-b-2 border-zinc-900"></div>
    </div>
  );
}

export default InputWithChips;
