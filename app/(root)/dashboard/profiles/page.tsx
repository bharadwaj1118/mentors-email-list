import ProfileList from "./_components/profile-list";
import ProfileFilters from "./_components/profile-filters";
import { getUsersWithProfileFilters } from "@/lib/actions/user.action";
import ProfileSearchFilters from "./_components/profile-search-filters";

interface ProfilesPageProps {
  searchParams: {
    countries?: string;
    industries?: string;
    languages?: string;
    tools?: string;
    price?: string;
  };
}

const profilesPage = async ({ searchParams }: ProfilesPageProps) => {
  const users = await getUsersWithProfileFilters(searchParams);

  return (
    <div className="max-w-7xl mx-auto pt-[80px] px-3">
      <div className="flex">
        <section className="max-w-7xl mt-6 hidden md:block">
          <ProfileFilters />
        </section>
        <div className="w-full">
          <section className="w-full ">
            <ProfileSearchFilters />
          </section>
          <section className="mt-6">
            <ProfileList users={JSON.stringify(users)} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default profilesPage;
