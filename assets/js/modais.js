function abrirModal(id) {
  // Fecha todos os modais
  document.querySelectorAll(".modal").forEach(m => m.style.display = "none");

  const modal = document.getElementById(id);
  if (modal) {
    modal.style.display = "flex";

    // Se o modal for de perfil, atualiza automaticamente
    if (id === "modal-perfil") {
      atualizarPerfil();
    }

    // Se o modal for um dos modais de território (com número), carrega conteúdo se ainda não carregado
    if (id.startsWith("modal-territorio")) {
      const num = id.replace("modal-territorio", "");
      const containerId = `conteudo-territorio${num}`;
      const container = document.getElementById(containerId);

      if (container && container.innerHTML.trim() === "") {
        fetch(`assets/html/territorios/territorio${num}.html`)
          .then(res => res.text())
          .then(html => {
            container.innerHTML = html;
          });
      }
    }
  }
}
function fecharModal() {
  document.querySelectorAll(".modal").forEach(m => m.style.display = "none");
}

function carregarTerritorio(nomeArquivo) {
  fetch(`/assets/html/territorios/${nomeArquivo}`)
    .then(res => res.text())
    .then(html => {
      document.getElementById('conteudo-territorio').innerHTML = html;
      abrirModal('modal-territorio-dinamico');
    });
}

function atualizarMissoes() {
  const statusContainer = document.getElementById("status-missoes");
  if (!statusContainer) return;

  statusContainer.innerHTML = "<h2>Missões</h2><p>Confira quais animais você ainda precisa desbloquear em cada território:</p>";

  for (const [territorio, animais] of Object.entries(animaisPorTerritorio)) {
    let desbloqueados = 0;

    animais.forEach(animalId => {
      const status = localStorage.getItem(animalId);
      if (status === "liberado") {
        desbloqueados++;
      }
    });

    const total = animais.length;
    const restante = total - desbloqueados;

    const div = document.createElement("div");
    div.innerHTML = `
      <h3>Território ${territorio} - ${desbloqueados} / ${total} desbloqueados</h3>
      <ul>
        ${animais.map(animalId => {
      const status = localStorage.getItem(animalId);
      const icone = status === "liberado" ? "✅" : "🔒";
      const nomeFormatado = animalId.replace(/-/g, " ");
      return `<li>${icone} ${nomeFormatado}</li>`;
    }).join("")}
      </ul>
    `;
    statusContainer.appendChild(div);
  }
}