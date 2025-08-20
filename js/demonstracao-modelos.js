 document.addEventListener('DOMContentLoaded', function() {
            const modelItems = document.querySelectorAll('.model-list li');
            const previewTitle = document.querySelector('.preview-header h2');
            const previewPrice = document.querySelector('.model-price');
            const previewContent = document.querySelector('.preview-content');
            const actionButton = document.querySelector('.action-buttons');
            const watermark = document.querySelector('.watermark');
            
            // Conteúdo para cada modelo
            const modelContents = {
                classic: {
                    title: 'Currículo Clássico',
                    price: 'Grátis',
                    priceClass: 'free',
                    content: `
                        <div class="preview-name">Maria Silva</div>
                        <div style="text-align: center; margin-bottom: 20px;">
                            Analista de Marketing Digital | maria.silva@email.com | (11) 99999-9999
                        </div>
                        
                        <div class="preview-section">
                            <h3>Experiência Profissional</h3>
                            <p><strong>Analista de Marketing Digital</strong> - Empresa ABC (2020 - Presente)</p>
                            <p>Desenvolvimento e implementação de estratégias de marketing digital, gerenciamento de mídias sociais e análise de métricas.</p>
                        </div>
                        
                        <div class="preview-section">
                            <h3>Formação Acadêmica</h3>
                            <p><strong>Bacharelado em Marketing</strong> - Universidade XYZ (2016-2020)</p>
                        </div>
                        
                        <div class="preview-section">
                            <h3>Habilidades</h3>
                            <p>Google Analytics, SEO, Gestão de Mídias Sociais, WordPress, Photoshop</p>
                        </div>
                    `,
                    button: '<a href="#" class="btn btn-free">Usar Este Modelo</a>',
                    watermark: 'Demonstração - Modelo Clássico'
                },
                modern: {
                    title: 'Currículo Moderno',
                    price: 'R$ 7,90',
                    priceClass: 'premium',
                    content: `
                        <div class="preview-header-modern">
                            <div>
                                <div class="preview-name">Carlos Oliveira</div>
                                <div>Desenvolvedor Front-end</div>
                            </div>
                            <div class="preview-contact">
                                <div>carlos.oliveira@email.com</div>
                                <div>(11) 98888-7777</div>
                                <div>linkedin.com/in/carlosoliveira</div>
                            </div>
                        </div>
                        
                        <div class="preview-section">
                            <h3>EXPERIÊNCIA</h3>
                            <p><strong>Desenvolvedor Front-end Sênior</strong> - TechSolutions Inc. (2021 - Presente)</p>
                            <p>Desenvolvimento de interfaces responsivas utilizando React, Vue.js e Sass. Liderança de equipe de 5 desenvolvedores.</p>
                        </div>
                        
                        <div class="preview-section">
                            <h3>EDUCAÇÃO</h3>
                            <p><strong>Bacharelado em Ciência da Computação</strong> - Universidade Tecnológica (2014-2018)</p>
                        </div>
                        
                        <div class="preview-section">
                            <h3>COMPETÊNCIAS</h3>
                            <p>JavaScript, React, Vue.js, HTML5, CSS3, Sass, Git, UI/UX Design</p>
                        </div>
                    `,
                    button: '<a href="#" class="btn btn-premium">Comprar Modelo</a>',
                    watermark: 'Demonstração - Modelo Moderno'
                },
                creative: {
                    title: 'Currículo Criativo',
                    price: 'R$ 9,90',
                    priceClass: 'premium',
                    content: `
                        <div class="preview-name">Ana Costa</div>
                        <div class="preview-title">Designer Gráfica & Ilustradora</div>
                        
                        <div class="preview-section">
                            <h3>Trajetória Profissional</h3>
                            <p><strong>Designer Sênior</strong> - Studio Criativo (2019 - Presente)</p>
                            <p>Criação de identidades visuais, material promocional e ilustrações para clientes de diversos segmentos.</p>
                        </div>
                        
                        <div class="preview-section">
                            <h3>Formação</h3>
                            <p><strong>Bacharelado em Design Gráfico</strong> - Escola de Artes e Design (2015-2019)</p>
                            <p><strong>Especialização em Ilustração Digital</strong> - Instituto de Artes Digitais (2020)</p>
                        </div>
                        
                        <div class="preview-section">
                            <h3>Especialidades</h3>
                            <p>Identidade Visual, Ilustração Digital, UI Design, Motion Graphics, Branding</p>
                        </div>
                    `,
                    button: '<a href="#" class="btn btn-premium">Comprar Modelo</a>',
                    watermark: 'Demonstração - Modelo Criativo'
                },
                executive: {
                    title: 'Currículo Executivo',
                    price: 'R$ 14,90',
                    priceClass: 'premium',
                    content: `
                        <div class="preview-name">Roberto Almeida</div>
                        <div class="preview-contact">Diretor de Operações | roberto.almeida@email.com | (11) 97777-6666</div>
                        
                        <div class="preview-section">
                            <h3>EXPERIÊNCIA EXECUTIVA</h3>
                            <p><strong>Diretor de Operações</strong> - GlobalTech Solutions (2018 - Presente)</p>
                            <p>Liderança das operações em 3 continentes, gerenciamento de orçamento de R$ 50M, supervisão de 200+ colaboradores.</p>
                            
                            <p><strong>Gerente de Projetos Sênior</strong> - Consultoria Empresarial (2014-2018)</p>
                            <p>Gerenciamento de projetos de transformação digital para grandes corporações.</p>
                        </div>
                        
                        <div class="preview-section">
                            <h3>FORMAÇÃO ACADÊMICA</h3>
                            <p><strong>MBA em Gestão Empresarial</strong> - Fundação Getulio Vargas (2012-2014)</p>
                            <p><strong>Bacharelado em Administração</strong> - Universidade de São Paulo (2007-2011)</p>
                        </div>
                        
                        <div class="preview-section">
                            <h3>REALIZAÇÕES</h3>
                            <p>• Aumento de 37% na eficiência operacional em 2 anos</p>
                            <p>• Redução de custos em 22% sem comprometer a qualidade</p>
                            <p>• Implementação bem-sucedida de sistema ERP em 5 filiais</p>
                        </div>
                    `,
                    button: '<a href="#" class="btn btn-premium">Comprar Modelo</a>',
                    watermark: 'Demonstração - Modelo Executivo'
                }
            };
            
            // Adiciona evento de clique para cada item do modelo
            modelItems.forEach(item => {
                item.addEventListener('click', function() {
                    const model = this.getAttribute('data-model');
                    
                    // Remove a classe active de todos os itens
                    modelItems.forEach(i => i.classList.remove('active'));
                    // Adiciona a classe active ao item clicado
                    this.classList.add('active');
                    
                    // Atualiza o preview com o conteúdo do modelo selecionado
                    previewTitle.textContent = modelContents[model].title;
                    previewPrice.textContent = modelContents[model].price;
                    previewPrice.className = 'model-price ' + modelContents[model].priceClass;
                    previewContent.innerHTML = modelContents[model].content;
                    previewContent.className = 'preview-content ' + model + '-preview';
                    actionButton.innerHTML = modelContents[model].button;
                    watermark.textContent = modelContents[model].watermark;
                });
            });
        });