let inputLang = "EN"; // 초기값
let outputLang = "KO"; // 초기값
let checkLang = "영어";
let checkLang2 = "한국어";

function translate() {
const inputText = document.getElementById("input-text").value;

const url = "https://api-free.deepl.com/v2/translate";
const params = new URLSearchParams({
    auth_key: "{DeepL api key}", // auth_key: 'DeepL api key가 들어감'
    // key 유출 방지를 위해 윗 부분 삭제하고 업로드
    text: inputText,
    source_lang: inputLang,
    target_lang: outputLang
});

fetch(`${url}?${params.toString()}`).then((response) => response.json()).then((data) => {
    document.getElementById("output-text").value = data.translations[0].text;}).catch((error) => {
    console.error("Error:", error);
    });
}

document.getElementById("translate-btn").addEventListener("click", translate);

document.getElementById("copy-btn").addEventListener("click", () => {
const outputText = document.getElementById("output-text");
outputText.select();
document.execCommand("copy");
});

document.getElementById("clear-btn").addEventListener("click", () => {
document.getElementById("input-text").value = "";
document.getElementById("output-text").value = "";
});

document.getElementById("toggle-lang-btn").addEventListener("click", () => {
if (inputLang === "EN") {
    inputLang = "KO";
    outputLang = "EN";
    checkLang = "한국어";
    checkLang2 = "영어";
} else if (inputLang === "KO") {
    inputLang = "EN";
    outputLang = "KO";
    checkLang = "영어";
    checkLang2 = "한국어";
}
document.getElementById("toggle-lang-btn").textContent = outputLang + " -> " + inputLang;
document.getElementById("input-text").placeholder = `변환할 ${checkLang} 단어/문장을 입력하세요`;
document.getElementById("output-text").placeholder = `번역된 ${checkLang2} 단어/문장이 표시됩니다`;
document.getElementById("clear-btn").click();
});

document.getElementById("input-text").addEventListener("keypress", (event) => {
if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    translate();
}
});

document.getElementById("help-btn").addEventListener("click", () => {
document.getElementById("help-popup").style.display = "block";
});

document.getElementById("close-popup-btn").addEventListener("click", () => {
document.getElementById("help-popup").style.display = "none";
});