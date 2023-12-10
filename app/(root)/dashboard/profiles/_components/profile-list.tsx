import { IProfile } from '@/database/profile.model';
import ProfileCard from './profile-card';
import { getProfiles } from '@/lib/actions/profile.action';
import { getAllUsers } from '@/lib/actions/user.action';

export default async function ProfileList() {
  const result = await getAllUsers();

  return (
    <section className="max-w-[1100px] m-3 md:m-6">
      {result.users.map((user) => (
        <ProfileCard key={user._id} user={JSON.stringify(user)} />
      ))}
    </section>
  );
}
