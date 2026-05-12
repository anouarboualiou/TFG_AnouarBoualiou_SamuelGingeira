let instanciaGrafico = null

function crearGrafico() {
    const canvas = document.getElementById('graficoAsistencia')
    const ctx = canvas.getContext('2d')

    if (instanciaGrafico) {
        instanciaGrafico.destroy()
    }

    const ultimos5 = listaEntrenamientos
        .filter(e => e.estado === 'finalizado' && e.asistentes != null)
        .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
        .slice(-5);

    const labels = ultimos5.map(e => {
        const fechaLocal = new Date(e.fecha)
        const day = String(fechaLocal.getDate()).padStart(2, '0')
        const month = String(fechaLocal.getMonth() + 1).padStart(2, '0')
        return `${day}/${month}`
    })

    const datos = ultimos5.map(e => e.asistentes)

    const gradient = ctx.createLinearGradient(0, 0, 0, 400)
    gradient.addColorStop(0, '#64a19d')
    gradient.addColorStop(1, 'rgba(189, 47, 158, 0.1)')

    instanciaGrafico = new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: [{
                label: 'Asistencia',
                data: datos,
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
    })

    setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
    }, 100)
}