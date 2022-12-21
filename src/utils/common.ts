import { type RouterOutputs } from "@/utils/trpc";
export type PollType = RouterOutputs["poll"]["getByPollId"];
export type PollVoteType = RouterOutputs["pollVote"]["getUniqueUserVoteById"];

export const isProd: boolean = process.env.NODE_ENV === "production";

export const getPollUrl = (pollId: string): string => {
  return isProd
    ? `${process.env.NEXT_PUBLIC_PROD_URL}/poll/${pollId}`
    : `${process.env.NEXT_PUBLIC_LOCAL_URL}/poll/${pollId}`;
};

export const getUserVoteRecord = (
  poll: PollType,
  userId: string
): PollVoteType => {
  const pollVote = poll?.voteCounts.find(
    (element) => element.userId === userId
  );
  return pollVote;
};
