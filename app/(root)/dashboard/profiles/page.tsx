import { db } from '@/lib/db';
import ProfileList from './_components/profile-list';

const profilesPage = async () => {
  const users = await db.user.findMany();
  return (
    <div className="max-w-5xl mx-auto  mt-6">
      <div className="mt-6">
        <ProfileList users={JSON.stringify(users)}/>
      </div>
    </div>
  );
};

export default profilesPage;
