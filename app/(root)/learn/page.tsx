import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react';

const page = () => {
  return (
    <div>
      <div className="flex justify-center space-x-6">
        <Button variant="default">This is a primary Button!</Button>
        <Button variant="secondary">This is a secondary Button!</Button>
        <Button variant="outline">This is a teritory Button!</Button>
      </div>

      <div>
        Please enter text:
        <Input placeholder="This is a placeholder" className="w-[360px]" />
      </div>
    </div>
  );
};

export default page;
