document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("formCalc");
    const historico = document.getElementById("historicoCalculos");
    const limparBtn = document.getElementById("limpar");

    // Carrega histórico salvo no localStorage
    carregarHistoricoSalvo();

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let condDesejada = Number(document.getElementById("condDesejada").value);
        let condLida = Number(document.getElementById("condLida").value);
        let volume = Number(document.getElementById("volume").value);

        if (isNaN(condDesejada) || isNaN(condLida) || isNaN(volume)) {
            alert("Preencha todos os campos corretamente.");
            return;
        }

        let calcinit = ((condDesejada - condLida) / 1.24 * volume) * 0.54;
        let dripsol = ((condDesejada - condLida) / 1.24 * volume) * 0.46;

        const agora = new Date();
        const dataHora = agora.toLocaleDateString('pt-BR') + ' - ' + agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

        const resultado = {
            condAtual: condLida,
            condDesejada: condDesejada,
            volume: volume,
            calcinit: calcinit.toFixed(2),
            dripsol: dripsol.toFixed(2),
            dataHora: dataHora
        };

        adicionarAoHistorico(resultado);
        salvarNoLocalStorage(resultado);
        form.reset();
    });

    limparBtn.addEventListener("click", function () {
        form.reset();
    });

    function adicionarAoHistorico(itemData) {
        const item = document.createElement("li");
        item.classList.add("list-group-item", "text-start");

        item.innerHTML = `
            <strong>Informações fornecidas:</strong><br>
            Condutividade Atual: ${itemData.condAtual} mS/cm<br>
            Condutividade Desejada: ${itemData.condDesejada} mS/cm<br>
            Volume do Reservatório: ${itemData.volume} L<br><br>
            <strong>Resultado do Cálculo:</strong><br>
            Calcinit: ${itemData.calcinit} g<br>
            Dripsol: ${itemData.dripsol} g<br><br>
            <small class="text-muted">Registrado em: ${itemData.dataHora}</small>
        `;

        historico.appendChild(item);
    }

    function salvarNoLocalStorage(dado) {
        let calculosSalvos = JSON.parse(localStorage.getItem("historicoCalculos")) || [];
        calculosSalvos.push(dado);
        localStorage.setItem("historicoCalculos", JSON.stringify(calculosSalvos));
    }

    function carregarHistoricoSalvo() {
        let calculosSalvos = JSON.parse(localStorage.getItem("historicoCalculos")) || [];
        calculosSalvos.forEach(adicionarAoHistorico);
    }
});
