import './style.scss';

(() => {

  class Toast {
    constructor(text, modifier, callback) {
      this.text = text || 'Default message';
      this.modifier = modifier;
      this.callback = callback;
      this.toast;
      this.timeout;

      this.renderToast();
    };

    renderToast() {
      this.toast = document.createElement('div');

      this.toast.className = 'toast';
      this.toast.innerHTML = this.text;

      if ( this.modifier ) {
        this.toast.classList.add(`toast--${this.modifier}`);
      };

      document.body.append(this.toast);

      this.toast.addEventListener('mouseenter', () => clearTimeout(this.timeout));
      this.toast.addEventListener('animationend', () => this.startTimeout());
      this.toast.addEventListener('mouseleave', () => this.startTimeout());
    };

    startTimeout() {
      this.timeout = setTimeout(() => {
        this.toast.classList.add('animation-remove');
        this.toast.addEventListener('animationend', () => this.removeToast());
      }, 1500);
    };

    removeToast() {
      this.toast.remove();

      if ( typeof this.callback === 'function' ) {
        this.callback();
      }
    };
  };

  const messageToastButtons = document.querySelectorAll('[data-toast="message"]');
  const alertToastButtons = document.querySelectorAll('[data-toast="danger"]');

  let alreadyToast = false;

  messageToastButtons.forEach((btn) => btn.addEventListener('click', () => {
    if ( alreadyToast ) return;
    new Toast(null, null, () => alreadyToast = false);
    alreadyToast = true;
  }));

  alertToastButtons.forEach((btn) => btn.addEventListener('click', () => {
    if ( alreadyToast ) return;
    new Toast(null, 'danger', () => alreadyToast = false);
    alreadyToast = true;
  }));


})();
