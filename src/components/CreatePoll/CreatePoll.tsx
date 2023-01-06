import React, { useState, useEffect } from "react";
import { z } from "zod";
import { useForm, useFieldArray, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/utils/trpc";
import { useUserId } from "@/hooks/useUserId";
import { useRouter } from "next/router";
import { AddNewOptionBtn } from "./AddNewOptionBtn";
export const FormSchema = z.object({
  title: z.string(),
  question: z.string(),
  options: z.array(
    z.object({
      body: z.string(),
    })
  ),
});

export type FormSchemaType = z.infer<typeof FormSchema>;

export const CreatePoll = () => {
  const router = useRouter();
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormSchemaType>({
    defaultValues: {
      options: [{ body: "Option 1" }],
    },
    resolver: zodResolver(FormSchema),
  });
  const { fields, append, remove } = useFieldArray({
    name: "options",
    control,
  });
  const { userId } = useUserId();
  const maxOptionsLength = 6;
  const optionsLength = fields.length;
  const createPoll = trpc.poll.createPoll.useMutation();

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    if (optionsLength > 1 && userId !== "") {
      const { question, title, options } = data;
      createPoll.mutate({
        authorId: userId,
        question,
        title,
        options,
      });
      router.push("/");
    }
  };
  useEffect(() => {
    reset({
      title: "Title",
      question: "Question",
      options: [{ body: "Option 1" }],
    });
  }, [reset, isSubmitSuccessful]);

  const addNewOptionBtnProps = {
    optionsLength,
    maxOptionsLength,
    append,
    disabled: isSubmitting,
  };

  return (
    <div className="items-left flex max-w-2xl ">
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex p-4 font-bold text-white">Register a poll.</div>
        <div className="text-white">Title</div>
        <input
          {...register("title", {
            value: "Title",
            required: true,
            minLength: 3,
            maxLength: 100,
          })}
          className="rounded-md border-2 border-zinc-800 bg-neutral-900 px-4 py-2 text-white hover:bg-neutral-700"
          disabled={isSubmitting}
        />
        {errors.title && <p>{errors.title.message}</p>}
        <div className="text-white">Question</div>
        <input
          {...register("question", {
            value: "Question",
            required: true,
            minLength: 3,
            maxLength: 280,
          })}
          className="rounded-md border-2 border-zinc-800 bg-neutral-900 px-4 py-2 text-white hover:bg-neutral-700"
          disabled={isSubmitting}
        />
        {errors.question && <p>{errors.question.message}</p>}
        <div className="flex p-4 font-bold text-white">
          Create Poll Options with at least two options and also up to maximum
          of 6 options.
        </div>
        {fields.map((field, idx) => {
          return (
            <div key={field.id} className="flex flex-col gap-2">
              <div className="text-white">Option #{idx + 1}</div>
              <div className="flex gap-4">
                <input
                  className="grow rounded-md border-2 border-zinc-800 bg-neutral-900 px-4 py-2 text-white hover:bg-neutral-700"
                  {...register(`options.${idx}.body`, {
                    required: true,
                    value: `Option ${idx + 1}`,
                    minLength: 3,
                    maxLength: 160,
                  })}
                  disabled={isSubmitting}
                />
                {idx >= 1 && (
                  <button
                    className="rounded-md bg-red-800 px-4 py-2 text-white hover:bg-neutral-700"
                    type="button"
                    onClick={() => remove(idx)}
                  >
                    DELETE
                  </button>
                )}
              </div>
            </div>
          );
        })}
        <AddNewOptionBtn {...addNewOptionBtnProps} />
        <div className="flex items-center justify-center p-4 text-white">
          <button
            type="submit"
            className="rounded-full bg-white/10 px-10 py-4 font-semibold text-white no-underline transition hover:bg-white/20"
            disabled={isSubmitting}
          >
            Create a Poll
          </button>
        </div>
      </form>
    </div>
  );
};
