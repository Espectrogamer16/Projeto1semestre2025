// assets/js/progressoTerritorios.js
import { animais } from './lista.js'; // Importa o objeto de animais por território

export function gerarTabelaProgressoTerritorios() {
    const tabelaCorpo = document.getElementById('tabela-progresso-corpo');
    if (!tabelaCorpo) {
        console.error("Elemento 'tabela-progresso-corpo' não encontrado. Certifique-se de que o HTML está carregado.");
        return;
    }

    tabelaCorpo.innerHTML = ''; // Limpa qualquer conteúdo anterior da tabela

    // Itera sobre cada território no objeto 'animais'
    for (const territorioId in animais) {
        // Garante que estamos processando apenas propriedades diretas do objeto, não protótipos
        if (Object.hasOwnProperty.call(animais, territorioId)) {
            const listaAnimaisDoTerritorio = animais[territorioId];
            const totalAnimaisNoTerritorio = listaAnimaisDoTerritorio.length;
            let desbloqueadosNoTerritorio = 0;

            // Para cada animal no território, verifica se está 'liberado' no localStorage
            listaAnimaisDoTerritorio.forEach(animalId => {
                if (localStorage.getItem(animalId) === 'liberado') {
                    desbloqueadosNoTerritorio++;
                }
            });

            // Cria uma nova linha para a tabela
            const linha = document.createElement('tr');

            // Célula do nome do Território
            const celulaTerritorio = document.createElement('td');
            celulaTerritorio.textContent = formatarNomeTerritorio(territorioId);
            linha.appendChild(celulaTerritorio);

            // Célula do Progresso (X/Y)
            const celulaProgresso = document.createElement('td');
            celulaProgresso.textContent = `${desbloqueadosNoTerritorio}/${totalAnimaisNoTerritorio}`;
            linha.appendChild(celulaProgresso);

            // Célula de Animais Faltando
            const celulaFaltando = document.createElement('td');
            const faltando = totalAnimaisNoTerritorio - desbloqueadosNoTerritorio;
            celulaFaltando.textContent = faltando === 0 ? "Completo!" : `${faltando} animais`;
            // Adiciona uma classe para estilização se o território estiver completo
            if (faltando === 0) {
                celulaFaltando.classList.add('completo');
            }
            linha.appendChild(celulaFaltando);

            // Adiciona a linha ao corpo da tabela
            tabelaCorpo.appendChild(linha);
        }
    }
}

// Função auxiliar para formatar o nome do território para exibição
function formatarNomeTerritorio(id) {
    // Tenta extrair o número do território (ex: "territorio1" -> "1")
    const match = id.match(/territorio(\d+)/i);
    if (match && match[1]) {
        return `Território ${match[1]}`;
    }
    // Se não seguir o padrão numérico, pode adicionar casos específicos ou capitalizar
    // Ex: if (id === "bosque-corujas-do-mundo") return "Bosque Corujas do Mundo";
    return id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()); // Exemplo: converte "algum-nome" para "Algum Nome"
}

// Chame a função quando a página for completamente carregada
document.addEventListener('DOMContentLoaded', gerarTabelaProgressoTerritorios);