import React from "react";
import Cookies from "js-cookie";
import Header from "./Header";

const URL = "ws://localhost:3030";

class Home extends React.Component {
  ws = new WebSocket(URL);
  reader = new FileReader();
  constructor(props) {
    super(props);
    this.state = {
      authenticated: Cookies.get("authenticated"),
      logged_in_user: Cookies.get("logged_in_user"),
      invoked: false,
    };
  }
  componentWillMount() {
    this.ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log("connected");
    };

    this.ws.onmessage = (evt) => {
      // on receiving a message, add it to the list of messages
      let socketMsg = null;
      if (evt.data instanceof Blob) {
        this.reader.onload = () => {
          //console.log("Result: " + this.reader.result);
          let msg = this.reader.result;
          if (this.state.logged_in_user == this.reader.result) {
            console.log("Setting state");
            this.setState({
              invoked: true,
            });
          }
        };
        this.reader.readAsText(evt.data);
      }
    };

    this.ws.onclose = () => {
      console.log("disconnected");
      // automatically try to reconnect on connection loss
      this.setState({
        ws: new WebSocket(URL),
      });
    };
  }

  renderNotification() {
    return (
      <div class="ui success message">
        <i class="close icon"></i>
        <div class="header">You are being invoked by Admin</div>
      </div>
    );
  }

  render() {
    if (this.state.authenticated) {
      return (
        <div className="ui segment">
          <Header />
          <h2>Welcome User!</h2>
          {this.state.invoked ? this.renderNotification() : null}
        </div>
      );
    } else {
      return <img class="ui fluid image" src="404.jpg"></img>;
    }
  }
}

export default Home;
