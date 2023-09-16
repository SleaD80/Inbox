export default function Sort({ label, options, ...props }) {
  return (
    <div className="nav-item" {...props}>
      <button
        className="nav-link dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {label}
      </button>
      <div className={'dropdown-menu'}>
        {options?.map((option) => {
          return (
            <button
              key={option.id}
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