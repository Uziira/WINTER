document.addEventListener('DOMContentLoaded', () => {
    createSnowflakes();

    const acceptBtn = document.getElementById('acceptBtn');
    const declineBtn = document.getElementById('declineBtn');
    const backBtn = document.getElementById('backBtn');
    const giftCard = document.getElementById('giftCard');
    const resultCard = document.getElementById('resultCard');
    const refuseCard = document.getElementById('refuseCard');

    if (!acceptBtn || !giftCard || !resultCard) {
        return;
    }

    let declineCount = 0;
    const declineTexts = [
        "Are you sure?",
        "Think again!",
        "Really no?",
        "Give it a try!",
        "You can't refuse!"
    ];

    if (declineBtn) {
        declineBtn.addEventListener('click', () => {
            if (declineCount < declineTexts.length) {
                declineBtn.textContent = declineTexts[declineCount];
                declineCount++;

                const randomX = (Math.random() - 0.5) * 60;
                const randomY = (Math.random() - 0.5) * 30;
                declineBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
            } else {
                giftCard.classList.add('hidden');
                
                setTimeout(() => {
                    giftCard.style.display = 'none';
                    if (refuseCard) {
                        refuseCard.classList.remove('hidden');
                        refuseCard.style.display = 'block';
                    }
                    if (backBtn) {
                        backBtn.classList.remove('hidden');
                    }
                }, 300);
            }
        });
    }

    acceptBtn.addEventListener('click', () => {
        giftCard.classList.add('hidden');
        
        setTimeout(() => {
            giftCard.style.display = 'none';
            resultCard.classList.remove('hidden');
            resultCard.style.display = 'block';

            if (backBtn) {
                backBtn.classList.remove('hidden');
            }
            
            const videoEl = resultCard.querySelector('video');
            if (videoEl) {
                videoEl.muted = false;
                videoEl.play().catch(e => console.log("Lecture auto bloquée :", e));
            }

            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            }
        }, 300);
    });

    if (backBtn) {
        backBtn.addEventListener('click', () => {
            const videoEl = resultCard.querySelector('video');
            if (videoEl) {
                videoEl.pause();
                videoEl.currentTime = 0;
                videoEl.muted = true;
            }

            resultCard.classList.add('hidden');
            resultCard.style.display = 'none';

            if (refuseCard) {
                refuseCard.classList.add('hidden');
                refuseCard.style.display = 'none';
            }

            backBtn.classList.add('hidden');

            declineCount = 0;
            if (declineBtn) {
                declineBtn.textContent = "Decline";
                declineBtn.style.transform = "translate(0, 0)";
            }

            giftCard.style.display = 'block';
            setTimeout(() => {
                giftCard.classList.remove('hidden');
            }, 10);
        });
    }
});

function createSnowflakes() {
    const snowContainer = document.getElementById('snowContainer');
    if (!snowContainer) return;
    
    const flakeCount = 100;

    for (let i = 0; i < flakeCount; i++) {
        const flake = document.createElement('div');
        flake.classList.add('snowflake');
        flake.textContent = '❄';
        flake.style.left = `${Math.random() * 100}%`;
        flake.style.animationDuration = `${Math.random() * 3 + 2}s`;
        flake.style.animationDelay = `${Math.random() * 5}s`;
        flake.style.opacity = Math.random() * 0.7 + 0.3;
        flake.style.fontSize = `${Math.random() * 12 + 8}px`;
        
        snowContainer.appendChild(flake);
    }
}