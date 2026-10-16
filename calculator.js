/*jslint browser: true, tolerate this, for */
window.addEventListener("DOMContentLoaded", function () {
    "use strict";

    var productSelect = document.getElementById("product-select");
    var quantityInput = document.getElementById("quantity-input");
    var calcButton = document.getElementById("calc-button");
    var resultValue = document.getElementById("result-value");
    var errorMessage = document.getElementById("error-message");

    // Функция подсчета стоимости
    function calculateTotal(event) {
        if (event) {
            event.preventDefault();
        }

        var quantityStr = quantityInput.value.trim();
        
        // Регулярное выражение: строго целое положительное число
        var isPositiveInteger = /^\d+$/.test(quantityStr) && parseInt(quantityStr, 10) > 0;

        if (!isPositiveInteger) {
            errorMessage.classList.remove("d-none");
            quantityInput.classList.add("is-invalid");
            resultValue.textContent = "0";
            return false;
        }

        errorMessage.classList.add("d-none");
        quantityInput.classList.remove("is-invalid");

        var price = parseInt(productSelect.value, 10);
        var quantity = parseInt(quantityStr, 10);
        var total = price * quantity;

        resultValue.textContent = total.toLocaleString("ru-RU");
        return false;
    }

    // Первичный расчет при загрузке страницы
    calculateTotal();

    // Пересчет по клику на кнопку
    if (calcButton) {
        calcButton.addEventListener("click", calculateTotal);
    }

    // Пересчет только по нажатию Enter в поле ввода (без мгновенного реагирования на каждый символ)
    if (quantityInput) {
        quantityInput.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                calculateTotal(event);
            }
        });
    }
});
