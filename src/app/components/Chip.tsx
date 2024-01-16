'use client';

import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export type ChipType = {
  id: string;
  name: string;
  avatar: string;
};

type ChipProps = ChipType & {
  removeOnClick: (e: React.MouseEvent<HTMLDivElement>) => void;
};

function Chip({ id, avatar, name, removeOnClick }: ChipProps) {
  return (
    <div className="bg-slate-100 border-slate-300 border rounded-full flex items-center p-0">
      <div className="rounded-full bg-slate-200 mr-2" style={{ width: '32px' }}>
        <img className="w-100" src={avatar} alt={name} />
      </div>
      <small className="text-sm capitalize">{name}</small>
      <div
        className="ml-2 mr-2"
        role="button"
        data-chipid={id}
        onClick={removeOnClick}
      >
        <FontAwesomeIcon
          width={12}
          icon={faXmark}
          className="pointer-events-none"
        />
      </div>
    </div>
  );
}

export default Chip;
