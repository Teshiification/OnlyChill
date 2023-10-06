'use client';
import {
  Session,
  createClientComponentClient
} from '@supabase/auth-helpers-nextjs';
import { useState } from 'react';

const BeerForm = ({ session }: { session: Session | null }) => {
  const [submitPending, setSubmitPending] = useState<boolean>(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const user = session?.user;

    if (!user) {
      console.error('User is not authenticated.');
      return;
    }
    try {
      setSubmitPending(true);
      const supabase = createClientComponentClient();
      const { data, error } = await supabase
        .from('statistics_beer')
        .insert({ user: user.id })
        .select()
        .single();

      if (error || !data) {
        alert('Error while adding data to the database:' + error?.message);
      } else {
        console.log('Data inserted successfully:', data);
        alert('Successfully added');
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

export default BeerForm;
