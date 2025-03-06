const alunoForm = document.getElementById('alunoForm');
const listaAlunos = document.getElementById('listaAlunos');

alunoForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('alunoNome').value;
    const dataNascimento = document.getElementById('alunoDataNascimento').value;
    const turma = document.getElementById('alunoTurma').value;

    const aluno = { nome, dataNascimento, turma };

    // Enviar dados para o Back4App
    await fetch('https://parseapi.back4app.com/classes/Alunos', {
        method: 'POST',
        headers: {
            "X-Parse-Application-Id: 3lyv6RhweTG0W4YPoeU81Tjp4e2EeCfRJZzLlDm5",
            "X-Parse-REST-API-Key: P4CcOrrA3zHi4apq4Ps8YQXHVnJ3v0vYqPDOw8a2",
            "Content-Type: application/json" 
        },
        body: JSON.stringify(aluno)
    });

    // Adicionar aluno à lista
    const li = document.createElement('li');
    li.textContent = `${nome} - ${turma}`;
    listaAlunos.appendChild(li);

    // Limpar o formulário
    alunoForm.reset();
});

// Função para carregar alunos (opcional)
async function carregarAlunos() {
    const response = await fetch('https://parseapi.back4app.com/classes/Alunos', {
        method: 'GET',
        headers: {
            "X-Parse-Application-Id: 3lyv6RhweTG0W4YPoeU81Tjp4e2EeCfRJZzLlDm5",
            "X-Parse-REST-API-Key: P4CcOrrA3zHi4apq4Ps8YQXHVnJ3v0vYqPDOw8a2",
        }
    });
    const data = await response.json();
    data.results.forEach(aluno => {
        const li = document.createElement('li');
        li.textContent = `${aluno.nome} - ${aluno.turma}`;
        listaAlunos.appendChild(li);
    });
}

// Carregar alunos ao iniciar
carregarAlunos();
