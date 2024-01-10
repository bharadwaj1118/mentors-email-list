import Link from 'next/link';
import React from 'react';
{
  /* import map-pin from heroicons */
}
import {
  MapPinIcon,
  LanguageIcon,
  GlobeAltIcon,
  BoltIcon,
  StarIcon,
  CreditCardIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { arrayToValuesString } from '@/lib/utils';
import { profile } from 'console';

interface ProfileCardProps {
  user: string;
}

const ProfileCard = ({ user }: ProfileCardProps) => {
  const data = JSON.parse(user);
  console.log(data);

  const {
    id, city, imageUrl,
    username,duration, price, position,
    organization, role, bio, toolkit,
    industries, expertise, languages, country } = data;
  return (
    <div className="w-full mt-6 bg-white">
      <div className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8">
        <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

        {/* header */}
        <div className="flex justify-between space-x-8 items-center">
          <div className="flex  space-x-3">
            {/* image */}
            <div className="block shrink-0">
              <img
                alt={username}
                src={imageUrl}
                className="h-16 w-16 rounded-lg object-cover shadow-sm"
              />
            </div>

            {/* profile in medium devices*/}
            <div className="hidden md:block">
              <h3 className="h3">{username}</h3>
              <h6 className="h6">
                {position} @{organization}
              </h6>
              <div className="flex md:space-x-4 text-muted-foreground justify-start">
                <div className="flex items-center justify-start">
                  <MapPinIcon className="h-4 w-4 mr-1" />
                  {city}, {country && country!.label}
                </div>
                <div className="flex items-center ">
                  <LanguageIcon className="h-4 w-4 mr-1" />
                  {arrayToValuesString(languages)}
                </div>
              </div>

              <div className="flex md:space-x-4 text-muted-foreground justify-start">
                {/* <div className="flex items-center ">
                  <GlobeAltIcon className="h-4 w-4 mr-1" />
                  {data.city}, {data.country!.label}
                </div> */}
                <div className="flex items-center">
                  <BoltIcon className="h-4 w-4 mr-1 text-green-600 fill-green-600 outline-green-600" />
                  Usually responds in 8 hours
                </div>
              </div>
            </div>
          </div>

          {/* review */}
          <div className=" w-[100px]">
            <h4 className="h4 font-semibold text-xl text-end flex items-center justify-end">
              <StarIcon className="h-4 w-4 mr-1 text-yellow-400 fill-yellow-400" />
              4.99
            </h4>
            <p className="text-sm text-muted-foreground text-end">
              319 reviews /
            </p>
            <p className="text-sm text-muted-foreground text-end">
              516 sessions
            </p>
            <p className="flex justify-end items-center">
              <span className="text-green-600 font-semibold mr-1">
                ${price}
              </span>
              <CreditCardIcon className="h-4 w-4" />
            </p>
          </div>
        </div>

        {/* profile */}
        <div className="block mt-3 md:hidden ">
          <p>{username}</p>
          <p>{role}</p>
          <div className="md:flex md:flex-wrap md:space-x-4 text-muted-foreground justify-start">
            <div className="flex items-center ">
              <MapPinIcon className="h-4 w-4 mr-1" />
              Atens, Greece
            </div>
            <div className="flex items-center ">
              <LanguageIcon className="h-4 w-4 mr-1" />
              {arrayToValuesString(languages)}
            </div>
            <div className="flex items-center ">
              <GlobeAltIcon className="h-4 w-4 mr-1" />
              {city}, {}
            </div>
            <div className="flex items-center ">
              <BoltIcon className="h-4 w-4 mr-1 text-green-600 fill-green-600 outline-green-600" />
              Usually responds in 8 hours
            </div>
          </div>
        </div>

        {/* content */}
        <div className="my-4">
          <p className="text-md  text-gray-700 line-clamp-3">{bio}</p>
        </div>

        {/* skills Tab */}

        <div className=" border-1 p-3 rounded-sm shadow-sm bord border-gray-100">
          <Tabs defaultValue="expertise" className="w-full ">
            <TabsList>
              <TabsTrigger value="expertise">Expertise</TabsTrigger>
              <TabsTrigger value="industry">Industry</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
            </TabsList>
            <TabsContent value="expertise" className="space-x-4 space-y-2">
              {data!.expertise!.map((expertise: any) => (
                <Badge
                  variant="outline"
                  className="text-muted-foreground"
                  key={expertise.value}
                >
                  {expertise.label}
                </Badge>
              ))}
            </TabsContent>
            <TabsContent value="industry" className="space-x-4 space-y-2">
              {data!.industries!.map((industry: any) => (
                <Badge
                  variant="outline"
                  className="text-muted-foreground"
                  key={industry.value}
                >
                  {industry.label}
                </Badge>
              ))}
            </TabsContent>
            <TabsContent value="skills" className="space-x-4  space-y-2">
              {toolkit!.map((skill: any) => (
                <Badge
                  variant="outline"
                  className="text-muted-foreground"
                  key={skill.value}
                >
                  {skill.label}
                </Badge>
              ))}
            </TabsContent>
          </Tabs>
        </div> 

        {/* footer */}
         <div className="md:flex md:justify-between mt-3">
          <div className="hidden mt-6 md:flex gap-4 sm:gap-6">
            <div className="flex flex-col-reverse">
              <p className="text-xs text-gray-500">31st June, 2021</p>
              <p className="text-sm font-medium text-gray-600">Joined</p>
            </div>

            <div className="flex flex-col-reverse">
              <p className="text-xs text-gray-500">{duration} minute</p>
              <p className="text-sm font-medium text-gray-600">Session time</p>
            </div>
          </div>

          <div className="flex space-x-6 justify-center items-end">
          <Button asChild variant="outline" className="text-blue-800" size="lg">
            <Link href={`/dashboard/profile/${id}`}>
                View Profile
            </Link>
          </Button>
       
          <Button size="lg" asChild>
            <Link href={`/dashboard/schedule/${id}`}>
              Book session
            </Link>
          </Button>
          </div>
        </div> 
      </div>
    </div>
  );
};

export default ProfileCard;
