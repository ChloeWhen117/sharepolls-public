import { type RouterOutputs } from "@/utils/trpc";
type PollType = RouterOutputs["poll"]["createPoll"];

export const PollDetails: React.FC<{ poll: PollType }> = (props) => {
  const { poll } = props;
  return (
    <div className="container flex flex-col gap-4 p-24">
      <div className="flex p-4 font-bold text-white">Poll Details.</div>
      <div className="flex p-4 font-bold text-white">{poll?.title}</div>
      <div className="flex p-4 font-bold text-white">{poll?.question}</div>
    </div>
  );
};
