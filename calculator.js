document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("formCalc");
    const historico = document.getElementById("historicoCalculos");
    const limparBtn = document.getElementById("limpar");

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

        // Gera a data e hora atual
        const agora = new Date();
        const dataHora = agora.toLocaleDateString('pt-BR') + ' - ' + agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

        salvarHistorico(condLida, condDesejada, volume, calcinit, dripsol, dataHora);
        form.reset();
    });

    limparBtn.addEventListener("click", function () {
        form.reset();
    });

    function salvarHistorico(condAtual, condDesejada, volume, calcinit, dripsol, dataHora) {
        const item = document.createElement("li");
        item.classList.add("list-group-item", "text-start");

        item.innerHTML = `
            <strong>Informações fornecidas:</strong><br>
            Condutividade Atual: ${condAtual} mS/cm<br>
            Condutividade Desejada: ${condDesejada} mS/cm<br>
            Volume do Reservatório: ${volume} L<br><br>
            <strong>Resultado do Cálculo:</strong><br>
            Calcinit: ${calcinit.toFixed(2)} g<br>
            Dripsol: ${dripsol.toFixed(2)} g<br><br>
            <small class="text-muted">Registrado em: ${dataHora}</small>
        `;

        historico.appendChild(item);
    }
});
