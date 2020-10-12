import { h, Component } from "preact";
import translate from "./translate";

function formatError(error) {
  const errStr =  (
    (error.json && error.json.error_description) ||
    error.message ||
    error.toString()
  );
  return translate(errStr);
}

export default class Modal extends Component {
  handleClose = e => {
    e.preventDefault();
    this.props.onClose();
  };

  blockEvent = e => {
    e.stopPropagation();
  };

  linkHandler = page => e => {
    e.preventDefault();
    this.props.onPage(page);
  };

  render() {
    let {
      page,
      error,
      loading,
      showHeader,
      showSignup,
      devSettings,
      isOpen,
      children
    } = this.props;
    const hidden = !isOpen;
    loading = false;

    return (
      <div
        className="modalContainer"
        role="dialog"
        aria-hidden={`${hidden}`}
        onClick={this.handleClose}
        onTouchStart={this.handleClose}
      >
        <div
          className={`modalDialog${loading ? " visuallyHidden" : ""}`}
          onClick={this.blockEvent}
          onTouchStart={this.blockEvent}
        >
          <div className="modalContent">
            <button onclick={this.handleClose} onTouchStart={this.handleClose}  className="btn btnClose">
              <span className="visuallyHidden">Close</span>
            </button>
            {showHeader && (
              <div className="header">
                {showSignup && (
                  <button
                    className={`btn btnHeader ${page.signup ? "active" : ""}`}
                    onclick={this.linkHandler("signup")}
                    onTouchStart={this.linkHandler("signup")}
                  >
                    注册
                  </button>
                )}
                {!devSettings && (
                  <button
                    className={`btn btnHeader ${page.login ? "active" : ""}`}
                    onclick={this.linkHandler("login")}
                    onTouchStart={this.linkHandler("login")}
                  >
                    登录
                  </button>
                )}
              </div>
            )}
            {page.title && (
              <div className="header">
                <button className="btn btnHeader active">{page.title}</button>
              </div>
            )}
            {devSettings && (
              <div className="header">
                <button className="btn btnHeader active">
                  Development Settings
                </button>
              </div>
            )}
            {error && (
              <div className="flashMessage error">
                <span>{formatError(error)}</span>
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    );
  }
}
