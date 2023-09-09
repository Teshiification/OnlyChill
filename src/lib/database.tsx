import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { User } from '@supabase/supabase-js'; // Adjust this import as per your library

export interface StatisticsShisha {
  id: string;
  created_at: Date;
  name: string;
  user: User;
}

export const supabase = createServerComponentClient({ cookies });

export const getUser = async (): Promise<User | null> => {
  try {
    const user = await supabase.auth.getUser();
    return user.data.user as User;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};

export const getStatisticsShisha = async (): Promise<StatisticsShisha[]> => {
  try {
    const user = await getUser();
    if (!user) {
      return [];
    }

    const { data, error } = await supabase
      .from('statistics_shisha')
      .select('*')
      .eq('user', user.id);

    if (error) {
      throw error;
    }

    return (data as StatisticsShisha) || [];
  } catch (error) {
    console.error('Error fetching statistics shisha:', error);
    return [];
  }
};
