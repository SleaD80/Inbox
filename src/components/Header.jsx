import React, { Component } from "react";
import Sort from "./UI/Sort";

class Header extends Component {
    render() {
        return (
            <>
                <nav
                    className="navbar navbar-light"
                    style={{
                        backgroundColor: "#e3f2fd",
                        paddingLeft: "15px",
                        paddingRight: "15px",
                    }}
                >
                    <span className="navbar-brand mb-0">
                        <h1>Задачи</h1>
                    </span>
                    <Sort sortItemClick={this.props.sortItemClick} />
                </nav>
            </>
        );
    }
}

export default Header;
