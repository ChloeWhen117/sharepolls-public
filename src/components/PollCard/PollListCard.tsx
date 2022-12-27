/* eslint-disable */
import { trpc } from "@/utils/trpc";
import { RefetchOptions, RefetchQueryFilters } from "@tanstack/react-query";
import { type PollType } from "@/utils/common";
import { useRouter } from "next/router";
import { useUserId } from "@/hooks/useUserId";

type RefetchType = <TPageData>(
  options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
) => any;

interface Props {
  poll: PollType;
  refetch: RefetchType;
}

export const PollListCard: React.FC<Props> = (props) => {
  const { poll, refetch } = props;
  const deletePoll = trpc.poll.deletePoll.useMutation();
  const router = useRouter();
  const { userId } = useUserId();

  const handleDelete = () => {
    deletePoll.mutate(
      { id: poll?.id || "" },
      {
        onSuccess: async (data) => {
          refetch();
        },
      }
    );
  };
  return (
    <div
      className="flex w-full justify-between rounded-lg bg-white p-8 shadow-md dark:hover:bg-white/90"
      onClick={() => {
        router.push(`/poll/${poll?.id}`);
      }}
    >
      <div className="flex flex-col" key={poll?.id}>
        <div className="text-lg font-bold text-gray-700">{poll?.title}</div>
        <div className="text-lg font-bold text-gray-700">{poll?.question}</div>
      </div>
      {poll?.authorId === userId && <button onClick={handleDelete}>X</button>}
    </div>
  );
};
