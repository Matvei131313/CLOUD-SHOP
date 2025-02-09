// Инициализация TON Connect
const tonConnect = new TON_CONNECT({
    manifestUrl: "https://cloud-shop.vercel.app/tonconnect-manifest.json"
});

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

// Функция подключения кошелька
async function connectWallet() {
    try {
        await tonConnect.connect();
        alert("Кошелёк подключён!");
    } catch (error) {
        console.error("Ошибка подключения кошелька:", error);
        alert("Не удалось подключить кошелёк.");
    }
}

// Функция оплаты через TON
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
        alert("Ошибка оплаты.");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("connectWallet").addEventListener("click", connectWallet);
    document.getElementById("payWithTon").addEventListener("click", payWithTon);
});
