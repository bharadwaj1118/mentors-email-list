import { db } from '@/lib/db';
import { MyCalendar } from './_components/mentor-calendar';
import React from 'react';
import { getSelf } from '@/lib/actions/user.action';


const SchedulePage = async() => {

  const currUser = await getSelf();
  if (!currUser) return (<div>Not logged in</div>)


  const user = await db.user.findUnique({
    where: {
        id: currUser.id
    },
    include: {
      events: true
    }
  })
  
  return (
    <div className="flex justify-center items-center h-screen">
      <MyCalendar user={JSON.stringify(user)}/>
    </div>
  );
};

export default SchedulePage;
