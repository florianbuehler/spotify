import React, { useEffect, useState } from 'react';
import { shuffle } from 'lodash';

const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500'
];

const Center: React.FC = () => {
  const [color, setColor] = useState<string | null>(null);

  useEffect(() => {
    setColor(shuffle(colors).pop()!);
  }, []);

  return (
    <div className="flex-grow">
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white padding-8`}
      >
        {/*<img src="" alt=""/>*/}
      </section>
    </div>
  );
};

export default Center;
