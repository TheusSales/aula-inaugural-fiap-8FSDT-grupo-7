document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('group-form');
    const submitButton = document.getElementById('submit-button');
    const url = 'https://fsdt-contact.onrender.com/contact';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';

        const names = Array.from(document.querySelectorAll('.name-input'))
            .map(i => i.value.trim())
            .filter(Boolean);

        const message = (document.getElementById('history')?.value || '').trim();

        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ names, message })
            });
            if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
            const data = await res.json();
            alert('Enviado com sucesso!');
            console.log('Resposta da API:', data);
            form.reset();
        } catch (err) {
            alert('Ocorreu um erro ao enviar. Veja o console.');
            console.error('Erro ao enviar formulário:', err);
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Enviar';
        }
    });
});