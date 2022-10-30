"use strict";

const basketCounter = document.querySelector('.cartIconWrap span');
const basketTotalValue = document.querySelector('.basketTotalValue');
const basketTotal = document.querySelector('.basketTotal');
const basketEl = document.querySelector('.basket');
const basket = {};

document.querySelector('.cartIconWrap').addEventListener('click', () => {
    basketEl.classList.toggle('hidden');
});

document.querySelector('.featuredItems').addEventListener('click', event => {
    if(!event.target.closest('.addToCart')) {
        return;
    }
    const featuredItem = event.target.closest('.featuredItem')
    const id = +featuredItem.dataset.id;
    const name = featuredItem.dataset.name;
    const price = +featuredItem.dataset.price;
    addToCart(id, name, price)
});

function addToCart(id, name, price) {
    if (!(id in basket)){
        basket[id] = { id:id, name:name, price: price, count: 0 };
    }
    basket[id].count++;
    basketCounter.textContent = String(getTotalBasketCount());
    basketTotalValue.textContent = getTotalBasketPrice().toFixed(2);
    console.log(id)
    renderProductBasket(id);
}

function getTotalBasketCount () {
    return Object.values(basket).reduce((acc, product) => acc + product.count, 0)
}

function getTotalBasketPrice () {
    return Object.values(basket).
    reduce((acc, product) => acc + product.count * product.price, 0)
}

function renderProductBasket (id) {
    const basketRowEl = basketEl.
    querySelector(`.basketRow[data-productId="${id}"]`);
    console.log(basketRowEl)
    if (!basketRowEl){
        renderNewProductInBasket(id);
        return;
    }
    basketRowEl.querySelector(' .productCount').
        textContent = basket[id].count;
    basketRowEl.querySelector(' .productTotalRow').
        textContent = basket[id].count * basket[id].price;
}

function renderNewProductInBasket (productId) {
    const productRow = `
    <div class="basketRow" data-productId="${productId}">
        <div>${basket[productId].name}</div>
        <div>
            <span class="productCount">${basket[productId].count}</span> шт.
        </div>
        <div>${basket[productId].price}</div>
        <div>
        $<span class="productTotalRow">${basket[productId].price * basket[productId].count}</span>
        </div>
    </div>`;
    basketTotal.insertAdjacentHTML('beforebegin', productRow)
}