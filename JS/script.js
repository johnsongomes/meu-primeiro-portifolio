// Suprime o alerta inicial para melhor
// window.alert("Olá, Desconhecido!");

function mostrarMensagem() {
    var nome = document.getElementById("nome").value.trim(); // Obtém o valor do campo de entrada
    var resultado = document.getElementById("resultado");

    if (!nome || nome.length === 0 || nome.length > 50 || /[^a-zA-Z\s]/.test(nome)) {
        resultado.textContent = "Por favor, informe seu nome.";
        resultado.style.color = "#B22222";
        return;
    }

    resultado.textContent = "Olá, " + nome + "! Bem-vindo ao meu site. click aqui --->>";
    resultado.style.color = "#006400";
    resultado.insertAdjacentHTML("beforeend", "<div><a href=\"https://github.com/johnsongomes\" class=\"text-white me-3\"><i class=\"bi bi-github\"></i></a><div><a href=\"https://www.youtube.com/@Johnsongomesof\" class=\"text-white me-3\"><i class=\"bi bi-youtube\"></i></a><a href=\"https://www.linkedin.com/in/johnson-gomes-19060295/\" class=\"text-white me-3\"><i class=\"bi bi-linkedin\"></i></a><a href=\"mailto:johnsongomes@gmail.com\" class=\"text-white\"><i class=\"bi bi-envelope\"></i></a></div>");}

document.querySelector("#form-primario").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o envio do formulário
    mostrarMensagem(); // Chama a função para mostrar a mensagem
});

//script do botão de voltar ao topo
window.addEventListener('scroll', () => {
const btn = document.getElementById('btn-topo');
     btn.style.display = window.scrollY > 300 ? 'block' : 'none';
});

document.getElementById('btn-topo').addEventListener('click', () => {
window.scrollTo({ top: 0, behavior: 'smooth' });
});

//script formulario de contato
 document.getElementById('form-contato').addEventListener('submit', function (e) {
     e.preventDefault();
     const nome2 = document.getElementById('nome2').value.trim();
     const email = document.getElementById('email').value.trim();
     const mensagem = document.getElementById('mensagem').value.trim();

     if (!nome2 || !email || !mensagem) {
         alert('Por favor, preencha todos os campos do formulário.');
         return;
     }

     alert(`Obrigado, ${nome2}! Sua mensagem foi enviada com sucesso.\n\nE-mail: ${email}\nMensagem: ${mensagem}`);

     const contatos = JSON.parse(localStorage.getItem('contatos')) || [];
     contatos.push({ nome: nome2, email, mensagem, data: new Date().toISOString() });
     localStorage.setItem('contatos', JSON.stringify(contatos));

     this.reset();
 });