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

    // Первичный расчет при загрузке
    calculateTotal();

    // Пересчет при клике на кнопку
    if (calcButton) {
        calcButton.addEventListener("click", calculateTotal);
    }

    // Пересчет прямо во время ввода текста в поле
    if (quantityInput) {
        quantityInput.addEventListener("input", calculateTotal);
        
        // Предотвращаем перезагрузку страницы при нажатии Enter в поле ввода
        quantityInput.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                calculateTotal(event);
            }
        });
    }

    // Пересчет при смене товара в выпадающем списке
    if (productSelect) {
        productSelect.addEventListener("change", calculateTotal);
    }
});
