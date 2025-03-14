const numbers = document.getElementById("numbers");
const from = document.getElementById("from");
const to = document.getElementById("to");
const repeat = document.getElementById("repeat");

const sortContainer = document.getElementsByClassName("sort-container")[0];
const resultContainer = document.getElementsByClassName("result-container")[0];
const sortedNumbersContainer = document.getElementById("result");
const redoButton = document.getElementById("redo");

document.addEventListener("input", (e) => {
  if (e.target.classList.contains("number-only")) {
    return (e.target.value = e.target.value.replace(/\D/g, ""));
  }
});

document.getElementById("generate").addEventListener("click", async (e) => {
  e.preventDefault();

  const numberQtd = parseInt(numbers.value);
  const firstValue = parseInt(from.value);
  const lastValue = parseInt(to.value);
  const noRepeatedValue = repeat.checked;

  if (isNaN(numberQtd) || isNaN(firstValue) || isNaN(lastValue)) {
    alert("Por favor, preencha todos os campos com valores válidos.");
    return;
  }

  if (firstValue > lastValue) {
    alert("O valor inicial deve ser menor que o valor final.");
    return;
  }

  sortContainer.style.display = "none";
  resultContainer.style.display = "flex";

  await showSortedNumbers(firstValue, lastValue, numberQtd, noRepeatedValue);
  redoButton.classList.add("active");

  numbers.value = "";
  from.value = "";
  to.value = "";
  repeat.checked = false;
});

document.getElementById("redo").addEventListener("click", (e) => {
  e.preventDefault();
  sortContainer.style.display = "flex";
  resultContainer.style.display = "none";

  sortedNumbersContainer.innerHTML = "";
  redoButton.classList.remove("active");
});

function showSortedNumbers(firstValue, lastValue, numberQtd, noRepeatedValue) {
  let sortedNumbers = [];

  for (let i = 0; i < numberQtd; i++) {
    let randomNumber =
      Math.floor(Math.random() * (lastValue - firstValue + 1)) + firstValue;
    if (noRepeatedValue) {
      while (sortedNumbers.includes(randomNumber)) {
        randomNumber =
          Math.floor(Math.random() * (lastValue - firstValue + 1)) + firstValue;
      }
    }
    sortedNumbers.push(randomNumber);
  }

  sortedNumbersContainer.innerHTML = "";

  return new Promise((resolve) => {
    sortedNumbers.forEach((number, i) => {
      setTimeout(() => {
        const numberElement = document.createElement("div");
        numberElement.textContent = number;
        sortedNumbersContainer.appendChild(numberElement);

        if (i === sortedNumbers.length - 1) {
          setTimeout(resolve, 3600);
        }
      }, i * 3600);
    });
  });
}
