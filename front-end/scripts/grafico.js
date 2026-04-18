function crearGrafico() {
    const canvas = document.getElementById('graficoAsistencia');
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, '#64a19d');
    gradient.addColorStop(1, 'rgba(189, 47, 158, 0.1)');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
            datasets: [{
                label: 'Asistencia',
                data: [18, 25, 20, 28, 30],
                fill: true,
                backgroundColor: gradient,
                borderColor: '#fff',
                tension: 0.4,
                pointBackgroundColor: '#fff',
                pointBorderColor: '#000',
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255,255,255,0.1)'
                    }
                }
            }
        }
    });

    setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
    }, 100);
}