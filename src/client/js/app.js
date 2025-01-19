const isValidURL = (url) => {
  const regex = /^(https?:\/\/[^\s$.?#].[^\s]*)$/;
  return regex.test(url);
};

document.getElementById('text-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const textInput = document.getElementById('text-input').value;
  const resultsSection = document.getElementById('results');

  // تحقق من أن الإدخال غير فارغ
  if (!textInput) {
    resultsSection.innerHTML = `
      <h2>Error:</h2>
      <p>Please enter a URL.</p>
    `;
    return;
  }

  // تحقق من صحة الرابط باستخدام التعبير العادي
  if (!isValidURL(textInput)) {
    resultsSection.innerHTML = `
      <h2>Error:</h2>
      <p>Please enter a valid URL.</p>
    `;
    return;
  }

  try {
    // استعلام API للحصول على المفتاح
    const response = await fetch('http://localhost:3001/key');
    const { key } = await response.json();

    resultsSection.innerHTML = `
      <h2>Form Results:</h2>
      <p>Key: ${key}</p>
      <p>Input: ${textInput}</p>
    `;
  } catch (error) {
    resultsSection.innerHTML = `
      <h2>Error:</h2>
      <p>Could not fetch the API key. Please try again later.</p>
    `;
  }
});
