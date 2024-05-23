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
              className="border-tremor-brand-subtle group relative flex h-80 w-full flex-row justify-around overflow-hidden rounded-md border p-2 text-slate-500 md:w-40 dark:text-slate-50"
            >
              <div className="absolute bottom-0 z-20 w-full bg-black bg-opacity-20 p-2">
                {item?.map((entry: any) => {
                  return <p>{entry}</p>;
                })}
              </div>
              <img
                src={item?.img || ''}
                className="trasform absolute size-full object-cover duration-300 ease-in-out group-hover:scale-105"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default CardList;
