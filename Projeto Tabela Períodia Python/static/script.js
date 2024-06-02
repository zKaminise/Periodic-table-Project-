document.getElementById('searchButton').addEventListener('click', function() {
    const elementInput = document.getElementById('elementInput').value.trim().toUpperCase();
    const modal = document.getElementById('modal');
    const elementDetails = document.getElementById('elementDetails');

    fetch('/get_element', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ symbol: elementInput })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'found') {
            const element = data.element;
            elementDetails.innerHTML = `
                <h2>${element.name} (${element.symbol})</h2>
                <p><strong>Appearance:</strong> ${element.appearance}</p>
                <p><strong>Atomic Mass:</strong> ${element.atomic_mass}</p>
                <p><strong>Boiling Point:</strong> ${element.boil}</p>
                <p><strong>Category:</strong> ${element.category}</p>
                <p><strong>Density:</strong> ${element.density}</p>
                <p><strong>Discovered By:</strong> ${element.discovered_by}</p>
                <p><strong>Melting Point:</strong> ${element.melt}</p>
                <p><strong>Molar Heat:</strong> ${element.molar_heat}</p>
                <p><strong>Named By:</strong> ${element.named_by}</p>
                <p><strong>Phase:</strong> ${element.phase}</p>
                <p><strong>Summary:</strong> ${element.summary}</p>
                <img src="${element.bohr_model_image}" alt="Bohr model image">
            `;
            modal.style.display = 'flex';
        } else {
            elementDetails.innerHTML = `<p>Elemento não encontrado.</p>`;
            modal.style.display = 'flex';
        }
    })
    .catch(error => {
        elementDetails.innerHTML = '<p>Ocorreu um erro ao buscar a resposta.</p>';
        modal.style.display = 'flex';
    });
});

document.querySelector('.close-button').addEventListener('click', function() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
});

window.addEventListener('click', function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
