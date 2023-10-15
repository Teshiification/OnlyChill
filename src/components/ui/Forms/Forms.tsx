'use client';
import {
  Session,
  createClientComponentClient
} from '@supabase/auth-helpers-nextjs';
import { ReactNode, useEffect, useState } from 'react';
import Dropdown from '@core/Dropdown/Dropdown';

export type SupabaseActivityStatistics = {
  activity_type: string;
  product_name: string | null;
};

export interface FormProps {
  session: Session;
  children: ReactNode;
  submitData: SupabaseActivityStatistics;
}

const Form = ({ session, children, submitData }: FormProps) => {
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
        .from('activity_statistics')
        .insert({
          user_id: user.id,
          activity_type: submitData.activity_type,
          product_name: submitData.product_name
        })
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
    } finally {
      setSubmitPending(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="self-center w-full md:w-1/2 gap-4 flex flex-col"
      aria-disabled={submitPending}
    >
      <div className="flex flex-wrap justify-around">{children}</div>
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
