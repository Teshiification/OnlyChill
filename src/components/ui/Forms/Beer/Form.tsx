'use client';

import { Session } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';
import Dropdown from '../../core/Dropdown/Dropdown';
import Form, { SupabaseActivityStatistics } from '../Forms';

export interface BeerFormProps {
  session: Session;
}

const BeerForm = ({ session }: BeerFormProps) => {
  const beerTypes: string[] = [
    'normal beer',
    'light beer',
    'dark beer',
    'mixed beer'
  ];

  const [selectBeerType, setSelectBeerType] = useState(beerTypes[0]);
  const [selectedData, setSelectedData] = useState<SupabaseActivityStatistics>({
    activity_type: 'drinking beer',
    product_name: selectBeerType
  });

  useEffect(() => {
    const data: SupabaseActivityStatistics = {
      activity_type: 'drinking beer',
      product_name: selectBeerType
    };

    setSelectedData(data);
  }, [selectBeerType]);

  return (
    <Form session={session} submitData={selectedData}>
      <Dropdown
        items={beerTypes}
        selectedItem={selectBeerType}
        setSelectedItem={setSelectBeerType}
      />
      <label className="opacity-50">{new Date().toLocaleTimeString()}</label>
    </Form>
  );
};

export default BeerForm;
