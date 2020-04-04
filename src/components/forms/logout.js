import { h, Component } from "preact";
import Button from "./button";

export default class LogoutForm extends Component {
  handleLogout = e => {
    e.preventDefault();
    this.props.onLogout();
  };
  render() {
    const { user, saving } = this.props;

    return (
      <form
        onSubmit={this.handleLogout}
        className={`form ${saving ? "disabled" : ""}`}
      >
        <p className="infoText">
          当前用户 <br />
          <span className="infoTextEmail">
            {user.user_metadata.full_name ||
              user.user_metadata.name ||
              user.email}
          </span>
        </p>
        <Button saving={saving} text="退出登录" saving_text="退出登录中..." />
      </form>
    );
  }
}
