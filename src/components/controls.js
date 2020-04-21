import { h, Component } from "preact";
import { connect } from "mobx-preact";

@connect(["store"])
class Controls extends Component {
  handleSignup = e => {
    e.preventDefault();
    this.props.store.openModal("signup");
  };

  handleLogin = e => {
    e.preventDefault();
    this.props.store.openModal("login");
  };

  handleLogout = e => {
    e.preventDefault();
    this.props.store.openModal("user");
  };

  handleButton = e => {
    e.preventDefault();
    this.props.store.openModal(this.props.store.user ? "user" : "login");
  };

  render() {
    const { user } = this.props.store;

    if (this.props.mode === "button") {
      return (
        <a
          className="netlify-identity-button"
          href="#"
          onClick={this.handleButton}
          onTouchStart={this.handleButton}
        >
          {this.props.text || (user ? "退出登录" : "登录/注册")}
        </a>
      );
    }

    if (user) {
      return (
        <ul className="netlify-identity-menu">
          <li className="netlify-identity-item netlify-identity-user-details">
            帐号{" "}
            <span className="netlify-identity-user">
              {user.user_metadata.name || user.email}
            </span>
          </li>
          <li className="netlify-identity-item">
            <a
              className="netlify-identity-logout"
              href="#"
              onClick={this.handleLogout}
              onTouchStart={this.handleLogout}
            >
              退出登录
            </a>
          </li>
        </ul>
      );
    }

    return (
      <ul className="netlify-identity-menu">
        <li className="netlify-identity-item">
          <a
            className="netlify-identity-signup"
            href="#"
            onClick={this.handleSignup}
            onTouchStart={this.handleSignup}
          >
            注册
          </a>
        </li>
        <li className="netlify-identity-item">
          <a
            className="netlify-identity-login"
            href="#"
            onClick={this.handleLogin}
            onTouchStart={this.handleLogin}
          >
            登录
          </a>
        </li>
      </ul>
    );
  }
}

export default Controls;
