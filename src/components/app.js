import { h, Component } from "preact";
import { connect } from "mobx-preact";
import Modal from "./modal";
import SiteURLForm from "./forms/siteurl";
import LogoutForm from "./forms/logout";
import UserForm from "./forms/user";
import Providers from "./forms/providers";
import Message from "./forms/message";

const pagesWithHeader = { login: true, signup: true };
const pages = {
  login: {
    login: true,
    button: "登录",
    button_saving: "登录中...",
    email: true,
    password: true,
    link: "amnesia",
    link_text: "忘记密码?",
    providers: true
  },
  signup: {
    signup: true,
    button: "注册",
    button_saving: "注册中...",
    name: true,
    email: true,
    password: true,
    providers: true
  },
  amnesia: {
    title: "找回密码",
    button: "发送邮件",
    button_saving: "发送邮件",
    email: true,
    link: "login",
    link_text: "返回"
  },
  recovery: {
    title: "找回密码",
    button: "更新密码",
    button_saving: "密码更新中...",
    password: true,
    link: "login",
    link_text: "取消"
  },
  invite: {
    title: "Complete your signup",
    button: "Sign up",
    button_saving: "Signing Up",
    password: true,
    providers: true
  },
  user: {
    title: "已登录"
  }
};

@connect(["store"])
class App extends Component {
  handleClose = () => this.props.store.closeModal();
  handlePage = page => this.props.store.openModal(page);
  handleLogout = () => this.props.store.logout();
  handleSiteURL = url => this.props.store.setSiteURL(url);
  clearSiteURL = url => this.props.store.clearSiteURL();
  handleExternalLogin = provider => this.props.store.externalLogin(provider);
  handleUser = ({ name, email, password }) => {
    const { store } = this.props;

    switch (store.modal.page) {
      case "login":
        store.login(email, password);
        break;
      case "signup":
        store.signup(name, email, password);
        break;
      case "amnesia":
        store.requestPasswordRecovery(email);
        break;
      case "invite":
        store.acceptInvite(password);
        break;
      case "recovery":
        store.updatePassword(password);
        break;
    }
  };

  renderBody() {
    const { store } = this.props;
    const page = pages[store.modal.page] || {};
    const pageLinkHandler = () => this.handlePage(page.link);

    if (store.isLocal && store.siteURL === null) {
      return (
        <SiteURLForm
          devMode={store.siteURL != null}
          onSiteURL={store.siteURL ? this.clearSiteURL : this.handleSiteURL}
        />
      );
    }
    if (!store.settings) {
      return;
    }
    if (store.user) {
      return (
        <LogoutForm
          user={store.user}
          saving={store.saving}
          onLogout={this.handleLogout}
        />
      );
    }
    if (store.modal.page === "signup" && store.settings.disable_signup) {
      return <Message type="signup_disabled" />;
    }

    return (
      <div>
        <UserForm
          page={pages[store.modal.page] || {}}
          message={store.message}
          saving={store.saving}
          onSubmit={this.handleUser}
          namePlaceholder={store.namePlaceholder}
        />
        {!store.user && page.link && store.gotrue && (
          <button
            onclick={pageLinkHandler}
            onTouchStart={pageLinkHandler}
            className="btnLink forgotPasswordLink"
          >
            {page.link_text}
          </button>
        )}
        {store.isLocal ? (
          <SiteURLForm
            devMode={store.siteURL != null}
            onSiteURL={store.siteURL ? this.clearSiteURL : this.handleSiteURL}
          />
        ) : (
          <div />
        )}
      </div>
    );
  }

  renderProviders() {
    return null;
    const { store } = this.props;

    if (!(store.gotrue && store.settings)) {
      return null;
    }
    if (store.modal.page === "signup" && store.settings.disable_signup) {
      return null;
    }
    const page = pages[store.modal.page] || {};

    if (!page.providers) {
      return null;
    }

    const providers = [
      "Google",
      "GitHub",
      "GitLab",
      "BitBucket",
      "SAML"
    ].filter(p => store.settings.external[p.toLowerCase()]);

    return null;
  }

  render() {
    const { store } = this.props;
    const showHeader = pagesWithHeader[store.modal.page];
    const showSignup = store.settings && !store.settings.disable_signup;
    const page = pages[store.modal.page] || {};

    console.log(store.error);
    console.log(store.gotrue);

    return (
      <div>
        <Modal
          page={page}
          error={store.error}
          showHeader={showHeader}
          showSignup={showSignup}
          devSettings={!store.gotrue}
          loading={!store.error && store.gotrue}
          // loading={!store.error && store.gotrue && !store.settings}
          isOpen={store.modal.isOpen}
          onPage={this.handlePage}
          onClose={this.handleClose}
          logo={store.modal.logo}
        >
          {this.renderBody()}
          {this.renderProviders()}
        </Modal>
      </div>
    );
  }
}

export default App;
