// Função para trocar slides
function changeSlide(direction, carouselType) {
    const carousel = document.getElementById(`${carouselType}-carousel`);
    const images = carousel.querySelectorAll('img');
    const imageWidth = images[0].offsetWidth;
    const gap = parseFloat(getComputedStyle(carousel).gap);
    const totalWidth = imageWidth + gap;

    // Calcular o novo índice
    let currentTransform = parseFloat(carousel.style.transform?.replace('translateX(', '').replace('px)', '') || 0);
    let newTransform = currentTransform - (direction * totalWidth);

    // Limitar o movimento
    if (newTransform > 0) {
        newTransform = -(images.length - 1) * totalWidth;
    }
    if (newTransform < -(images.length - 1) * totalWidth) {
        newTransform = 0;
    }

    carousel.style.transform = `translateX(${newTransform}px)`;
}

// Carrossel de Novidades e Depoimentos
document.addEventListener('DOMContentLoaded', () => {
    ['novidades', 'depoimentos'].forEach(carouselType => {
        const carousel = document.getElementById(`${carouselType}-carousel`);
        const images = carousel.querySelectorAll('img');
        let currentIndex = 0;

        function rotateCarousel() {
            const imageWidth = images[0].offsetWidth;
            const gap = parseFloat(getComputedStyle(carousel).gap);
            const totalWidth = imageWidth + gap;

            currentIndex++;
            
            if (currentIndex >= images.length) {
                currentIndex = 0;
                carousel.style.transition = 'none';
                carousel.style.transform = `translateX(0)`;
                
                setTimeout(() => {
                    carousel.style.transition = 'transform 0.5s ease';
                }, 50);
            }

            carousel.style.transform = `translateX(-${currentIndex * totalWidth}px)`;
        }

        // Iniciar rotação automática a cada 3 segundos
        setInterval(rotateCarousel, 3000);
    });
});

// Função para copiar voucher
function copyVoucher() {
    const voucherText = document.getElementById('voucher-text');
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = voucherText.textContent;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextArea);
    alert('Código copiado com sucesso!');
}