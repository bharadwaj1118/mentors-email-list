import React from "react";

import { SearchInput } from "./search-input";
import FilterSingleSelect from "@/components/filter-single-select";
import MobileFilters from "@/components/mobile-filters";

interface Option {
  value: string;
  label: string;
}
export interface Country {
  id: string;
  label: string;
  value: string;
}

const sortData: Option[] = [
  {
    value: "asc",
    label: "Price: low to high",
  },
  {
    value: "desc",
    label: "Price: high to low",
  },
];

const countries: Country[] = [
  {
    id: "1",
    label: "United States",
    value: "United States",
  },
  {
    id: "2",
    label: "Canada",
    value: "Canada",
  },
  {
    id: "3",
    label: "Mexico",
    value: "Mexico",
  },
  {
    id: "4",
    label: "Afghanistan",
    value: "Afghanistan",
  },
];

const products: any[] = [];

export interface Language {
  id: string;
  label: string;
  value: string;
}

const languages: Language[] = [
  {
    id: "1",
    label: "English",
    value: "English",
  },
  {
    id: "2",
    label: "Spanish",
    value: "Spanish",
  },
  {
    id: "3",
    label: "French",
    value: "French",
  },
  {
    id: "4",
    label: "Telugu",
    value: "Telugu",
  },
];

interface ProfileSearchFiltersProps {
  searchParams: {
    query?: string;
    sort?: string;
  };
}

const ProfileSearchFilters = () => {
  return (
    <div className=" max-w-[1100px] mx-3 md:mx-6 bg-white rounded-md border mt-3 md:mt-6 p-3">
      <div className="md:flex items-center justify-between space-y-3">
        <div className="w-full md:w-[400px]">
          <SearchInput />
        </div>
        <div className="flex md:block justify-between items-center p-1 h-fit ">
          <MobileFilters languages={languages} countries={countries} />

          <div className="w-[200px]">
            <FilterSingleSelect
              name="Sort"
              valueKey="sort"
              data={sortData}
              displayLabel={false}
              placeholder="Sort by"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSearchFilters;
