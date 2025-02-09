from aiogram import Bot, Dispatcher, types, Router
from aiogram.filters import Command
from aiogram.types import ReplyKeyboardMarkup, KeyboardButton, WebAppInfo
import asyncio

TOKEN = "7739075750:AAEArihOeMHWBigZX2KYCCKfLXcgHLGCfdU"  # Замени на свой токен из BotFather

bot = Bot(token=TOKEN)
dp = Dispatcher()
router = Router()  # Создаём роутер

# Создаём клавиатуру с WebApp-кнопкой
main_keyboard = ReplyKeyboardMarkup(
    keyboard=[
        [KeyboardButton(text="🛒 Открыть CLOUD SHOP", web_app=WebAppInfo(url="https://cloud-shop.vercel.app"))]
    ],
    resize_keyboard=True
)

# Обработчик команды /start
@router.message(Command("start"))
async def start(message: types.Message):
    await message.answer("Привет! Добро пожаловать в CLOUD SHOP!", reply_markup=main_keyboard)

async def main():
    dp.include_router(router)  # Подключаем роутер
    await bot.delete_webhook(drop_pending_updates=True)
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
