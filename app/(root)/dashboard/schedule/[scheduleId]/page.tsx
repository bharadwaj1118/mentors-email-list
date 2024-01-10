import { db } from '@/lib/db';
import  {BookingCalendar}  from './_components/booking-calendar';
import React from 'react';

import { getSelf } from '@/lib/actions/user.action';
import { getAllSessions } from '@/lib/actions/session.action';


interface SchedulePageProps {
    params: {
      scheduleId: string;
    };
  }


const SchedulePage = async({ params }: SchedulePageProps) => {

    {/* check if premium */}

    const { scheduleId } = params;
    const sessions = await getAllSessions(scheduleId)

  return (
    <div className="flex justify-center items-center h-screen">
      <BookingCalendar sessions={JSON.stringify(sessions)}/>
    </div>
  );
};

export default SchedulePage;
