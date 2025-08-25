  // Variáveis globais
        let currentSection = 'section-model';
        let selectedModel = 'classic';

  //==================================================================================
       // Verificar o parâmetro do modelo na URL
        function getModelFromURL() {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get('modelo');
        }

        // Selecionar o modelo baseado no parâmetro da URL
        function selectModelFromURL() {
            const modelo = getModelFromURL();
            if (modelo) {
                const modelOption = document.querySelector(`.model-option[data-model="${modelo}"]`);
                if (modelOption) {
                    modelOption.click();
                    
                    // Rolar até a seção de seleção de modelo
                    document.getElementById('section-model').scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'center'
                    });
                    
                    // Destacar visualmente o modelo selecionado
                    highlightSelectedModel(modelOption);
                }
            }
        }

        // Destacar visualmente o modelo selecionado
        function highlightSelectedModel(modelElement) {
            modelElement.style.transform = 'scale(1.05)';
            modelElement.style.boxShadow = '0 0 15px rgba(0, 0, 0, 0.2)';
            
            setTimeout(() => {
                modelElement.style.transform = '';
                modelElement.style.boxShadow = '';
            }, 2000);
        }

        // Executar quando a página carregar
        document.addEventListener('DOMContentLoaded', function() {
            // Configurar os eventos de clique para os modelos
            document.querySelectorAll('.model-option').forEach(option => {
                option.addEventListener('click', function() {
                    selectedModel = this.getAttribute('data-model');
                    updateModelSelection(this);
                });
            });
            
            // Processar parâmetro da URL
            selectModelFromURL();
        });

        // Atualizar a seleção visual do modelo
        function updateModelSelection(selectedOption) {
            // Remover seleção de todos os modelos
            document.querySelectorAll('.model-option').forEach(option => {
                option.classList.remove('selected');
            });
            
            // Adicionar seleção ao modelo clicado
            selectedOption.classList.add('selected');
        }

    //================================================================================
        
        // Navegação entre seções
        function nextSection(current, next) {
            document.getElementById(current).classList.remove('active');
            document.getElementById(next).classList.add('active');
            updateProgressBar(next);
            currentSection = next;
        }
        
        function prevSection(current, prev) {
            document.getElementById(current).classList.remove('active');
            document.getElementById(prev).classList.add('active');
            updateProgressBar(prev);
            currentSection = prev;
        }
        
        // Atualizar barra de progresso
        function updateProgressBar(section) {
            const steps = document.querySelectorAll('.progress-step');
            const sections = ['section-model', 'section-personal', 'section-experience', 'section-education', 'section-skills'];
            const currentIndex = sections.indexOf(section);
            
            steps.forEach((step, index) => {
                if (index < currentIndex) {
                    step.classList.add('completed');
                    step.classList.remove('active');
                } else if (index === currentIndex) {
                    step.classList.add('active');
                    step.classList.remove('completed');
                } else {
                    step.classList.remove('active', 'completed');
                }
            });
            
            // Atualizar a linha de progresso
            const progressLine = document.querySelector('.progress-bar::after');
            if (progressLine) {
                const progressPercent = (currentIndex / (sections.length - 1)) * 100;
                document.querySelector('.progress-bar').style.setProperty('--progress', progressPercent + '%');
            }
        }
        
        // Seleção de modelo
        document.querySelectorAll('.model-option').forEach(option => {
            option.addEventListener('click', function() {
                document.querySelectorAll('.model-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                this.classList.add('selected');
                selectedModel = this.getAttribute('data-model');
            });
        });
        
        // Adicionar experiências
        function addExperiencia() {
            const container = document.getElementById('experiencia-container');
            const newItem = document.createElement('div');
            newItem.className = 'item-card';
            newItem.innerHTML = `
                <button class="remove-btn" onclick="removeItem(this)"><i class="fas fa-times"></i></button>
                
                <div class="form-row">
                    <div class="form-group">
                        <label>Cargo *</label>
                        <input type="text" class="form-control" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Empresa *</label>
                        <input type="text" class="form-control" required>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label>Data de Início *</label>
                        <input type="month" class="form-control" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Data de Término</label>
                        <input type="month" class="form-control">
                        <small style="color:#666;">Deixe em branco se for o emprego atual</small>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Descrição das Atividades *</label>
                    <textarea class="form-control" required placeholder="Principais responsabilidades e conquistas"></textarea>
                </div>
            `;
            container.appendChild(newItem);
        }
        
        // Adicionar formações
        function addFormacao() {
            const container = document.getElementById('formacao-container');
            const newItem = document.createElement('div');
            newItem.className = 'item-card';
            newItem.innerHTML = `
                <button class="remove-btn" onclick="removeItem(this)"><i class="fas fa-times"></i></button>
                
                <div class="form-row">
                    <div class="form-group">
                        <label>Curso *</label>
                        <input type="text" class="form-control" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Instituição *</label>
                        <input type="text" class="form-control" required>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label>Data de Início *</label>
                        <input type="month" class="form-control" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Data de Conclusão *</label>
                        <input type="month" class="form-control" required>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Descrição (opcional)</label>
                    <textarea class="form-control" placeholder="Detalhes relevantes do curso"></textarea>
                </div>
            `;
            container.appendChild(newItem);
        }
        
        // Adicionar idiomas
        function addIdioma() {
            const container = document.getElementById('idiomas-container');
            const newItem = document.createElement('div');
            newItem.className = 'item-card';
            newItem.innerHTML = `
                <button class="remove-btn" onclick="removeItem(this)"><i class="fas fa-times"></i></button>
                
                <div class="form-row">
                    <div class="form-group">
                        <label>Idioma *</label>
                        <input type="text" class="form-control" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Nível de Proficiência *</label>
                        <select class="form-control" required>
                            <option value="">Selecione o nível</option>
                            <option value="Nativo">Nativo</option>
                            <option value="Fluente">Fluente</option>
                            <option value="Avançado">Avançado</option>
                            <option value="Intermediário">Intermediário</option>
                            <option value="Básico">Básico</option>
                        </select>
                    </div>
                </div>
            `;
            container.appendChild(newItem);
        }
        
        // Remover item
        function removeItem(button) {
            const item = button.closest('.item-card');
            item.remove();
        }
        
        // Enviar formulário
        function submitForm() {
            // Validação básica
            const requiredFields = document.querySelectorAll('[required]');
            let valid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = '#e74c3c';
                    valid = false;
                    
                    // Rolando até o campo inválido
                    if (valid === false) {
                        field.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                } else {
                    field.style.borderColor = '#ddd';
                }
            });
            
            if (!valid) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            // Coletar dados do formulário
            const formData = {
                modelo: selectedModel,
                dadosPessoais: {
                    nome: document.getElementById('nome').value,
                    cargo: document.getElementById('cargo').value,
                    email: document.getElementById('email').value,
                    telefone: document.getElementById('telefone').value,
                    endereco: document.getElementById('endereco').value,
                    linkedin: document.getElementById('linkedin').value,
                    website: document.getElementById('website').value,
                    resumo: document.getElementById('resumo').value
                },
                experiencias: [],
                formacoes: [],
                habilidades: document.getElementById('habilidades').value.split(',').map(item => item.trim()),
                idiomas: []
            };
            
            // Coletar experiências
            document.querySelectorAll('#experiencia-container .item-card').forEach(card => {
                const inputs = card.querySelectorAll('input, textarea');
                formData.experiencias.push({
                    cargo: inputs[0].value,
                    empresa: inputs[1].value,
                    dataInicio: inputs[2].value,
                    dataTermino: inputs[3].value,
                    descricao: inputs[4].value
                });
            });
            
            // Coletar formações
            document.querySelectorAll('#formacao-container .item-card').forEach(card => {
                const inputs = card.querySelectorAll('input, textarea');
                formData.formacoes.push({
                    curso: inputs[0].value,
                    instituicao: inputs[1].value,
                    dataInicio: inputs[2].value,
                    dataConclusao: inputs[3].value,
                    descricao: inputs[4].value
                });
            });
            
            // Coletar idiomas
            document.querySelectorAll('#idiomas-container .item-card').forEach(card => {
                const inputs = card.querySelectorAll('input, select');
                formData.idiomas.push({
                    idioma: inputs[0].value,
                    nivel: inputs[1].value
                });
            });
            
            // Simular envio para o servidor (substituir por API real)
            console.log('Dados do formulário:', formData);
            
            // Redirecionar para página de pagamento ou sucesso
            if (selectedModel === 'classic') {
                alert('Currículo criado com sucesso! Em instantes você poderá fazer o download.');
                // Aqui você redirecionaria para a página de download
            } else {
                alert('Currículo criado com sucesso! Redirecionando para pagamento...');
                // Aqui você redirecionaria para a página de pagamento
                // window.location.href = `pagamento.html?modelo=${selectedModel}`;
            }
        }
        
        // Inicializar a barra de progresso
        document.querySelector('.progress-bar').style.setProperty('--progress', '20%');

