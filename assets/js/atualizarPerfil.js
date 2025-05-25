function atualizarPerfil() {
    const totalAnimais = 38;
    let totalDesbloqueados = 0;

    for (let i = 0; i < localStorage.length; i++) {
        const chave = localStorage.key(i);
        const valor = localStorage.getItem(chave);
        if (valor === 'liberado') {
            totalDesbloqueados++;
        }
    }

    const pontos = totalDesbloqueados * 100;
    const porcentagem = Math.round((totalDesbloqueados / totalAnimais) * 100);

    document.getElementById('qtd-desbloqueados').textContent = totalDesbloqueados;
    document.getElementById('pontuacao-total').textContent = pontos;
    document.getElementById('barra-preenchida').style.width = `${porcentagem}%`;
    document.getElementById('porcentagem-progresso').textContent = `${porcentagem}% desbloqueado`;

    const mensagem = document.getElementById('mensagem-incentivo');
    if (totalDesbloqueados >= totalAnimais) {
        mensagem.textContent = "🎉 Parabéns! Você descobriu todos os animais!";
    } else if (totalDesbloqueados >= totalAnimais / 2) {
        mensagem.textContent = "👏 Você já desbloqueou mais da metade! Continue assim!";
    } else if (totalDesbloqueados > 0) {
        mensagem.textContent = "🦁 Boa! Você começou sua jornada!";
    } else {
        mensagem.textContent = "🔍 Comece a explorar os territórios e descobrir os animais!";
    }

    // Saudação com nome do usuário
    const userLogado = JSON.parse(localStorage.getItem("userLogado"));
    const logado = document.querySelector("#logado");
    if (userLogado?.nome) {
        logado.innerHTML = `Olá ${userLogado.nome} vamos continuar nossa jornada?`;
    }
}