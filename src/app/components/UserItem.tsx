import classNames from 'classnames';

export type UserItemType = {
  avatar: string;
  name: string;
  nameChunks: { isHighlighted: boolean; value: string }[];
  email: string;
};

function UserItem({ avatar, name, nameChunks, email }: UserItemType) {
  return (
    <div className="flex items-center px-4 py-3 hover:bg-slate-100">
      <div
        className="rounded-full bg-slate-300 mr-4"
        style={{ width: '36px', height: '36px' }}
      >
        <img className="w-100" src={avatar} alt={name} />
      </div>
      <div className="mr-auto">
        {nameChunks.map(({ value, isHighlighted }, index) => (
          <span
            key={index}
            className={classNames({ 'text-gray-300': isHighlighted })}
          >
            {value}
          </span>
        ))}
      </div>
      <div className="text-sm text-gray-400">{email}</div>
    </div>
  );
}

export default UserItem;
