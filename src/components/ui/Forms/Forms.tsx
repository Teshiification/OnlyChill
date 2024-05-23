'use client';
import {
  Session,
  createClientComponentClient
} from '@supabase/auth-helpers-nextjs';
import { ReactNode, useState } from 'react';

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
      className="flex w-full flex-col gap-4 self-center md:w-1/2"
      aria-disabled={submitPending}
    >
      <div className="flex flex-wrap justify-around">{children}</div>
      <button
        type="submit"
        className="rounded-md bg-green-500 px-2 py-1 hover:bg-green-400"
      >
        Add
      </button>
    </form>
  );
};

export default Form;
