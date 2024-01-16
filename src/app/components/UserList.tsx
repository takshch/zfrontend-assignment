import { useEffect, useState } from 'react';
import UserItem, { UserItemType } from './UserItem';
import { UserType } from '../types/UserType';
import { findAll } from 'highlight-words-core';
import List from './List';

type UserListProps = {
  keyword: string;
  users: UserType[];
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
};

function UserList({ users, keyword, onClick }: UserListProps) {
  const [items, setItems] = useState<UserItemType[]>();

  useEffect(() => {
    const searchWords = [keyword];

    const items = users.map(({ name, email, avatar }) => {
      const chunks = findAll({
        searchWords,
        textToHighlight: name,
        caseSensitive: false,
      });
      const nameChunks = chunks.map(
        ({ start, end, highlight: isHighlighted }) => {
          const value = name.substring(start, end);
          return { value, isHighlighted };
        }
      );
      return { avatar, name, nameChunks, email };
    });

    setItems(items);
  }, [keyword, users]);

  if (!items) return <></>;

  return (
    <List>
      {items.map((item) => (
        <li key={item.email}>
          <UserItem {...item} onClick={onClick} />
        </li>
      ))}
    </List>
  );
}

export default UserList;
