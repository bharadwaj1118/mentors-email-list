import ProfileList from './_components/profile-list';

const profilesPage = async () => {
  return (
    <div className="max-w-5xl mx-auto  mt-6">
      <div className="mt-6">
        <ProfileList />
      </div>
    </div>
  );
};

export default profilesPage;
