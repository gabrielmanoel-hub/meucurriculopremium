// Proteção contra cópia do conteúdo
        document.addEventListener('DOMContentLoaded', function() {
            // Desativar menu de contexto (botão direito)
            document.addEventListener('contextmenu', function(e) {
                e.preventDefault();
                document.getElementById('protectionMessage').style.display = 'block';
            });
            
            // Desativar arrastar e soltar
            document.addEventListener('dragstart', function(e) {
                e.preventDefault();
            });
            
            // Desativar teclas de atalho (Ctrl+C, Ctrl+U, etc.)
            document.addEventListener('keydown', function(e) {
                // Ctrl+C, Ctrl+U, F12, etc.
                if (e.ctrlKey && (e.keyCode === 67 || e.keyCode === 85) || e.keyCode === 123) {
                    e.preventDefault();
                    document.getElementById('protectionMessage').style.display = 'block';
                }
            });
            
            // Proteção contra captura de tela (para alguns navegadores)
            document.addEventListener('visibilitychange', function() {
                if (document.hidden) {
                    document.getElementById('protectionMessage').style.display = 'block';
                }
            });
            
            // Proteção contra impressão
            window.addEventListener('beforeprint', function(e) {
                e.preventDefault();
                document.getElementById('protectionMessage').style.display = 'block';
            });
            
            // Código original para a demonstração dos modelos
            const modelItems = document.querySelectorAll('.model-list li');
            const previewTitle = document.querySelector('.preview-header h2');
            const previewPrice = document.querySelector('.model-price');
            const previewContent = document.querySelector('.preview-content');
            const actionButton = document.querySelector('.action-buttons');
            const watermark = document.querySelector('.watermark');