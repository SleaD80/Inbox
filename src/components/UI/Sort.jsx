import React, { useState } from "react";

export default function Sort(props) {
    const [dropdown, setDropdown] = useState(false);
    const toggleOpen = () => setDropdown(!dropdown);
    const itemPressed = (itemId) => {
        setDropdown(false);
        props.sortItemClick(itemId);
    };
    return (
        <>
            <div className="dropdown">
                <button
                    onClick={toggleOpen}
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    Сортировка по
                </button>
                <ul className={`dropdown-menu ${dropdown ? "show" : ""}`}>
                    <li>
                        <a
                            className="dropdown-item"
                            onClick={() => itemPressed("author")}
                        >
                            Автору
                        </a>
                    </li>
                    <li>
                        <a
                            className="dropdown-item"
                            onClick={() => itemPressed("title")}
                        >
                            Теме
                        </a>
                    </li>
                </ul>
            </div>
        </>
    );
}
