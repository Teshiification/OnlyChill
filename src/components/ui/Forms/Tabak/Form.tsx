'use client';
import {
  Session,
  createClientComponentClient
} from '@supabase/auth-helpers-nextjs';
import { useState } from 'react';

const TabakForm = ({ session }: { session: Session | null }) => {
  const [name, setName] = useState('');
  const [submitPending, setSubmitPending] = useState<boolean>(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const user = session?.user;

    if (!user) {
      console.error('User is not authenticated.');
      return;
    }
    console.log(name, e);
    try {
      setSubmitPending(true);
      const supabase = createClientComponentClient();
      const { data, error } = await supabase
        .from('activity_statistics')
        .insert({
          activity_type: 'smoking shisha',
          product_name: name,
          user_id: user.id
        })
        .select()
        .single();

      if (error || !data) {
        alert('Error while adding data to the database:' + error?.message);
      } else {
        console.log('Data inserted successfully:', data);
        alert('Successfully added');
        setName('');
      }
    } catch (error) {
      console.error('Error inserting data:', error);
    }
    setSubmitPending(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="self-center w-full md:w-1/2 gap-4 flex flex-col"
      aria-disabled={submitPending}
    >
      <div className="flex justify-around">
        <label className="flex gap-4">
          Tabak name
          <input
            type="text"
            value={name}
            className="px-2 bg-opacity-10 text-slate-900 rounded-md"
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="opacity-50">{new Date().toLocaleTimeString()}</label>
      </div>
      <button
        type="submit"
        className="hover:bg-green-400 bg-green-500 rounded-md px-2 py-1"
      >
        Add
      </button>
    </form>
  );
};

export default TabakForm;
