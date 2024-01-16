import { useEffect, useState } from 'react';
import UserItem, { UserItemType } from './UserItem';
import { UserType } from '../types/UserType';
import { findAll } from 'highlight-words-core';
import List from './List';

type UserListProps = {
  keyword: string;
  users: UserType[];
  selectUser: (emailId: string) => void;
};

function UserList({ users, keyword, selectUser }: UserListProps) {
  const [items, setItems] = useState<UserItemType[]>();

  const onKeyUpHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const emailId = target?.getAttribute('data-email-id');
    if (!emailId) return;
    if (e.key === 'Enter') {
      selectUser(emailId);
    }
  };

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const emailId = target?.getAttribute('data-email-id');
    if (!emailId) return;
    selectUser(emailId);
  };

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
        <UserItem
          key={item.email}
          {...item}
          onClick={onClick}
          onKeyUp={onKeyUpHandler}
        />
      ))}
    </List>
  );
}

export default UserList;
