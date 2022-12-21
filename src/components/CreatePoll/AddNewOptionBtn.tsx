interface AddNewOptionBtnProps {
  optionsLength: number;
  maxOptionsLength: number;
  onClick: () => void;
  disabled: boolean;
}

export const AddNewOptionBtn: React.FC<AddNewOptionBtnProps> = (props) => {
  const { optionsLength, maxOptionsLength, onClick, disabled } = props;
  if (optionsLength !== maxOptionsLength)
    return (
      <button
        type="button"
        className="rounded-full rounded-md border-2 border-zinc-800 bg-neutral-900 px-4 py-2 font-semibold text-white text-white no-underline transition hover:bg-neutral-700"
        onClick={onClick}
        disabled={disabled}
      >
        + Add New Option
      </button>
    );
  return <></>;
};
