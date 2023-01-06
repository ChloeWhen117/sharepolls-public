import { type FormSchemaType } from "./CreatePoll";
import { type UseFieldArrayAppend } from "react-hook-form";

interface AddNewOptionBtnProps {
  optionsLength: number;
  maxOptionsLength: number;
  append: UseFieldArrayAppend<FormSchemaType>;
  disabled: boolean;
}

export const AddNewOptionBtn: React.FC<AddNewOptionBtnProps> = (props) => {
  const { optionsLength, maxOptionsLength, append, disabled } = props;

  const handleAddNewOption = () => {
    append({ body: "" });
  };

  if (optionsLength !== maxOptionsLength)
    return (
      <button
        type="button"
        className="my-4 rounded-full rounded-md border-2 border-zinc-800 bg-neutral-900 py-2 font-semibold text-white text-white no-underline transition hover:bg-neutral-700"
        onClick={handleAddNewOption}
        disabled={disabled}
      >
        + Add New Option
      </button>
    );
  return <></>;
};
