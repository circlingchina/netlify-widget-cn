import { h, Component } from "preact";

const messages = {
  confirm: {
    type: "success",
    text:
      "确认邮件已发送到注册邮箱，点击确认就可以完成注册了"
  },
  password_mail: {
    type: "success",
    text:
      "已发送找回密码的邮件到注册邮箱，请前往注册邮箱，点击邮件链接设置新的密码"
  },
  email_changed: {
    type: "sucess",
    text: "你的邮箱地址已经更新"
  },
  verfication_error: {
    type: "error",
    text:
      "没有找到用该邮箱注册的账号"
  },
  signup_disabled: {
    type: "error",
    text:
      "目前新注册功能已关闭，请联系管理人员获得更多信息"
  }
};

export default class Message extends Component {
  render() {
    const { type } = this.props;
    const msg = messages[type];

    return (
      <div className={`flashMessage ${msg.type}`}>
        <span>{msg.text}</span>
      </div>
    );
  }
}
