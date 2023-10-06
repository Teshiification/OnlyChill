import { FC } from 'react';

export interface CardListProps {
  title?: string;
  items: any[];
}

const CardList: FC<CardListProps> = (props: CardListProps) => {
  const clickHandler = (item: any) => {
    console.log(item);
  };
  return (
    <div className="flex flex-col">
      {props?.title && <h1>{props.title}</h1>}
      <div className="flex flex-wrap gap-4">
        {props.items?.map((item: any, index: any) => {
          return (
            <div
              key={index}
              onClick={() => clickHandler(item)}
              className="relative group flex flex-row md:w-40 w-full h-80 justify-around dark:text-slate-50 text-slate-500 border-[1px] border-tremor-brand-subtle p-2 rounded-md overflow-hidden"
            >
              <div className="absolute w-full z-20 bottom-0 p-2 bg-black bg-opacity-20">
                {item?.map((entry: any) => {
                  return <p>{entry}</p>;
                })}
              </div>
              <img
                src={item?.img || ''}
                className="absolute w-full h-full object-cover group-hover:scale-105 trasform ease-in-out duration-300"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default CardList;
