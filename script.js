let cart = [];

function addToCart(product) {
    cart.push(product);
    updateCart();
}

function updateCart() {
    let cartList = document.getElementById("cart");
    cartList.innerHTML = "";
    cart.forEach(item => {
        let li = document.createElement("li");
        li.textContent = item;
        cartList.appendChild(li);
    });
}

async function payWithTon() {
    const tx = {
        amount: "1.0",
        payload: "Оплата в CLOUD SHOP"
    };

    try {
        await tonConnect.sendTransaction(tx);
        alert("Оплата успешно отправлена!");
        cart = [];
        updateCart();
    } catch (error) {
        console.error("Ошибка оплаты:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("payWithTon").addEventListener("click", payWithTon);
});
