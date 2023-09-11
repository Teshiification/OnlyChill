'use client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { User } from 'next-auth';
import { useEffect, useState } from 'react';

const Form = () => {
  const supabase = createClientComponentClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  });

  const [user, setUser] = useState<User | undefined | null>();
  const [name, setName] = useState('');

  useEffect(() => {
    async function fetchUserData() {
      const user = (await supabase.auth.getUser()).data.user;
      if (user) {
        setUser(user as User);
      } else {
        console.error('Error fetching user data');
      }
    }
    fetchUserData();
  }, [supabase, setUser]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!user) {
      console.error('User is not authenticated.');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('statistics_shisha')
        .insert({ name: name, user: user.id })
        .select()
        .single();

      if (error || !data) {
        alert('Error while adding data to the database');
      } else {
        console.log('Data inserted successfully:', data);
        alert('Successfully added');
        setName('');
      }
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="self-center w-full md:w-1/2 gap-4 flex flex-col"
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

export default Form;
