const tonConnect = new TONSDK.TonConnect();
let cart = [];

// Раскрываем Web App в Telegram
window.Telegram.WebApp.expand();

// Функция подключения кошелька TON
async function connectWallet() {
    try {
        const wallet = await tonConnect.connectWallet();
        alert(`Кошелек подключен: ${wallet.address}`);
        document.getElementById("payWithTon").style.display = "block";
    } catch (error) {
        console.error("Ошибка подключения кошелька:", error);
    }
}

// Функция оплаты через TON
async function payWithTon() {
    if (!tonConnect.account) {
        alert("Сначала подключите кошелек!");
        return;
    }

    let total = cart.reduce((sum, item) => sum + item.price, 0);
    let tonAmount = total / 100; // Конвертация рублей в TON (примерно)

    const tx = {
        to: "АДРЕС_ВАШЕГО_КОШЕЛЬКА", // Вставьте адрес TON-кошелька магазина
        amount: tonAmount.toFixed(2),
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

// Функции корзины
function addToCart(name, price) {
    cart.push({ name, price });
    updateCart();
}

function updateCart() {
    let cartList = document.getElementById("cart-items");
    let totalElement = document.getElementById("total");
    cartList.innerHTML = "";

    let total = 0;
    cart.forEach(item => {
        let li = document.createElement("li");
        li.textContent = `${item.name} - ${item.price}₽`;
        cartList.appendChild(li);
        total += item.price;
    });

    totalElement.textContent = `Итого: ${total}₽`;
}

// Переключение страниц
function showPage(page) {
    document.getElementById("menu").style.display = page === "menu" ? "block" : "none";
    document.getElementById("cart").style.display = page === "cart" ? "block" : "none";
}

// Назначаем кнопки
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("connectWallet").addEventListener("click", connectWallet);
    document.getElementById("payWithTon").addEventListener("click", payWithTon);
});
