'use client';
import { useEffect, useState } from 'react';
import { columns } from '@/components/ui/Forms/Tabak/columns';
import { DataTable } from '@/components/ui/Forms/Tabak/data-table';
import { taskSchema } from '@/components/ui/Forms/Tabak/data/schema';
import { z } from 'zod';
// import { getUser } from '@/lib/middleware';
import { PostgrestResponse, User } from '@supabase/supabase-js';

async function getTasks({ req }) {
  // const { user, error } = await getUser(req);

  if (error || !user) {
    // Redirect to login page if not authenticated
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }
  const {
    data,
    error
  }: PostgrestResponse<{
    user_id: string;
    created_at: Date;
    activity_type: string;
    product_name: string;
    organization_id: string;
  }> = await supabaseClient
    .from('activity_statistics')
    .select('*')
    // .eq('user_id', user!.id)
    .eq('activity_type', 'smoking shisha');

  if (error) {
    console.error(error);
    return [];
  }

  return z.array(taskSchema).parse(data);
}

export default function TaskPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTasks() {
      const user: User | undefined = await getUser();
      if (!user) {
        setLoading(false);
        return;
      }
      const tasks = await getTasks();
      setTasks(tasks);
      setLoading(false);
    }

    fetchTasks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <DataTable data={tasks} columns={columns} />
    </>
  );
}
