const regexPattern = document.getElementById("pattern");
const stringToTest = document.getElementById("test-string");
const testButton = document.getElementById("test-btn");
const testResult = document.getElementById("result");
const caseInsensitiveFlag = document.getElementById("i");
const globalFlag = document.getElementById("g");

function getFlags() {
  let flags = '';
  if (caseInsensitiveFlag.checked) flags += 'i';
  if (globalFlag.checked) flags += 'g';
  return flags;
}

testButton.addEventListener("click", () => {
  const pattern = regexPattern.value;
  const flags = getFlags();
  const originalText = stringToTest.textContent;

  let regex;
  try {
    regex = new RegExp(pattern, flags);
  } catch (e) {
    testResult.textContent = "Invalid pattern";
    return;
  }

  const matchResults = originalText.match(regex);

  if (!matchResults) {
    testResult.textContent = "no match";
    stringToTest.innerHTML = originalText; // Leave it unmodified
    return;
  }

  const matches = globalFlag.checked
    ? [...originalText.matchAll(regex)]
    : [{ 0: matchResults[0], index: originalText.search(regex) }];

  const matchTexts = matches.map(m => m[0]);
  testResult.textContent = matchTexts.join(", ");

  // Highlight matched parts
  let resultHTML = "";
  let lastIndex = 0;

  for (const match of matches) {
    const start = match.index;
    const end = start + match[0].length;
    resultHTML += originalText.slice(lastIndex, start);
    resultHTML += `<span class="highlight">${match[0]}</span>`;
    lastIndex = end;
  }

  resultHTML += originalText.slice(lastIndex);
  stringToTest.innerHTML = resultHTML;
});
