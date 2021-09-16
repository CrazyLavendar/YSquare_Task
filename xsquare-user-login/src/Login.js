import React from "react";
import Cookies from "js-cookie";
import api from "./api/api";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      password: "",
      validationErr: false,
      errMsg: "",
    };
  }

  renderValidationErr = () => {
    if (this.state.validationErr) {
      return (
        <div class="ui right pointing red basic label">{this.state.errMsg}</div>
      );
    }
  };

  doLogin = (e) => {
    e.preventDefault();
    if (this.state.user === "" || this.state.password === "") {
      this.setState({
        validationErr: true,
        errMsg: "Username or password is empty!",
      });
      return;
    }
    let user = {
      uname: this.state.user,
      pwd: this.state.password,
    };
    api
      .post("/user/authenticate", user)
      .then((response) => {
        Cookies.set("authenticated", true);
        Cookies.set("logged_in_user", this.state.user);
        Cookies.set("role", response.data.admin ? "admin" : "user");
        if (response.data.admin) window.location = "/admin";
        else window.location = "/home";
      })
      .catch((error) => {
        this.setState({
          validationErr: true,
          errMsg: "Wrong username or password!",
        });
      });
  };

  render() {
    return (
      <div className="ui container">
        <div className="ui nine row grid">
          <div className="row"></div>
          <div className="row"></div>
          <div className="row"></div>
          <div className="row"></div>
          <div className="row">
            <div className="ui three column grid">
              <div className="column"></div>
              <div className="column">
                <div className="ui segment">
                  <form className="ui form">
                    <div className="field">
                      <h2>YSquare Login</h2>
                    </div>
                    <div className="field">
                      <label>Enter your Username</label>
                      <input
                        type="text"
                        name="username"
                        value={this.state.user}
                        onChange={(e) =>
                          this.setState({
                            user: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="field">
                      <label>Enter your Password</label>
                      <div className="row">
                        <input
                          type="password"
                          name="password"
                          value={this.state.password}
                          onChange={(e) =>
                            this.setState({
                              password: e.target.value,
                            })
                          }
                        />
                        {this.renderValidationErr()}
                      </div>
                    </div>
                    <br />
                    <button
                      className="ui primary button"
                      type="submit"
                      onClick={this.doLogin}
                    >
                      Login
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="row"></div>
        </div>
      </div>
    );
  }
}

export default Login;
