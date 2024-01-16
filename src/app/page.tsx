import Chip from './components/Chip';
import InputWithChips from './components/InputWithChips';
import { mockUsers } from './mockUsers';

export default function Home() {
  return (
    <main className="flex flex-col gap-8 min-h-screen flex-col items-center mt-8">
      <h1 className="text-2xl text-slate-600">Pick Users</h1>
      <div className="w-3/5">
        <InputWithChips placeholder={'Add new users'} />
      </div>
    </main>
  );
}
