  // Adicionando interação básica aos botões
       /* document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const model = this.closest('.model-card').querySelector('h3').textContent;
                const isFree = this.classList.contains('btn-free');
                
                if (isFree) {
                    alert(`Você selecionou o modelo ${model} (Grátis). Em seguida, preencha seus dados.`);
                    // Redirecionar para página de preenchimento do currículo
                } else {
                    alert(`Você selecionou o modelo ${model} (Premium). Você será redirecionado para pagamento.`);
                    // Redirecionar para página de pagamento
                }
            });
        });*/

        // Sistema de Autenticação
        document.addEventListener('DOMContentLoaded', function() {
            // Elementos do DOM
            const authModal = document.getElementById('authModal');
            const loginTab = document.getElementById('loginTab');
            const registerTab = document.getElementById('registerTab');
            const loginForm = document.getElementById('loginForm');
            const registerForm = document.getElementById('registerForm');
            const loginMessage = document.getElementById('loginMessage');
            const registerMessage = document.getElementById('registerMessage');
            const closeBtn = document.querySelector('.close');
            const userButton = document.getElementById('userButton');
            const userText = document.getElementById('userText');
            const userDropdown = document.getElementById('userDropdown');
            const loginLink = document.getElementById('loginLink');
            const registerLink = document.getElementById('registerLink');
            const profileLink = document.getElementById('profileLink');
            const myCurriculumsLink = document.getElementById('myCurriculumsLink');
            const logoutLink = document.getElementById('logoutLink');
            
            // Verificar se o usuário está logado ao carregar a página
            checkAuthStatus();
            
            // Abrir modal ao clicar em Entrar
            loginLink.addEventListener('click', function(e) {
                e.preventDefault();
                showAuthModal();
                showLoginForm();
            });
            
            // Abrir modal de registro
            registerLink.addEventListener('click', function(e) {
                e.preventDefault();
                showAuthModal();
                showRegisterForm();
            });
            
            // Alternar entre login e registro
            loginTab.addEventListener('click', showLoginForm);
            registerTab.addEventListener('click', showRegisterForm);
            
            // Fechar modal
            closeBtn.addEventListener('click', closeAuthModal);
            
            // Fechar modal ao clicar fora dele
            window.addEventListener('click', function(event) {
                if (event.target === authModal) {
                    closeAuthModal();
                }
            });
            
            // Submeter formulário de login
            loginForm.addEventListener('submit', async function(e) {
                e.preventDefault();
                const email = document.getElementById('loginEmail').value;
                const password = document.getElementById('loginPassword').value;
                
                const result = await login(email, password);
                if (result.success) {
                    showMessage(loginMessage, 'Login realizado com sucesso!', 'success');
                    setTimeout(() => {
                        closeAuthModal();
                        checkAuthStatus();
                    }, 1500);
                } else {
                    showMessage(loginMessage, result.message, 'error');
                }
            });
            
            // Submeter formulário de registro
            registerForm.addEventListener('submit', async function(e) {
                e.preventDefault();
                const name = document.getElementById('registerName').value;
                const email = document.getElementById('registerEmail').value;
                const password = document.getElementById('registerPassword').value;
                const confirmPassword = document.getElementById('registerConfirmPassword').value;
                
                // Validar senhas
                if (password !== confirmPassword) {
                    showMessage(registerMessage, 'As senhas não coincidem!', 'error');
                    return;
                }
                
                const result = await register(name, email, password);
                if (result.success) {
                    showMessage(registerMessage, 'Conta criada com sucesso!', 'success');
                    setTimeout(() => {
                        closeAuthModal();
                        checkAuthStatus();
                    }, 1500);
                } else {
                    showMessage(registerMessage, result.message, 'error');
                }
            });
            
            // Logout
            logoutLink.addEventListener('click', function(e) {
                e.preventDefault();
                logout();
                checkAuthStatus();
            });
            
            // Funções de autenticação
            async function login(email, password) {
                // Simulação de login - substitua pela chamada real à API
                return new Promise(resolve => {
                    setTimeout(() => {
                        // Simular login bem-sucedido
                        if (email && password) {
                            localStorage.setItem('user', JSON.stringify({
                                name: 'Usuário Teste',
                                email: email,
                                token: 'simulated-token-' + Date.now()
                            }));
                            resolve({ success: true });
                        } else {
                            resolve({ success: false, message: 'E-mail ou senha inválidos' });
                        }
                    }, 1000);
                });
            }
            
            async function register(name, email, password) {
                // Simulação de registro - substitua pela chamada real à API
                return new Promise(resolve => {
                    setTimeout(() => {
                        // Simular registro bem-sucedido
                        if (name && email && password) {
                            localStorage.setItem('user', JSON.stringify({
                                name: name,
                                email: email,
                                token: 'simulated-token-' + Date.now()
                            }));
                            resolve({ success: true });
                        } else {
                            resolve({ success: false, message: 'Erro ao criar conta' });
                        }
                    }, 1000);
                });
            }
            
            function logout() {
                localStorage.removeItem('user');
            }
            
            function isAuthenticated() {
                return localStorage.getItem('user') !== null;
            }
            
            function getUserInfo() {
                const user = localStorage.getItem('user');
                return user ? JSON.parse(user) : null;
            }
            
            function checkAuthStatus() {
                if (isAuthenticated()) {
                    const user = getUserInfo();
                    userText.textContent = user.name;
                    loginLink.style.display = 'none';
                    registerLink.style.display = 'none';
                    profileLink.style.display = 'block';
                    myCurriculumsLink.style.display = 'block';
                    logoutLink.style.display = 'block';
                } else {
                    userText.textContent = 'Entrar';
                    loginLink.style.display = 'block';
                    registerLink.style.display = 'block';
                    profileLink.style.display = 'none';
                    myCurriculumsLink.style.display = 'none';
                    logoutLink.style.display = 'none';
                }
            }
            
            function showAuthModal() {
                authModal.style.display = 'block';
            }
            
            function closeAuthModal() {
                authModal.style.display = 'none';
                loginForm.reset();
                registerForm.reset();
                loginMessage.style.display = 'none';
                registerMessage.style.display = 'none';
            }
            
            function showLoginForm() {
                loginTab.classList.add('active');
                registerTab.classList.remove('active');
                loginForm.style.display = 'flex';
                registerForm.style.display = 'none';
                loginMessage.style.display = 'none';
            }
            
            function showRegisterForm() {
                registerTab.classList.add('active');
                loginTab.classList.remove('active');
                registerForm.style.display = 'flex';
                loginForm.style.display = 'none';
                registerMessage.style.display = 'none';
            }
            
            function showMessage(element, message, type) {
                element.textContent = message;
                element.className = 'form-message ' + type;
                element.style.display = 'block';
            }
            
            // Formulário de feedback
            document.getElementById('feedbackForm').addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Obrigado pelo seu feedback! Entraremos em contato em breve.');
                this.reset();
            });
            
            // Adicionando efeito de destaque ao passar o mouse nos cards de modelo
            document.querySelectorAll('.model-card').forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-10px)';
                    this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                    this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.08)';
                });
            });
        });