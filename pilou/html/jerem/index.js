const encodeInput = document.getElementById("encodeInput");
const encodeKey = document.getElementById("encodeKey");
const encodeOutput = document.getElementById("encodeOutput");
var encodeText = encodeInput.value;
var encodeKeyText = encodeKey.value;
encodeInput.addEventListener("input", async () => {
  encodeText = encodeInput.value;
  if (encodeText && encodeKeyText) {
    let key = await deriveKey(encodeKeyText);
    encodeOutput.textContent = await encryptAES(encodeText, key);
  } else {
    encodeOutput.textContent = encodeText ? "Mettre la clé" : "Mettre le texte";
  }
});
encodeKey.addEventListener("input", async () => {
  encodeKeyText = encodeKey.value;
  if (encodeText && encodeKeyText) {
    let key = await deriveKey(encodeKeyText);
    encodeOutput.textContent = await encryptAES(encodeText, key);
  } else {
    encodeOutput.textContent = encodeText ? "Mettre la clé" : "Mettre le texte";
  }
});

const decodeInput = document.getElementById("decodeInput");
const decodeKey = document.getElementById("decodeKey");
const decodeOutput = document.getElementById("decodeOutput");
var decodeText = decodeInput.value;
var decodeKeyText = decodeKey.value;
decodeInput.addEventListener("input", async () => {
  decodeText = decodeInput.value;
  if (decodeText && decodeKeyText) {
    let key = await deriveKey(decodeKeyText);
    decodeOutput.textContent = await decryptAES(decodeText, key);
  } else {
    decodeOutput.textContent = decodeText ? "Mettre la clé" : "Mettre le texte";
  }
});
decodeKey.addEventListener("input", async () => {
  decodeKeyText = decodeKey.value;
  if (decodeText && decodeKeyText) {
    let key = await deriveKey(decodeKeyText);
    decodeOutput.textContent = await decryptAES(decodeText, key);
  } else {
    decodeOutput.textContent = decodeText ? "Mettre la clé" : "Mettre le texte";
  }
});

const encodeToggleButton = document.getElementById("encodeToggleButton");
const encodeIcon = document.getElementById("encodeIcon");
let encodeToggled = true;

encodeToggleButton.addEventListener("click", () => {
  encodeKey.type = encodeToggled ? "password" : "text";
  if (encodeToggled) {
    encodeIcon.innerHTML = `
	<g fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
		<path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
		<path d="M16.681 16.673A8.7 8.7 0 0 1 12 18q-5.4 0-9-6q1.908-3.18 4.32-4.674m2.86-1.146A9 9 0 0 1 12 6q5.4 0 9 6q-1 1.665-2.138 2.87M3 3l18 18" />
	</g>`;
  } else {
    encodeIcon.innerHTML = `    <g
        fill="none"
        stroke="#000"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
    >
        <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0-4 0" />
        <path
            d="M21 12q-3.6 6-9 6t-9-6q3.6-6 9-6t9 6"
        />
    </g>`;
  }
  encodeToggled = !encodeToggled;
});

const decodeToggleButton = document.getElementById("decodeToggleButton");
const decodeIcon = document.getElementById("decodeIcon");
let decodeToggled = true;

decodeToggleButton.addEventListener("click", () => {
  decodeKey.type = decodeToggled ? "password" : "text";
  if (decodeToggled) {
    decodeIcon.innerHTML = `
	<g fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
		<path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
		<path d="M16.681 16.673A8.7 8.7 0 0 1 12 18q-5.4 0-9-6q1.908-3.18 4.32-4.674m2.86-1.146A9 9 0 0 1 12 6q5.4 0 9 6q-1 1.665-2.138 2.87M3 3l18 18" />
	</g>`;
  } else {
    decodeIcon.innerHTML = `    <g
        fill="none"
        stroke="#000"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
    >
        <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0-4 0" />
        <path
            d="M21 12q-3.6 6-9 6t-9-6q3.6-6 9-6t9 6"
        />
    </g>`;
  }
  decodeToggled = !decodeToggled;
});

async function deriveKey(key) {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(key),
    { name: "PBKDF2" },
    false,
    ["deriveBits", "deriveKey"],
  );

  return await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: new Uint8Array(0),
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"],
  );
}

async function encryptAES(text, key) {
  const encoder = new TextEncoder();

  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv: new Uint8Array(12) },
    key,
    encoder.encode(text),
  );

  return btoa(String.fromCharCode(...new Uint8Array(encrypted)));
}

async function decryptAES(encryptedText, key) {
  const decoder = new TextDecoder();
  const encryptedArray = Uint8Array.from(atob(encryptedText), (c) =>
    c.charCodeAt(0),
  );

  try {
    const decrypted = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: new Uint8Array(12) },
      key,
      encryptedArray,
    );
    return decoder.decode(decrypted);
  } catch (error) {
    console.error("Erreur de déchiffrement :", error);
    return "Clé incorrecte ou texte corrompu";
  }
}
