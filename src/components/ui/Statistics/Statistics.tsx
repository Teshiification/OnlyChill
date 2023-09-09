'use client';
import { User, createClient } from '@supabase/supabase-js';
import React, { useState, useEffect } from 'react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
//@ts-ignore
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Statistics = () => {
  const [user, setUser] = useState<User | undefined | null>();
  const [name, setName] = useState('');

  useEffect(() => {
    async function fetchUserData() {
      const { data: user } = await supabase.auth.getUser();
      if (user) {
        //@ts-ignore
        setUser(user);
      } else {
        console.error('Error fetching user data');
      }
    }
    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      console.error('User is not authenticated.');
      return;
    }

    const { data, error } = await supabase
      .from('statistics_shisha')
      .insert([{ name, user: user.id }]);

    if (error) {
      alert(error);
      console.error('Error inserting data:', error);
    } else {
      console.log('Data inserted successfully:', data);
      alert('Successfully added');
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <button type="submit">Add</button>
    </form>
  );
};

export default Statistics;
