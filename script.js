/**
 * Variável global para armazenar as habilidades selecionadas.
 */
let habilidadesSelecionadas = [];

/**
 * Adiciona a habilidade selecionada do <select> à lista.
 */
function adicionarHabilidade() {
    const select = document.getElementById('selectHabilidade');
    const habilidade = select.value;
    const listaDiv = document.getElementById('habilidadesLista');

    // 1. Verifica se uma habilidade foi realmente selecionada
    if (habilidade === "") {
        exibirFeedback("⚠️ Por favor, selecione uma habilidade antes de adicionar.", 'info');
        return;
    }

    // 2. Verifica se a habilidade já está na lista
    if (habilidadesSelecionadas.includes(habilidade)) {
        exibirFeedback(`ℹ️ A habilidade "**${habilidade}**" já foi adicionada.`, 'info');
        // Limpa o select
        select.value = "";
        return;
    }

    // 3. Adiciona a habilidade ao array e cria o elemento na lista
    habilidadesSelecionadas.push(habilidade);
    
    const chip = document.createElement('span');
    chip.textContent = habilidade;
    chip.style.cssText = `
        display: inline-block;
        background-color: #007bff;
        color: white;
        padding: 4px 10px;
        margin: 4px;
        border-radius: 15px;
        font-size: 0.9em;
        cursor: pointer;
    `;
    // Adiciona um listener para remover a habilidade ao clicar
    chip.onclick = () => removerHabilidade(habilidade, chip);
    
    listaDiv.appendChild(chip);

    exibirFeedback(`✅ Habilidade "**${habilidade}**" adicionada com sucesso! Clique para remover.`, 'success');

    // Limpa o select
    select.value = "";
}

/**
 * Remove uma habilidade da lista e do array.
 * @param {string} habilidade - O nome da habilidade a ser removida.
 * @param {HTMLElement} elemento - O elemento <span> da habilidade na DOM.
 */
function removerHabilidade(habilidade, elemento) {
    // Remove do array
    habilidadesSelecionadas = habilidadesSelecionadas.filter(h => h !== habilidade);
    // Remove da DOM
    elemento.remove();
    exibirFeedback(`🗑️ Habilidade "**${habilidade}**" removida.`, 'info');
}

/**
 * Valida o formulário antes do "envio" e exibe o feedback final.
 */
function validarFormulario() {
    const nome = document.getElementById('nome').value.trim();
    const cpf = document.getElementById('cpf').value.trim();
    const email = document.getElementById('email').value.trim();
    const interesse = document.getElementById('interesse').value;

    let erros = [];

    // Validação do Nome
    if (nome.length < 3) {
        erros.push("O **Nome Completo** deve ter pelo menos 3 caracteres.");
    }

    // Validação do CPF (apenas verifica se tem 11 dígitos ou o formato 000.000.000-00, sem cálculo de dígito)
    const cpfLimpo = cpf.replace(/[.\-]/g, '');
    if (cpfLimpo.length !== 11 || isNaN(cpfLimpo)) {
        erros.push("O **CPF** deve conter 11 dígitos numéricos.");
    }

    // Validação do E-mail (validação simples)
    if (!email.includes('@') || !email.includes('.')) {
        erros.push("O **E-mail** parece inválido (precisa de '@' e '.').");
    }

    // Validação do Interesse Principal
    if (interesse === "") {
        erros.push("Selecione um **Interesse Principal**.");
    }

    // Validação das Habilidades
    if (habilidadesSelecionadas.length === 0) {
        erros.push("Adicione pelo menos **uma habilidade**.");
    }

    // Processamento do Feedback
    if (erros.length > 0) {
        // Exibe os erros
        const mensagemErro = "❌ O formulário contém os seguintes erros:<br><ul><li>" + erros.join("</li><li>") + "</li></ul>";
        exibirFeedback(mensagemErro, 'error');
    } else {
        // Exibe a mensagem de sucesso com os dados coletados
        const mensagemSucesso = `
            🎉 **Inscrição Concluída com Sucesso!** 🎉
            <br>A SkillBridge irá gerar sua trilha de aprendizado personalizada.
            <br><br>
            **Resumo da Inscrição:**
            <ul>
                <li>**Nome:** ${nome}</li>
                <li>**E-mail:** ${email}</li>
                <li>**Interesse:** ${interesse}</li>
                <li>**Habilidades Registradas:** ${habilidadesSelecionadas.join(', ')} (${habilidadesSelecionadas.length})</li>
            </ul>
            <p style="font-style: italic; margin-top: 10px;">Obrigado por se juntar à SkillBridge!</p>
        `;
        exibirFeedback(mensagemSucesso, 'success');
    }
}

/**
 * Função utilitária para exibir a mensagem de feedback.
 * @param {string} mensagem - O conteúdo HTML da mensagem.
 * @param {string} tipo - O tipo de mensagem ('success', 'error', 'info').
 */
function exibirFeedback(mensagem, tipo) {
    const feedbackDiv = document.getElementById('feedback');
    feedbackDiv.innerHTML = mensagem;

    let bgColor, borderColor;
    
    // Define cores com base no tipo
    if (tipo === 'success') {
        bgColor = '#d4edda'; // Verde claro
        borderColor = '#c3e6cb'; // Verde
    } else if (tipo === 'error') {
        bgColor = '#f8d7da'; // Vermelho claro
        borderColor = '#f5c6cb'; // Vermelho
    } else { // info ou padrão
        bgColor = '#fff3cd'; // Amarelo claro
        borderColor = '#ffcc00'; // Amarelo
    }

    // Aplica os estilos
    feedbackDiv.style.backgroundColor = bgColor;
    feedbackDiv.style.borderLeftColor = borderColor;
}
