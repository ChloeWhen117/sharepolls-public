/* eslint-disable */
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { trpc } from "@/utils/trpc";
import { getPollUrl, getUserVoteRecord, type PollType } from "@/utils/common";
import { useUserId } from "@/hooks/useUserId";
import { DismissableAlert } from "@/components/common/Alert/DismissableAlert";

const FormSchema = z.object({
  optionId: z.string(),
});

type FormSchemaType = z.infer<typeof FormSchema>;

export const PollDetails: React.FC<{ poll: PollType }> = (props) => {
  const { poll } = props;
  const { userId } = useUserId();
  const userVoteRecord = getUserVoteRecord(poll, userId);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful },
  } = useForm<FormSchemaType>({
    defaultValues: { optionId: userVoteRecord?.optionId },
    resolver: zodResolver(FormSchema),
  });
  const castVote = trpc.pollVote.castVote.useMutation();
  const submitLabel = userVoteRecord?.optionId ? "Update Vote" : "Submit Vote";
  const totalVotes = poll?.voteCounts.length;
  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    const input = {
      userId,
      pollId: poll?.id || "",
      optionId: data.optionId || "",
    };
    if (input.optionId !== "" && input.optionId !== "") {
      castVote.mutate(input);
    }
  };

  return (
    <section className="container flex flex-col gap-4 py-24 px-48">
      <h2 className="mx-auto flex max-w-xs p-4 text-5xl font-bold text-white">
        Poll Details
      </h2>
      <div className="rounded-md border-2 border-white">
        <p className="flex p-4 font-bold text-white">{poll?.title}</p>
        <div className="container mx-2 my-4 flex w-fit justify-center break-all rounded-md bg-gradient-to-b from-purple-700 to-[#15162c] py-4">
          <p className="text-4xl font-bold text-white">"{poll?.question}"</p>
        </div>
      </div>
      <div className="flex gap-4 whitespace-nowrap p-4 font-bold text-white">
        <span className="flex">Share URL:</span>
        <div className="rounded-s w-full border-2 border-zinc-800 bg-neutral-900">
          {getPollUrl(poll?.id || "")}
        </div>
      </div>
      <div className="flex flex-col px-8">
        <p className="max-w-ws mx-auto flex p-4 font-bold text-white">
          Vote for one
        </p>
        {userVoteRecord && (
          <div className="py-4">
            <DismissableAlert type="info" message="You have previously voted" />
          </div>
        )}
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          {poll &&
            poll?.options.map((option, idx) => {
              const optionsVoteCount = option.PollVote.length;
              const votePercentage = totalVotes
                ? Math.floor((optionsVoteCount / totalVotes) * 100)
                : 0;
              return (
                <div
                  className="flex flex-col border-2 border-white p-4 text-white"
                  key={`option_${option.id}`}
                >
                  <div className="flex gap-2 py-2">
                    <input
                      type="radio"
                      id={`option${idx}`}
                      value={option?.id}
                      {...register("optionId")}
                    />
                    <label className="flex break-all" htmlFor={`option${idx}`}>
                      {option?.body}
                    </label>
                  </div>
                  {userVoteRecord && (
                    <p className="bg-gradient-to-b from-purple-700 to-[#15162c] px-4">
                      {votePercentage}% of users voted for this option
                    </p>
                  )}
                </div>
              );
            })}
          <div className="flex items-center justify-center px-8 pt-8 text-white">
            <button
              type="submit"
              className="flex items-center gap-2 rounded-md bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
            >
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
      <div>
        {isSubmitting && (
          <DismissableAlert type="info" message="Submitting Vote" />
        )}
        {isSubmitSuccessful && (
          <DismissableAlert type="success" message="Vote Submitted" />
        )}
      </div>
    </section>
  );
};
