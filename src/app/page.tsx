'use client';

import { useEffect, useState } from 'react';
import InputWithChips from './components/InputWithChips';
import UserList from './components/UserList';
import { mockUsers } from './mockUsers';
import { UserType } from './types/UserType';
import { UserItemType } from './components/UserItem';

export default function Home() {
  const [users, setUsers] = useState<UserType[]>(mockUsers);
  const [availableUsers, setAvailableUsers] = useState<UserType[]>(users);
  const [searchedUsers, setSearchedUsers] = useState<UserType[]>(users);
  const [selectedUsers, setSelectedUsers] = useState<UserType[]>();
  const [searchedText, setSearchedText] = useState<string>('');
  const [shouldShowList, setShouldShowList] = useState<boolean>(false);

  useEffect(() => {
    console.log(searchedUsers);
  }, [searchedUsers]);

  const handleSearch = (searchedText: string) => {
    setSearchedText(searchedText);

    const pattern = new RegExp(`^${searchedText}`);
    const searchedUsers = availableUsers.filter(({ name }) =>
      pattern.test(name.toLowerCase())
    );

    setSearchedUsers(searchedUsers);
  };

  const showList = () => setShouldShowList(true);
  const hideList = () => setShouldShowList(false);

  return (
    <main className="flex flex-col gap-8 min-h-screen flex-col items-center mt-8">
      <h1 className="text-2xl text-slate-600">Pick Users</h1>
      <div className="w-3/5">
        <InputWithChips
          placeholder={'Add new users'}
          searchedText={searchedText}
          onKeyUp={handleSearch}
          onFocus={showList}
          onBlur={hideList}
        />
      </div>
      {shouldShowList && searchedUsers && (
        <UserList users={searchedUsers} keyword={searchedText} />
      )}
    </main>
  );
}
