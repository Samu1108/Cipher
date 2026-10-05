const mode = document.getElementById("mode");
const keyInput = document.getElementById("key");
const messageInput = document.getElementById("message");
const resultInput = document.getElementById("result");

const executeButton = document.getElementById("execute");
const clearButton = document.getElementById("clear");
const copyButton = document.getElementById("copy");
const showKeyButton = document.getElementById("showKey");


// ==================================================
// CONSTANTS
// ==================================================

const FIRST_CHAR = 32;
const CHAR_COUNT = 95;


// ==================================================
// ENCRYPT
// ==================================================

function encrypt(message, key) {

    let result = "";

    for (let i = 0; i < message.length; i++) {

        const messageValue =
            message.charCodeAt(i) - FIRST_CHAR;

        const keyValue =
            key.charCodeAt(i % key.length) - FIRST_CHAR;

        const encryptedValue =
            (messageValue + keyValue) % CHAR_COUNT;

        result += String.fromCharCode(
            encryptedValue + FIRST_CHAR
        );
    }

    return result;
}


// ==================================================
// DECRYPT
// ==================================================

function decrypt(message, key) {

    let result = "";

    for (let i = 0; i < message.length; i++) {

        const encryptedValue =
            message.charCodeAt(i) - FIRST_CHAR;

        const keyValue =
            key.charCodeAt(i % key.length) - FIRST_CHAR;

        const decryptedValue =
            (encryptedValue - keyValue + CHAR_COUNT)
            % CHAR_COUNT;

        result += String.fromCharCode(
            decryptedValue + FIRST_CHAR
        );
    }

    return result;
}


// ==================================================
// EXECUTE
// ==================================================

executeButton.addEventListener("click", function () {

    const key = keyInput.value;
    const message = messageInput.value;

    // Check key
    if (key.length === 0) {

        alert("Please enter a secret key.");

        return;
    }


    // Check message
    if (message.length === 0) {

        alert("Please enter a message.");

        return;
    }


    // Check characters
    for (let i = 0; i < message.length; i++) {

        const code = message.charCodeAt(i);

        if (code < 32 || code > 126) {

            alert(
                "The message contains unsupported characters."
            );

            return;
        }
    }


    for (let i = 0; i < key.length; i++) {

        const code = key.charCodeAt(i);

        if (code < 32 || code > 126) {

            alert(
                "The key contains unsupported characters."
            );

            return;
        }
    }


    // Encrypt
    if (mode.value === "encrypt") {

        resultInput.value = encrypt(message, key);

        executeButton.textContent = "🔒 Encrypt";
    }


    // Decrypt
    else {

        resultInput.value = decrypt(message, key);

        executeButton.textContent = "🔓 Decrypt";
    }

});


// ==================================================
// MODE CHANGE
// ==================================================

mode.addEventListener("change", function () {

    if (mode.value === "encrypt") {

        executeButton.textContent = "🔒 Encrypt";

    } else {

        executeButton.textContent = "🔓 Decrypt";
    }

});


// ==================================================
// CLEAR
// ==================================================

clearButton.addEventListener("click", function () {

    keyInput.value = "";
    messageInput.value = "";
    resultInput.value = "";

});


// ==================================================
// COPY
// ==================================================

copyButton.addEventListener("click", async function () {

    if (resultInput.value.length === 0) {
        return;
    }

    await navigator.clipboard.writeText(
        resultInput.value
    );

    copyButton.textContent = "✅ Copied!";

    setTimeout(function () {

        copyButton.textContent = "📋 Copy";

    }, 1500);

});


// ==================================================
// SHOW / HIDE KEY
// ==================================================

showKeyButton.addEventListener("click", function () {

    if (keyInput.type === "password") {

        keyInput.type = "text";
        showKeyButton.textContent = "🙈";

    } else {

        keyInput.type = "password";
        showKeyButton.textContent = "👁️";

    }

});
