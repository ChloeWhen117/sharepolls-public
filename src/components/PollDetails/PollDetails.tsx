/* eslint-disable */
import React from "react";
import { format } from "date-fns";
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

export const PollDetails: React.FC<{
  poll: PollType;
  isLoading: any;
  refetchPoll: any;
}> = (props) => {
  const { isLoading, poll, refetchPoll } = props;
  const { userId } = useUserId();
  const userVoteRecord = getUserVoteRecord(poll, userId);
  const pollURL = getPollUrl(poll?.id || "");

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
    refetchPoll();
  };
  const copyToClipboard = () => {
    navigator.clipboard.writeText(pollURL);
  };
  const copyURLDisabled = poll?.id === "";
  return (
    <section className="flex w-full flex-col">
      <div
        id="subheader"
        className="flex min-h-fit w-full flex-col justify-center bg-gradient-to-b from-purple-700 to-[#15162c] md:pt-12"
      >
        <div className="flex w-full flex-col justify-center text-center">
          <div className="p-4 text-center text-5xl font-bold text-white">
            <h2>{!isLoading ? poll?.title : "Loading Poll Details"}</h2>
          </div>
          <div className="flex w-full justify-center">
            <div className="flex w-full max-w-2xl flex-col rounded-md border-2 border-white bg-slate-200/10 p-4">
              <p className="flex w-fit break-all rounded-md text-4xl font-bold text-white">
                {!isLoading ? `"${poll?.question}"` : "Loading Poll Details"}
              </p>
              <div className="flex flex-col">
                {userVoteRecord && (
                  <div className="py-4">
                    <DismissableAlert
                      type="info"
                      message="You have previously voted"
                    />
                  </div>
                )}
              </div>
              {isLoading ? (
                <div className="flex w-full max-w-3xl flex-col gap-2 whitespace-nowrap font-bold text-white">
                  Loading Poll Details
                </div>
              ) : (
                <>
                  <p className="max-w-ws mx-auto flex flex text-xl font-bold text-white">
                    Vote for one
                  </p>
                  <form
                    className="flex flex-col"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    {poll &&
                      poll?.options.map((option, idx) => {
                        const optionsVoteCount = option.PollVote.length;
                        const votePercentage = totalVotes
                          ? Math.floor((optionsVoteCount / totalVotes) * 100)
                          : 0;
                        return (
                          <div
                            className="flex flex-col px-4 text-white"
                            key={`option_${option.id}`}
                          >
                            <div className="flex gap-2 py-2">
                              <input
                                type="radio"
                                id={`option${idx}`}
                                value={option?.id}
                                {...register("optionId")}
                              />
                              <label
                                className="flex break-all"
                                htmlFor={`option${idx}`}
                              >
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
                    <div className="flex flex-col items-center justify-center gap-2 px-2 py-4 text-white">
                      <div className="w-full">
                        {isSubmitting && (
                          <DismissableAlert
                            type="info"
                            message="Submitting Vote"
                          />
                        )}
                        {isSubmitSuccessful && (
                          <DismissableAlert
                            type="success"
                            message="Vote Submitted"
                          />
                        )}
                      </div>
                      <button
                        type="submit"
                        className="flex items-center gap-2 rounded-md bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
                      >
                        {submitLabel}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="text ml-2 p-4 text-4xl text-white md:ml-12">
          Overview
        </div>
      </div>
      <div className="flex w-full flex-col items-center gap-4 p-4">
        {isLoading ? (
          <div className="flex w-full max-w-3xl flex-col gap-2 whitespace-nowrap font-bold text-white">
            Loading Poll Details
          </div>
        ) : (
          <>
            <div className="flex w-full max-w-3xl flex-col gap-2 whitespace-nowrap font-bold text-white">
              <div className="flex items-center gap-4">
                <span className="flex">Share URL:</span>
                <button
                  className="flex items-center gap-2 rounded-md bg-white/10 px-10 py-1 font-semibold text-white no-underline transition hover:bg-white/20"
                  onClick={copyToClipboard}
                  disabled={copyURLDisabled}
                >
                  Copy to Clipboard
                </button>
              </div>
              <div className="rounded-s flex w-full overflow-x-auto border-2 border-zinc-800 bg-neutral-900">
                {pollURL}
              </div>
            </div>
            {poll?.createdAt && poll?.voteCounts && (
              <div className="flex w-full max-w-3xl flex-col gap-2 whitespace-nowrap font-bold text-white">
                <div className="text-4xl font-bold">Poll Details</div>
                <div className="border-2 border-white p-4">
                  <div>Date Created: {format(poll?.createdAt, "PP")} </div>
                  <div>Number of Votes: {poll?.voteCounts.length} </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};
