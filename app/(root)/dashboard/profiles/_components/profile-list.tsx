import { IProfile } from '@/database/profile.model';
import ProfileCard from './profile-card';
import { getProfiles } from '@/lib/actions/profile.action';
import console from 'console';

export default async function ProfileList() {
  const result = await getProfiles();
  console.log(result.profiles[0].id);
  console.log(result.profiles[0]._id);

  return (
    <section className="max-w-[1100px] m-3 md:m-6">
      {result.profiles.map((profile) => (
        <ProfileCard key={profile._id} profile={profile} />
      ))}
    </section>
  );
}
