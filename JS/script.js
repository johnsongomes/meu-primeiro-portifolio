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
    resultado.insertAdjacentHTML("beforeend", " <a href=\"https://www.youtube.com/@Johnsongomesof\" id=\"link-resultado\" class=\"text-black me-3\"><i class=\"bi bi-youtube\"></i>Youtube</a>, <a href=\"/sobre.html\" class=\"text-black me-3\"><i class=\"bi bi-person-circle\"></i>Sobre</a>, <a href=\"/projetos.html\" class=\"text-black me-3\"><i class=\"bi bi-code-slash\"></i>Projetos</a>, <a href=\"/contato.html\" class=\"text-black me-3\"><i class=\"bi bi-envelope\"></i>Contato</a>");}

document.querySelector("form").addEventListener("submit", function(event) {
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
const nome = document.getElementById('nome').value;
const email = document.getElementById('email').value;
const mensagem = document.getElementById('mensagem').value;
alert(`Obrigado, ${nome}! Sua mensagem foi enviada com sucesso.\n\nE-mail: 
${email}\nMensagem: ${mensagem}`);
this.reset();
});