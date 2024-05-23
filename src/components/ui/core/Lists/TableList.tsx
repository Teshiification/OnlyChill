import { User } from 'next-auth';
import { FC } from 'react';

export interface TableListProps {
  title?: string;
  items: any[];
}

const CustomerList: FC<TableListProps> = (props: TableListProps) => {
  const deleteHandler = (item: any) => {
    console.log(item);
  };
  return (
    <div className="flex flex-col">
      {props?.title && <h1>{props.title}</h1>}
      <div className="flex flex-col gap-4">
        {props.items?.map((item: any, index: any) => {
          return (
            <div className="border-tremor-brand-subtle flex flex-row justify-around border px-2 py-1 text-slate-500 dark:text-slate-50">
              <div className="flex w-full justify-around">
                {item?.map((entry: any, index: number) => {
                  return <p>{entry}</p>;
                })}
              </div>
              <button
                onClick={() => deleteHandler(item)}
                title="Delete item"
                className="rounded-md bg-orange-500 p-2"
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default CustomerList;
