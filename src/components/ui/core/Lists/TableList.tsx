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
            <div className="flex flex-row justify-around dark:text-slate-50 text-slate-500 border-[1px] border-tremor-brand-subtle py-1 px-2">
              <div className="flex w-full justify-around">
                {item?.map((entry: any) => {
                  return <p>{entry}</p>;
                })}
              </div>
              <button
                onClick={() => deleteHandler(item)}
                title="Delete item"
                className="bg-orange-500 p-2 rounded-md"
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
