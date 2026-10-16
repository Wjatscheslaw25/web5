/*jslint browser: true, tolerate this, for */
window.addEventListener("DOMContentLoaded", function () {
    "use strict";

    // Получаем элементы DOM
    var productSelect = document.getElementById("product-select");
    var quantityInput = document.getElementById("quantity-input");
    var calcButton = document.getElementById("calc-button");
    var resultValue = document.getElementById("result-value");
    var errorMessage = document.getElementById("error-message");

    // Функция подсчета стоимости
    function calculateTotal(event) {
        // Предотвращаем отправку формы / перезагрузку страницы, если кнопка внутри формы
        if (event) {
            event.preventDefault();
        }

        var quantityStr = quantityInput.value.trim();
        
        // Регулярное выражение: строго целое положительное число (без букв, знаков и дробей)
        var isPositiveInteger = /^\d+$/.test(quantityStr) && parseInt(quantityStr, 10) > 0;

        if (!isPositiveInteger) {
            // Показываем ошибку
            errorMessage.classList.remove("d-none");
            quantityInput.classList.add("is-invalid");
            resultValue.textContent = "0";
            return false;
        }

        // Если валидация прошла успешно, убираем ошибку
        errorMessage.classList.add("d-none");
        quantityInput.classList.remove("is-invalid");

        var price = parseInt(productSelect.value, 10);
        var quantity = parseInt(quantityStr, 10);
        var total = price * quantity;

        // Выводим результат с разделителями тысяч
        resultValue.textContent = total.toLocaleString("ru-RU");
        return false;
    }

    // Выполняем расчет сразу при загрузке страницы для значения по умолчанию
    calculateTotal();

    // Навешиваем событие клика на кнопку расчета
    if (calcButton) {
        calcButton.addEventListener("click", calculateTotal);
    }
});
