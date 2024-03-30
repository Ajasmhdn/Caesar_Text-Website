document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('inputText');
    const shiftValue = document.getElementById('shiftValue');
    const encryptBtn = document.getElementById('encrypt');
    const decryptBtn = document.getElementById('decrypt');
    const result = document.querySelector('.result');
    const toggleBtn = document.getElementById('toggle');
    const attribution = document.querySelector('.attribution');
    const copyBtn = document.createElement('button');
    copyBtn.id = 'copy';
    copyBtn.textContent = 'Copy';
    attribution.appendChild(copyBtn);

    let textType = 'text';

    inputText.type = textType;
    inputText.style.textTransform = 'capitalize';

    toggleBtn.textContent = `Toggle Input Type (${textType})`;
    toggleBtn.addEventListener('click', () => {
        if (textType === 'text') {
            textType = 'password';
            toggleBtn.textContent = `Toggle Input Type (${textType})`;
            inputText.type = textType;
            inputText.style.textTransform = 'none';
        } else {
            textType = 'text';
            toggleBtn.textContent = `Toggle Input Type (${textType})`;
            inputText.type = textType;
            inputText.style.textTransform = 'capitalize';
        }
    });

    encryptBtn.addEventListener('click', () => {
        const text = inputText.value.toLowerCase();
        const shift = parseInt(shiftValue.value);

        if (text && shift) {
            let encrypted = '';
            for (let i = 0; i < text.length; i++) {
                const charCode = text.charCodeAt(i);
                if (charCode >= 97 && charCode <= 122) {
                    encrypted += String.fromCharCode((charCode - 97 + shift) % 26 + 97);
                } else {
                    encrypted += text[i];
                }
            }
            showResult(encrypted, copyBtn);
        }
    });

    decryptBtn.addEventListener('click', () => {
        const text = inputText.value.toLowerCase();
        const shift = parseInt(shiftValue.value);

        if (text && shift) {
            let decrypted = '';
            for (let i = 0; i < text.length; i++) {
                const charCode = text.charCodeAt(i);
                if (charCode >= 97 && charCode <= 122) {
                    decrypted += String.fromCharCode((charCode - 97 - shift + 26) % 26 + 97);
                } else {
                    decrypted += text[i];
                }
            }
            showResult(decrypted, copyBtn);
        }
    });

    function showResult(resultText, copyBtnElement) {
        result.textContent = resultText;
        copyBtnElement.style.display = 'block';
    }

    copyBtn.addEventListener('click', () => {
        const inputField = document.createElement('input');
        inputField.value = result.textContent;
        document.body.appendChild(inputField);
        inputField.select();
        document.execCommand('copy');
        document.body.removeChild(inputField);
        copyBtn.textContent = 'Copied!';

        setTimeout(() => {
            copyBtn.textContent = 'Copy';
        }, 2000);
    });
});