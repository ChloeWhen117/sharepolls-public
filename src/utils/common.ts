export const isProd: boolean = process.env.NODE_ENV === "production";

export const getPollUrl = (pollId: string): string => {
  return isProd
    ? `${process.env.NEXT_PUBLIC_PROD_URL}/poll/${pollId}`
    : `${process.env.NEXT_PUBLIC_LOCAL_URL}/poll/${pollId}`;
};
