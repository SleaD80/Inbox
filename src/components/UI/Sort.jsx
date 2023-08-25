import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sort } from "../../actions";

export default function Sort({ backgroundColor }) {
    const dispatch = useDispatch();
    const [dropdown, setDropdown] = useState(false);
    const toggleOpen = () => setDropdown(!dropdown);
    const itemPressed = (fieldName) => {
        setDropdown(false);
        dispatch(sort(fieldName));
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
                    style={backgroundColor && { backgroundColor }}
                >
                    Сортировка по
                </button>
                <ul className={`dropdown-menu ${dropdown ? "show" : ""}`}>
                    <li>
                        <button
                            className="dropdown-item"
                            onClick={() => itemPressed("author")}
                        >
                            Автору
                        </button>
                    </li>
                    <li>
                        <button
                            className="dropdown-item"
                            onClick={() => itemPressed("title")}
                        >
                            Теме
                        </button>
                    </li>
                </ul>
            </div>
        </>
    );
}
