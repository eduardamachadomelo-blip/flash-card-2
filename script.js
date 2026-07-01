const passwordInput = document.getElementById('password');
const lengthSlider = document.getElementById('length');
const lengthValue = document.getElementById('length-value');
const generateBtn = document.getElementById('generate-btn');
const copyBtn = document.getElementById('copy-btn');

const uppercaseCheck = document.getElementById('uppercase');
const lowercaseCheck = document.getElementById('lowercase');
const numbersCheck = document.getElementById('numbers');
const symbolsCheck = document.getElementById('symbols');

const strengthBar = document.getElementById('strength-bar');
const strengthText = document.getElementById('strength-text');

const lowercase = 'abcdefghijklmnopqrstuvwxyz';
const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';
const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

lengthSlider.addEventListener('input', () => {
    lengthValue.textContent = lengthSlider.value;
});

function generatePassword() {
    const length = parseInt(lengthSlider.value);
    let chars = '';
    
    if (lowercaseCheck.checked) chars += lowercase;
    if (uppercaseCheck.checked) chars += uppercase;
    if (numbersCheck.checked) chars += numbers;
    if (symbolsCheck.checked) chars += symbols;
    
    if (chars === '') chars = lowercase;

    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars[Math.floor(Math.random() * chars.length)];
    }
    
    passwordInput.value = password;
    updateStrength(password);
}

function updateStrength(password) {
    let score = 0;
    if (password.length >= 12) score += 2;
    else if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    let width = '20%';
    let color = '#F44336';
    let text = 'Muito Fraca';

    if (score >= 5) { width = '100%'; color = '#4CAF50'; text = 'Muito Forte'; }
    else if (score >= 4) { width = '80%'; color = '#8BC34A'; text = 'Forte'; }
    else if (score >= 3) { width = '60%'; color = '#FFEB3B'; text = 'Média'; }
    else if (score >= 2) { width = '40%'; color = '#FF9800'; text = 'Fraca'; }

    strengthBar.innerHTML = `<div class="strength-fill" style="width: ${width}; background: ${color};"></div>`;
    strengthText.textContent = text;
    strengthText.style.color = color;
}

copyBtn.addEventListener('click', () => {
    if (passwordInput.value) {
        navigator.clipboard.writeText(passwordInput.value).then(() => {
            const original = copyBtn.textContent;
            copyBtn.textContent = '✅ Copiado!';
            setTimeout(() => copyBtn.textContent = original, 2000);
        });
    }
});

generateBtn.addEventListener('click', generatePassword);

// Gerar senha inicial
generatePassword();

// Abelhas voando
function createBee() {
    const bee = document.createElement('div');
    bee.textContent = '🐝';
    bee.style.position = 'absolute';
    bee.style.fontSize = `${Math.random() * 30 + 25}px`;
    bee.style.left = `${Math.random() * 100}vw`;
    bee.style.top = `${Math.random() * 100}vh`;
    bee.style.opacity = Math.random() * 0.6 + 0.4;
    bee.style.transition = `transform ${Math.random() * 18 + 12}s linear`;
    document.querySelector('.bee-container').appendChild(bee);

    setTimeout(() => {
        const x = (Math.random() - 0.5) * 800;
        const y = (Math.random() - 0.5) * 600;
        bee.style.transform = `translate(${x}px, ${y}px) rotate(${Math.random() * 90 - 45}deg)`;
    }, 100);

    setTimeout(() => bee.remove(), 25000);
}

setInterval(() => {
    for (let i = 0; i < 3; i++) {
        if (Math.random() > 0.3) createBee();
    }
}, 700);

for (let i = 0; i < 12; i++) createBee();
