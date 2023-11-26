import React from 'react';
import Image from 'next/image';

const TeamImg1 = '/mentors-cx.png';
const TeamImg2 = '/mentors-cx.png';
const TeamImg3 = '/mentors-cx.png';

const team = [
  {
    name: 'Janette Lynch',
    title: 'Senior Director',
    avatar: {
      src: TeamImg1,
      width: 480,
      height: 560,
    },
  },
  {
    name: 'Marcell Ziemann',
    title: 'Principal Strategist',
    avatar: {
      src: TeamImg2,
      width: 580,
      height: 580,
    },
  },
  {
    name: 'Robert Palmer',
    title: 'Marketing Engineer',
    avatar: {
      src: TeamImg3,
      width: 580,
      height: 580,
    },
  },
];

const page = () => {
  return (
    <section className="container">
      <div className="flex items-center justify-center flex-col ">
        <div className="font-bold text-3xl text-gray-800">About us</div>
        <div className="text-lg leading-relaxed text-slate-500 mt-3">
          We are a small passionate team. A guy from Central America and another
          one from India.
        </div>
      </div>

      <div className="flex flex-col gap-3 mx-auto max-w-4xl mt-16">
        <h2 className="font-bold text-3xl text-gray-800">
          Empowering the world with Mentors CX.
        </h2>
        <p className="text-lg leading-relaxed text-slate-500">
          CX and the experiences we’ve had - good and bad. Also the inspiration
          of creating a platform where CX leaders can help others get unstuck.
          There’s a lot of content out there, and some public communities, but
          it’s harder than you’d think to get on a 1:1 call for guidance.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-10 mx-auto max-w-4xl mt-12">
        {team.map((item, index) => (
          <div className="group" key={index}>
            <div className="w-full aspect-square">
              <Image
                src={item.avatar.src}
                alt="team"
                className="w-full h-full object-fit rounded transition  group-hover:-translate-y-1 group-hover:shadow-xl"
                width={item.avatar.width}
                height={item.avatar.height}
              />
            </div>
            <div className="mt-4 text-center">
              <h2 className="text-lg text-gray-800">{item.name}</h2>
              <h3 className="text-sm text-slate-500">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default page;
