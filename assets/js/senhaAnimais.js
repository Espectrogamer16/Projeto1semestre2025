export function verificarSenha(animalId, senhaCorreta) {
  const inputSenha = document.getElementById(`input-senha-${animalId}`).value;
  const mensagem = document.getElementById(`mensagem-${animalId}`);

  if (inputSenha === senhaCorreta) {
    document.getElementById(`conteudo-${animalId}`).style.display = 'block';
    document.getElementById(`senha-${animalId}`).style.display = 'none';
    mensagem.textContent = '';
    localStorage.setItem(animalId, 'liberado');
  } else {
    mensagem.textContent = 'Senha incorreta. Tente novamente.';
  }
}

export function prepararModalComSenha(modalId) {
  const animalId = modalId.replace('modal-', '');
  if (localStorage.getItem(animalId) === 'liberado') {
    document.getElementById(`conteudo-${animalId}`).style.display = 'block';
    document.getElementById(`senha-${animalId}`).style.display = 'none';
  }
}