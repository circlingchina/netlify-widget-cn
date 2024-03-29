import { h, Component } from "preact";

class Provider extends Component {
  handleLogin = e => {
    e.preventDefault();
    this.props.onLogin(this.props.provider.toLowerCase());
  };

  render() {
    const { provider, label } = this.props;

    return (
      <button
        onClick={this.handleLogin}
        onTouchStart={this.handleLogin}
        className={`provider${provider} btn btnProvider`}
      >
        Continue with {label}
      </button>
    );
  }
}

export default class Providers extends Component {
  getLabel(p) {
    const pId = p.toLowerCase();
    if (pId in this.props.labels) {
      return this.props.labels[pId];
    }
    return p;
  }

  render() {
    const { providers, onLogin } = this.props;

    return (
      <div className="providersGroup">
        <hr className="hr" />
        {providers.map(p => (
          <Provider
            key={p}
            provider={p}
            label={this.getLabel(p)}
            onLogin={onLogin}
          />
        ))}
      </div>
    );
  }
}
