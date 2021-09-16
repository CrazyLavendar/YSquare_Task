import React from "react";
import Cookies from "js-cookie";

class Header extends React.Component {
  onLogout() {
    Cookies.remove("authenticated");
    window.location = "/";
  }
  render() {
    return (
      <div className="ui secondary menu" style={{ backgroundColor: "#004c9a" }}>
        <div className="right menu">
          <div className="right item">
            <button
              className="ui negative button"
              type="submit"
              onClick={this.onLogout}
            >
              <i class="power off icon"></i>
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
