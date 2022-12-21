interface Props {
  type: string;
  message: string;
  onClose?: () => void;
}

export const Alert: React.FC<Props> = (props) => {
  const { type, message, onClose } = props;
  return (
    <div className={`alert ${type}`}>
      <div className="inner">
        {onClose && (
          <span className="close" onClick={onClose}>
            &times;
          </span>
        )}
        <p>{message}</p>
      </div>
    </div>
  );
};
