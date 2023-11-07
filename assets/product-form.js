if (!customElements.get('product-form')) {
  customElements.define('product-form', class ProductForm extends HTMLElement {
    constructor() {
      super();

      this.form = this.querySelector('form');
      this.form.querySelector('[name=id]').disabled = false;
      this.form.addEventListener('submit', this.onSubmitHandler.bind(this));
      // this.cartNotification = document.querySelector('cart-notification');
    }

    onSubmitHandler(evt) {
      evt.preventDefault();
      const submitButton = this.querySelector('[type="submit"]');
      const spanElement = submitButton.firstElementChild
      if (submitButton.classList.contains('loading')) return;

      this.handleErrorMessage();
      // this.cartNotification.setActiveElement(document.activeElement);

      submitButton.setAttribute('aria-disabled', true);
      submitButton.classList.add('loading');
      submitButton.classList.add('ueq-product-added');
      spanElement.textContent = "ADDED TO CART \u2713";
      this.querySelector('.loading-overlay__spinner').classList.remove('hidden');

      const config = fetchConfig('javascript');
      config.headers['X-Requested-With'] = 'XMLHttpRequest';
      delete config.headers['Content-Type'];

      const formData = new FormData(this.form);
      // formData.append('sections', this.cartNotification.getSectionsToRender().map((section) => section.id));
      formData.append('sections_url', window.location.pathname);
      config.body = formData;

      fetch(`${routes.cart_add_url}`, config)
        .then((response) => response.json())
        .then((response) => {
          if (response.status) {
            this.handleErrorMessage(response.description);
            return;
          }

          // this.cartNotification.renderContents(response);
        })
        .catch((e) => {
          console.error(e);
        })
        .finally(() => {
          this.handleUpdateCartItemBubble();
          setTimeout(function(){
            submitButton.classList.remove('loading');
            submitButton.classList.remove('ueq-product-added');
            submitButton.removeAttribute('aria-disabled');
            spanElement.textContent = "ADD TO CART";
            this.querySelector('.loading-overlay__spinner').classList.add('hidden');
          }, 1000)
        });
    }

    handleErrorMessage(errorMessage = false) {
      this.errorMessageWrapper = this.errorMessageWrapper || this.querySelector('.product-form__error-message-wrapper');
      this.errorMessage = this.errorMessage || this.errorMessageWrapper.querySelector('.product-form__error-message');

      this.errorMessageWrapper.toggleAttribute('hidden', !errorMessage);

      if (errorMessage) {
        this.errorMessage.textContent = errorMessage;
      }
    }

    handleUpdateCartItemBubble(){
      const config = fetchConfig('javascript');
      config.headers['X-Requested-With'] = 'XMLHttpRequest';
      delete config.headers['Content-Type'];

      const cartWrapper = document.getElementById("ueq-cart-link")


      fetch(window.Shopify.routes.root + 'cart.js', config)
      .then((response) => response.json())
      .then((data) => {
        if(data["item_count"] > 0){
          if(cartWrapper.querySelector("#ueq-cart-count-bubble") === null){
            let newDiv = document.createElement("div");
            newDiv.setAttribute("id", "ueq-cart-count-bubble");
            newDiv.className = "ueq-cart-count-bubble";

            let itemCountSpan = document.createElement("span");
            itemCountSpan.setAttribute("aria-hidden", "true")
            itemCountSpan.textContent = data["item_count"];
            newDiv.appendChild(itemCountSpan);

            cartWrapper.appendChild(newDiv);
          } else {
            cartWrapper.querySelector("#ueq-cart-count-bubble span").textContent = data["item_count"];
          }
        }
      });
    }
  });
}
