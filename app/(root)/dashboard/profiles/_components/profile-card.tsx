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
import { Profile } from '@prisma/client';
import { Separator } from '@/components/ui/separator';
import { IProfile } from '@/database/profile.model';

interface ProfileCardProps {
  profile: IProfile;
}

const ProfileCard = ({ profile }: ProfileCardProps) => {
  return (
    <div className="w-full mt-6">
      <div className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8">
        <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

        {/* header */}
        <div className="flex justify-between space-x-8 items-center">
          <div className="flex  space-x-3">
            {/* image */}
            <div className="block shrink-0">
              <img
                alt="Paul Clapton"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
                className="h-16 w-16 rounded-lg object-cover shadow-sm"
              />
            </div>

            {/* profile in medium devices*/}
            <div className="hidden md:block">
              <h3 className="h3">{profile.username}</h3>
              <h6 className="h6">{profile.role} @Google</h6>
              <div className="flex md:space-x-4 text-muted-foreground justify-start">
                <div className="flex items-center justify-start">
                  <MapPinIcon className="h-4 w-4 mr-1" />
                  Atens, Greece
                </div>
                <div className="flex items-center ">
                  <LanguageIcon className="h-4 w-4 mr-1" />
                  English, Greek
                </div>
              </div>

              <div className="flex md:space-x-4 text-muted-foreground justify-start">
                <div className="flex items-center ">
                  <GlobeAltIcon className="h-4 w-4 mr-1" />
                  Unitedstates, America
                </div>
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
              <span className="text-green-600 font-semibold mr-1">Free</span>
              <CreditCardIcon className="h-4 w-4" />
            </p>
          </div>
        </div>

        {/* profile */}
        <div className="block mt-3 md:hidden ">
          <p>{profile.username}</p>
          <p>{profile.role}</p>
          <div className="md:flex md:flex-wrap md:space-x-4 text-muted-foreground justify-start">
            <div className="flex items-center ">
              <MapPinIcon className="h-4 w-4 mr-1" />
              Atens, Greece
            </div>
            <div className="flex items-center ">
              <LanguageIcon className="h-4 w-4 mr-1" />
              English, Greek
            </div>
            <div className="flex items-center ">
              <GlobeAltIcon className="h-4 w-4 mr-1" />
              Unitedstates, America
            </div>
            <div className="flex items-center ">
              <BoltIcon className="h-4 w-4 mr-1 text-green-600 fill-green-600 outline-green-600" />
              Usually responds in 8 hours
            </div>
          </div>
        </div>

        {/* content */}
        <div className="my-4">
          <p className=" text-sm text-gray-500">{profile.bio}</p>
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
              <Badge variant="outline" className="text-muted-foreground">
                Java
              </Badge>
              <Badge variant="outline" className="text-muted-foreground">
                C
              </Badge>
              <Badge variant="outline" className="text-muted-foreground">
                Python
              </Badge>
              <Badge variant="outline" className="text-muted-foreground">
                Node js
              </Badge>
            </TabsContent>
            <TabsContent value="industry" className="space-x-4 space-y-2">
              <Badge variant="outline" className="text-muted-foreground">
                Marketing
              </Badge>
              <Badge variant="outline" className="text-muted-foreground">
                Customer support
              </Badge>
              <Badge variant="outline" className="text-muted-foreground">
                Productivity
              </Badge>
              <Badge variant="outline" className="text-muted-foreground">
                session Manager
              </Badge>
            </TabsContent>
            <TabsContent value="skills" className="space-x-4  space-y-2">
              <Badge variant="outline" className="text-muted-foreground">
                Zapier
              </Badge>
              <Badge variant="outline" className="text-muted-foreground">
                Outlook
              </Badge>
              <Badge variant="outline" className="text-muted-foreground">
                Microsoft word
              </Badge>
              <Badge variant="outline" className="text-muted-foreground">
                Computers
              </Badge>
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
              <p className="text-xs text-gray-500">30 minute</p>
              <p className="text-sm font-medium text-gray-600">Session time</p>
            </div>
          </div>

          <div className="flex space-x-6 justify-center items-end">
            <Link href="/">
              <Button variant="outline" className="text-blue-800" size="lg">
                View Profile
              </Button>
            </Link>
            <Link href="/">
              <Button size="lg">Book session</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
