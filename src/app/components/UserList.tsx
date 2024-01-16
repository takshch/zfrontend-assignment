import { useEffect, useState } from 'react';
import List from './List';
import UserItem, { UserItemType } from './UserItem';
import { UserType } from '../types/UserType';
import { findAll } from 'highlight-words-core';

type UserListProps = {
  keyword: string;
  users: UserType[];
};

function UserList({ users, keyword }: UserListProps) {
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
          <UserItem {...item} />
        </li>
      ))}
    </List>
  );
}

export default UserList;
