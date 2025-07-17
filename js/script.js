// ===== SCRIPT PRINCIPAL DO SITE Olhar Cósmico =====

// Aguarda o carregamento da página
document.addEventListener('DOMContentLoaded', function() {
    
    // Busca o formulário na página
    const formulario = document.getElementById('formulario-contato');
    
    // Verifica se estamos na página de contato
    if (formulario) {
        // Adiciona evento para quando o formulário for enviado
        formulario.addEventListener('submit', function(evento) {
            // Impede o envio normal do formulário
            evento.preventDefault();
            
            // Chama a função para processar os dados
            processarFormulario();
        });
        
        // Adiciona evento para o botão limpar
        formulario.addEventListener('reset', function() {
            // Esconde a área de dados enviados
            document.getElementById('dados-enviados').style.display = 'none';
        });
    }
    
    // Configura o menu dropdown para mobile
    configurarMenuMobile();
});

// ===== FUNÇÃO PARA PROCESSAR O FORMULÁRIO =====
function processarFormulario() {
    // Coleta os dados do formulário
    const dados = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        idade: document.getElementById('idade').value,
        dataNascimento: document.getElementById('data-nascimento').value,
        nivelInteresse: document.getElementById('nivel-interesse').value,
        mensagem: document.getElementById('mensagem').value
    };
    
    // Coleta as áreas de interesse selecionadas
    const areasInteresse = [];
    const checkboxes = document.querySelectorAll('input[name="areas-interesse"]:checked');
    checkboxes.forEach(function(checkbox) {
        areasInteresse.push(checkbox.value);
    });
    dados.areasInteresse = areasInteresse;
    
    // Verifica se os campos obrigatórios estão preenchidos
    if (dados.nome === '' || dados.email === '') {
        alert('Por favor, preencha pelo menos o Nome e E-mail.');
        return;
    }
    
    // Exibe os dados na página
    exibirDados(dados);
    
    // Mostra a seção de dados enviados
    document.getElementById('dados-enviados').style.display = 'block';
    
    // Rola até a seção de dados enviados
    document.getElementById('dados-enviados').scrollIntoView({ 
        behavior: 'smooth' 
    });
    
    // Muda o texto do botão temporariamente
    const botaoEnviar = document.querySelector('button[type="submit"]');
    const textoOriginal = botaoEnviar.textContent;
    botaoEnviar.textContent = 'Enviado com Sucesso!';
    botaoEnviar.style.backgroundColor = '#28a745';
    
    // Restaura o botão após 3 segundos
    setTimeout(function() {
        botaoEnviar.textContent = textoOriginal;
        botaoEnviar.style.backgroundColor = '#4facfe';
    }, 3000);
}

// ===== FUNÇÃO PARA EXIBIR OS DADOS NA PÁGINA =====
function exibirDados(dados) {
    let html = '<div style="color: white; line-height: 1.8;">';
    
    // Informações pessoais
    html += '<h4 style="color: #4facfe; margin-bottom: 1rem;">📋 Informações Pessoais:</h4>';
    html += '<p><strong>Nome:</strong> ' + (dados.nome || 'Não informado') + '</p>';
    html += '<p><strong>E-mail:</strong> ' + (dados.email || 'Não informado') + '</p>';
    html += '<p><strong>Telefone:</strong> ' + (dados.telefone || 'Não informado') + '</p>';
    html += '<p><strong>Idade:</strong> ' + (dados.idade || 'Não informada') + '</p>';
    
    // Formata a data se foi preenchida
    if (dados.dataNascimento) {
        const data = new Date(dados.dataNascimento + 'T00:00:00');
        html += '<p><strong>Data de Nascimento:</strong> ' + data.toLocaleDateString('pt-BR') + '</p>';
    } else {
        html += '<p><strong>Data de Nascimento:</strong> Não informada</p>';
    }
    
    // Interesse em astronomia
    html += '<h4 style="color: #4facfe; margin: 1.5rem 0 1rem 0;">🌟 Interesse em Astronomia:</h4>';
    
    // Formata o nível de interesse
    let nivelFormatado = 'Não informado';
    if (dados.nivelInteresse === 'iniciante') nivelFormatado = '🌱 Iniciante';
    if (dados.nivelInteresse === 'intermediario') nivelFormatado = '🌿 Intermediário';
    if (dados.nivelInteresse === 'avancado') nivelFormatado = '🌳 Avançado';
    if (dados.nivelInteresse === 'profissional') nivelFormatado = '🎓 Profissional';
    
    html += '<p><strong>Nível de Interesse:</strong> ' + nivelFormatado + '</p>';
    
    // Áreas de interesse
    if (dados.areasInteresse.length > 0) {
        html += '<p><strong>Áreas de Interesse:</strong></p>';
        html += '<ul style="margin-left: 2rem; margin-bottom: 1rem;">';
        
        dados.areasInteresse.forEach(function(area) {
            let areaFormatada = area;
            if (area === 'planetas') areaFormatada = '🪐 Planetas';
            if (area === 'galaxias') areaFormatada = '🌌 Galáxias';
            if (area === 'estrelas') areaFormatada = '⭐ Estrelas';
            if (area === 'buracos-negros') areaFormatada = '🕳️ Buracos Negros';
            
            html += '<li>' + areaFormatada + '</li>';
        });
        
        html += '</ul>';
    } else {
        html += '<p><strong>Áreas de Interesse:</strong> Nenhuma selecionada</p>';
    }
    
    // Mensagem
    if (dados.mensagem) {
        html += '<h4 style="color: #4facfe; margin: 1.5rem 0 1rem 0;">💬 Mensagem:</h4>';
        html += '<p style="background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 8px; border-left: 4px solid #4facfe;">' + dados.mensagem + '</p>';
    }
    
    // Data e hora do envio
    const agora = new Date();
    html += '<h4 style="color: #4facfe; margin: 1.5rem 0 1rem 0;">⏰ Data e Hora do Envio:</h4>';
    html += '<p>' + agora.toLocaleString('pt-BR') + '</p>';
    
    html += '</div>';
    
    // Insere o HTML na página
    document.getElementById('resultado-formulario').innerHTML = html;
}

// ===== FUNÇÃO PARA CONFIGURAR MENU MOBILE =====
function configurarMenuMobile() {
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    if (dropdownToggle && dropdownMenu) {
        // Adiciona evento de clique para dispositivos móveis
        dropdownToggle.addEventListener('click', function(evento) {
            evento.preventDefault();
            
            // Verifica se é mobile (largura menor que 768px)
            if (window.innerWidth <= 767) {
                // Alterna a visibilidade do menu
                if (dropdownMenu.style.display === 'block') {
                    dropdownMenu.style.display = 'none';
                } else {
                    dropdownMenu.style.display = 'block';
                }
            }
        });
        
        // Fecha o menu quando clicar fora dele
        document.addEventListener('click', function(evento) {
            // Verifica se o clique não foi no menu
            if (!evento.target.closest('.dropdown')) {
                if (window.innerWidth <= 767) {
                    dropdownMenu.style.display = 'none';
                }
            }
        });
    }
}

// ===== VALIDAÇÃO SIMPLES DE EMAIL EM TEMPO REAL =====
document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('email');
    
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            const email = this.value;
            
            // Verifica se o email tem formato válido
            if (email && !email.includes('@')) {
                this.style.borderColor = '#ff6b6b';
            } else {
                this.style.borderColor = '#4facfe';
            }
        });
    }
});

// Mensagem no console para confirmar que o script foi carregado
console.log('✅ Script do Olhar Cósmico carregado com sucesso!');