//=================================================
// Adicionar esta função para verificar limites antes de baixar
async function downloadCurriculum() {
  if (!isAuthenticated()) {
    alert('Você precisa estar logado para baixar currículos');
    showAuthModal();
    return;
  }
  
  const token = getToken();
  const curriculumId = obterIdDoCurriculoAtual(); // Implemente esta função
  
  try {
    const response = await fetch(`/api/curriculums/download/${curriculumId}`, {
      method: 'POST',
      headers: {
        'x-auth-token': token
      }
    });
    
    const data = await response.json();
    
    if (response.ok) {
      // Atualizar contador de downloads
      localStorage.setItem('downloadsRestantes', data.downloadsRestantes);
      
      // Gerar e baixar o PDF
      gerarPDF(data.curriculum);
    } else {
      if (response.status === 403) {
        // Limite de downloads atingido
        const modelo = obterModeloAtual(); // Implemente esta função
        const valor = obterValorDoModelo(modelo); // Implemente esta função
        
        const confirmar = confirm(
          `Você atingiu o limite de downloads gratuitos. \nDeseja comprar o modelo ${modelo} por R$ ${valor.toFixed(2)}?`
        );
        
        if (confirmar) {
          iniciarPagamento(modelo, valor);
        }
      } else {
        alert(data.msg || 'Erro ao baixar currículo');
      }
    }
  } catch (error) {
    console.error('Erro:', error);
    alert('Erro de conexão. Tente novamente.');
  }
}

// Modificar o evento de clique do botão de download
document.getElementById('downloadBtn').addEventListener('click', downloadCurriculum);        