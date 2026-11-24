const minInput = document.getElementById('min');
const maxInput = document.getElementById('max');
const noRepeatCheckbox = document.getElementById('noRepeat');
const btnSortear = document.getElementById('btnSortear');
const btnLimpar = document.getElementById('btnLimpar');
const resultContainer = document.getElementById('resultContainer');
const resultNumber = document.getElementById('resultNumber');
const historySection = document.getElementById('historySection');
const historyList = document.getElementById('historyList');

let drawnNumbers = [];

function sortearNumero() {
    const min = parseInt(minInput.value);
    const max = parseInt(maxInput.value);
    const noRepeat = noRepeatCheckbox.checked;

    if (isNaN(min) || isNaN(max)) {
        alert('Por favor, insira números válidos.');
        return;
    }

    if (min >= max) {
        alert('O valor mínimo deve ser menor que o máximo.');
        return;
    }

    const totalPossible = max - min + 1;

    if (noRepeat && drawnNumbers.length >= totalPossible) {
        alert('Todos os números desse intervalo já foram sorteados! Clique em "Limpar" para reiniciar.');
        return;
    }

    let randomNumber;
    do {
        randomNumber = Math.floor(Math.random() * totalPossible) + min;
    } while (noRepeat && drawnNumbers.includes(randomNumber));

    // Atualiza tela com animação
    resultContainer.classList.remove('hidden');
    resultNumber.textContent = randomNumber;
    resultNumber.classList.remove('animate-pop');
    void resultNumber.offsetWidth; // Reinicia a animação CSS
    resultNumber.classList.add('animate-pop');

    // Salva e exibe no histórico
    drawnNumbers.unshift(randomNumber);
    atualizarHistorico();
}

function atualizarHistorico() {
    if (drawnNumbers.length === 0) {
        historySection.classList.add('hidden');
        return;
    }

    historySection.classList.remove('hidden');
    // Mostra os últimos 10 números sorteados
    historyList.innerHTML = drawnNumbers
        .slice(0, 10)
        .map(num => `<span class="history-badge">${num}</span>`)
        .join('');
}

function limparHistorico() {
    drawnNumbers = [];
    resultContainer.classList.add('hidden');
    atualizarHistorico();
}

btnSortear.addEventListener('click', sortearNumero);
btnLimpar.addEventListener('click', limparHistorico);