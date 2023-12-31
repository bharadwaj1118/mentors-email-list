
import ProfileCard from './profile-card';

interface ProfileListProps {
  users: string;
}

export default async function ProfileList({users}: ProfileListProps) {
  const parsedUsers = JSON.parse(users);

  return (
    <section className="max-w-[1100px] m-3 md:m-6">
      {parsedUsers && Array.isArray(parsedUsers) && parsedUsers.map((user) => (
        <ProfileCard key={user._id} user={JSON.stringify(user)} />
      ))}

    </section>
  );
}
