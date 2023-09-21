export default function Dropdown({ label, options, ...props }) {
  return (
    <div {...props}>
      <button
        className="nav-link dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {label}
      </button>
      <div className={'dropdown-menu'} style={props.style}>
        {options?.map((option) => {
          return (
            <button
              key={option.id}
              value={option.id}
              className="dropdown-item"
              onClick={option.handleClick}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
