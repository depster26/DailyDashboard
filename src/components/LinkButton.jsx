const LinkButton = ({ onClickAction, iconVariant, displayText = null }) => {
  return (
    <button className="btn btn-link" onClick={onClickAction}>
      <i className={iconVariant}></i> {displayText || ""}
    </button>
  );
};

export default LinkButton;
