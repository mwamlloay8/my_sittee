
function generateUsername() {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  while (result.length < 5) {
    const c = chars[Math.floor(Math.random() * chars.length)];
    if (!result.endsWith(c)) result += c;
  }
  return result;
}

async function checkUsernameAvailability(username) {
  try {
    const res = await fetch(`https://cors-anywhere.herokuapp.com/https://www.tiktok.com/@${username}`, {
      method: 'GET'
    });
    return res.status === 404;
  } catch (e) {
    return false;
  }
}

async function startGenerating() {
  const token = document.getElementById('botToken').value;
  const chatId = document.getElementById('chatId').value;
  const results = document.getElementById('results');
  results.innerHTML = '...جارِ التوليد<br>';

  for (let i = 0; i < 20; i++) {
    const username = generateUsername();
    const available = await checkUsernameAvailability(username);
    if (available) {
      results.innerHTML += `<p>متاح: @${username}</p>`;
      fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=متاح: @${username}`);
    } else {
      results.innerHTML += `<p>مستخدم: @${username}</p>`;
    }
  }
}
