
let running = false;

function generateUsername() {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let username = '';
    for (let i = 0; i < 5; i++) {
        username += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return username;
}

async function checkUsernameAvailability(username) {
    try {
        const res = await fetch(`https://www.tiktok.com/@${username}`, { method: "HEAD" });
        return res.status === 404;
    } catch {
        return false;
    }
}

async function sendToTelegram(token, chatId, username) {
    const msg = `يوزر متاح: @${username}`;
    await fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(msg)}`);
}

async function startChecking() {
    const token = document.getElementById("token").value.trim();
    const chatId = document.getElementById("chatid").value.trim();
    const resultList = document.getElementById("results");

    if (!token || !chatId) {
        alert("يرجى إدخال التوكن والآيدي");
        return;
    }

    running = true;

    while (running) {
        const username = generateUsername();
        const available = await checkUsernameAvailability(username);

        const item = document.createElement("li");
        item.textContent = `@${username} => ${available ? "متاح" : "مستخدم"}`;
        resultList.appendChild(item);

        if (available) {
            await sendToTelegram(token, chatId, username);
        }

        await new Promise(resolve => setTimeout(resolve, 1000)); // تأخير بسيط
    }
}
