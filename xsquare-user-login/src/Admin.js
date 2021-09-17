import React from "react";
import Cookies from "js-cookie";
import api from "./api/api";
import Header from "./Header";

const URL = "ws://jayamvimal.tech:3030";

class Admin extends React.Component {
  ws = new WebSocket(URL);
  constructor(props) {
    super(props);
    this.state = {
      authenticated: Cookies.get("authenticated"),
      admin: false,
      users: [],
    };
    this.getInitialValues();
  }
  componentWillMount() {
    this.ws.onopen = function () {
      console.log("WebSocket Client Connected ");
    };
  }

  getInitialValues = async () => {
    const resp = await api.get("/user/all", {});
    this.setState({
      users: resp.data,
      admin: Cookies.get("role") == "admin" ? true : false,
    });
  };

  invokeUser(userEmail) {
    this.ws.send(userEmail);
  }

  renderUsers() {
    let out = this.state.users.map((user) => {
      return (
        <tr>
          <td>{user._id}</td>
          <td>{user.name}</td>
          <td>{user.role}</td>
          <td>
            <button
              class="ui button"
              onClick={() => this.invokeUser(user.name)}
            >
              Invoke
            </button>
          </td>
        </tr>
      );
    });
    return out;
  }

  render() {
    if (this.state.authenticated && this.state.admin) {
      return (
        <div className="ui segment">
          <Header />
          <table className="ui celled definition table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{this.renderUsers()}</tbody>
          </table>
        </div>
      );
    } else {
      return <img class="ui fluid image" src="404.jpg"></img>;
    }
  }
}

export default Admin;
