import classNames from 'classnames';

export type UserItemType = {
  avatar: string;
  name: string;
  nameChunks: { isHighlighted: boolean; value: string }[];
  email: string;
};

type UserItemProps = UserItemType & {
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  onKeyUp: (e: React.KeyboardEvent<HTMLDivElement>) => void;
};

function UserItem({
  avatar,
  name,
  nameChunks,
  email,
  onClick,
  onKeyUp,
}: UserItemProps) {
  return (
    <div
      tabIndex={0}
      data-email-id={email}
      className="flex items-center px-4 py-3 hover:bg-slate-100 focus:bg-slate-100 focus:outline-none"
      onClick={onClick}
      onKeyUp={onKeyUp}
    >
      <div
        className="rounded-full bg-slate-300 mr-4 pointer-events-none"
        style={{ width: '36px', height: '36px' }}
      >
        <img className="w-100" src={avatar} alt={name} />
      </div>
      <div className="mr-auto pointer-events-none overflow-hidden	text-ellipsis whitespace-nowrap">
        {nameChunks.map(({ value, isHighlighted }, index) => (
          <span
            key={index}
            className={classNames({ 'text-gray-300': isHighlighted })}
          >
            {value}
          </span>
        ))}
      </div>
      <div className="text-sm text-gray-400 pointer-events-none overflow-hidden	text-ellipsis whitespace-nowrap">
        {email}
      </div>
    </div>
  );
}

export default UserItem;
