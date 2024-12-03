import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Statistics from '@/components/ui/Statistics/Statistics';
import { useUser } from '@/lib/providers';
import { MessageSquareWarningIcon } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function Index() {
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex size-full select-none flex-col items-center overflow-y-auto">
      <Alert
        variant={'destructive'}
        className="bg-background/90 absolute top-4 z-50 w-fit self-center"
      >
        <MessageSquareWarningIcon className="size-4" />
        <AlertTitle>Keep in mind</AlertTitle>
        <AlertDescription>
          We are still working on this project!
        </AlertDescription>
      </Alert>
      <div className="flex size-full flex-col px-2">
        {user ? (
          <>
            <Statistics />
          </>
        ) : (
          <div className="mt-8 flex w-full flex-col items-center gap-4">
            <h1 className="text-2xl font-bold">Hey Buddy!</h1>

            <h2 className="p-4 text-justify text-xl">
              Save your statistics and play with your friends online via
              OnlyChill.
            </h2>

            <div>
              <h2 className="font-serif text-xl italic">Current Features</h2>
              <table className="rounded-md border-2 p-2">
                <tr className="border-b-2">
                  <th>Type</th>
                  <th className=" border-l-2">Name</th>
                </tr>
                <tr>
                  <td className="px-2">Statistics</td>
                  <td className=" border-l-2 px-2">
                    Drinking Beer, Smoking Shisha
                  </td>
                </tr>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
