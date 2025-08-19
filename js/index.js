  // Adicionando interação básica aos botões
        document.querySelectorAll('.btn').forEach(button => {
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
        });