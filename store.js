if (document.readyState == 'loading')  {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    let removeCartItemButtons = document.querySelectorAll(".btn-danger");
    removeCartItemButtons.forEach(removeCartItemButton =>  {
        removeCartItemButton.addEventListener('click', removeCartItem)
    })

    let quantityInputs = document.querySelectorAll(".cart-quantity-input")
    quantityInputs.forEach(quantityInput => {
        quantityInput.addEventListener('change', quantityChanged)
    })

    let addToCartButtons = document.querySelectorAll(".shop-item-button")
    addToCartButtons.forEach(addToCartButton => {
        addToCartButton.addEventListener('click', addToCartClicked)
    })

    let purchaseButton = document.querySelector('.btn-purchase')    
    purchaseButton.addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Thank you for your purchase')
    let cartItems = document.querySelector('.cart-items')
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    let button = event.target
    let shopItem = button.parentElement.parentElement
    let title = shopItem.querySelector(".shop-item-title").innerText
    let price = shopItem.querySelector(".shop-item-price").innerText
    let imageSrc = shopItem.querySelector(".shop-item-image").src
    console.log(title, price, imageSrc)
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    let cartItems = document.querySelector('.cart-items')
    let cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')

    let cartItemTitles = document.querySelectorAll('.cart-item-title')
    for (let i = 0; i < cartItemTitles.length; i++) {
        if (cartItemTitles[i].innerText == title) {
            alert("This item is added to the cart!")
            return
        }
    }

    let cartRowContents = `
            <div class="cart-item cart-column">
                <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
                <span class="cart-item-title">${title}</span>
            </div>
            <span class="cart-price cart-column">${price}</span>
            <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" type="number" value="1">
                <button class="btn btn-danger" role="button">REMOVE</button>
            </div>
        `
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.querySelector('.btn-danger').addEventListener('click', removeCartItem)
    cartRow.querySelector('.cart-quantity-input').addEventListener('change', quantityChanged)
    
}

function quantityChanged(event) {
    let input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal()
}


function removeCartItem(event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
};

function updateCartTotal() {
   let cartPriceElement = document.querySelectorAll('.cart-price');
   let quantityElement = document.querySelectorAll('.cart-quantity');

    let total = 0;
   for (let i = 1; i < cartPriceElement.length; i++) {
       let price = parseFloat(cartPriceElement[i].innerText.replace('$', ''));
       let quantity = quantityElement[i].firstElementChild.value;
       total += (price * quantity);
   }

   document.querySelector('.cart-total-price').innerText = '$' + total.toFixed(2);
}

