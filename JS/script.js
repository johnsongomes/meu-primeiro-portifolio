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
    resultado.insertAdjacentHTML("beforeend", " <a href=\"https://www.youtube.com/@Johnsongomesof\" id=\"link-resultado\" target=\"_blank\">conhecer.</a>");}

document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o envio do formulário
    mostrarMensagem(); // Chama a função para mostrar a mensagem
});