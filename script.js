// Подключаем SDK TON Connect
import { TonConnect } from "@tonconnect/sdk";

// Инициализируем TON Connect
const tonConnect = new TonConnect({
    manifestUrl: "https://cloud-shop.vercel.app/tonconnect-manifest.json"
});

let cart = [];

// Функция подключения кошелька
async function connectWallet() {
    try {
        const wallets = await tonConnect.getWallets();
        if (wallets.length === 0) {
            alert("Нет доступных кошельков для подключения!");
            return;
        }

        await tonConnect.connect(wallets[0]); // Подключаем первый доступный кошелёк
        alert("Кошелёк подключён!");
    } catch (error) {
        console.error("Ошибка подключения кошелька:", error);
        alert("Не удалось подключить кошелёк.");
    }
}

// Функция оплаты через TON
async function payWithTon() {
    if (!tonConnect.account) {
        alert("Сначала подключите кошелёк!");
        return;
    }

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

// Обновление корзины
function updateCart() {
    let cartList = document.getElementById("cart");
    cartList.innerHTML = "";
    cart.forEach(item => {
        let li = document.createElement("li");
        li.textContent = item;
        cartList.appendChild(li);
    });
}

// Добавление товара в корзину
function addToCart(product) {
    cart.push(product);
    updateCart();
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("connectWallet").addEventListener("click", connectWallet);
    document.getElementById("payWithTon").addEventListener("click", payWithTon);
});
