'use client';

import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

export type ChipType = {
  id: string;
  name: string;
  avatar: string;
};

type ChipProps = ChipType & {
  isHighlighted?: boolean;
  removeOnClick: (e: React.MouseEvent<HTMLDivElement>) => void;
};

function Chip({ id, avatar, name, removeOnClick, isHighlighted }: ChipProps) {
  return (
    <div
      className={classNames(
        'bg-slate-100 border-slate-300 border rounded-full flex items-center p-0',
        {
          'bg-slate-300': isHighlighted,
        }
      )}
    >
      <div
        className={classNames('rounded-full bg-slate-300 mr-2', {
          'bg-slate-400': isHighlighted,
        })}
        style={{ width: '32px' }}
      >
        <img className="w-100" src={avatar} alt={name} />
      </div>
      <small className="text-sm capitalize cursor-pointer text-ellipsis whitespace-nowrap">
        {name}
      </small>
      <div
        role="button"
        style={{ width: '24px', height: '24px' }}
        className={classNames(
          'flex items-center justify-center ml-2 mr-1 hover:bg-slate-300 rounded-full',
          {
            'hover:bg-slate-400': isHighlighted,
          }
        )}
        data-chipid={id}
        onClick={removeOnClick}
      >
        <FontAwesomeIcon
          size="sm"
          icon={faXmark}
          className="pointer-events-none"
        />
      </div>
    </div>
  );
}

export default Chip;
