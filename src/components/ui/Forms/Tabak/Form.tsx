'use client';

import { Session } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';
import Dropdown from '../../core/Dropdown/Dropdown';
import Form, { SupabaseActivityStatistics } from '../Forms';

export interface TabakFormProps {
  session: Session;
}

const TabakForm = ({ session }: TabakFormProps) => {
  const tabakType: string[] = [
    'peach',
    'dragonfruit',
    'citrus',
    'watermelon',
    'kiwi',
    'blueberry',
    'double apple',
    'other fruity',
    'others'
  ];

  const [selectedTabakType, setSelectedTabakType] = useState(tabakType[0]);
  const [selectedData, setSelectedData] = useState<SupabaseActivityStatistics>({
    activity_type: 'smoking shisha',
    product_name: selectedTabakType
  });

  useEffect(() => {
    const data: SupabaseActivityStatistics = {
      activity_type: 'smoking shisha',
      product_name: selectedTabakType
    };

    setSelectedData(data);
  }, [selectedTabakType]);

  return (
    <Form session={session} submitData={selectedData}>
      <Dropdown
        items={tabakType}
        selectedItem={selectedTabakType}
        setSelectedItem={setSelectedTabakType}
      />
      <label className="opacity-50">{new Date().toLocaleTimeString()}</label>
    </Form>
  );
};

export default TabakForm;
