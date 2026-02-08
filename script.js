// --- CONFIGURATION ---
const testMode = false; // Set to FALSE for the real launch!
const startDate = new Date('2026-02-09T00:00:00');
const endDate = new Date('2026-03-06T23:59:59');
const today = testMode ? new Date('2026-03-06') : new Date();

// --- DATA ---
const dayData = [
    { quote: "“Be yourself; everyone else is already taken.” — Oscar Wilde", song: "No Matter How Far — Kyle Cox", joke: "Why don’t skeletons fight each other? They don’t have the guts." },
    { quote: "“Light tomorrow with today.” — Elizabeth Barrett Browning", song: "I Wanted to Say This — Kim Chang-Wan", joke: "What do you call fake spaghetti? An impasta." },
    { quote: "", song: "Girl from the Valley — Micah Edwards", joke: "Why did the scarecrow win an award? Because he was outstanding in his field." },
    { quote: "“Believe you can and you’re halfway there.” — Theodore Roosevelt", song: "Hot Stuff — Donna Summer", joke: "What do you call cheese that isn’t yours? Nacho cheese." },
    { quote: "", song: "Lovers Rock — Sade", joke: "Why couldn’t the bicycle stand up by itself? It was two-tired." },
    { quote: "“Keep your eyes on the stars, and your feet on the ground.” — Theodore Roosevelt", song: "Don’t Know Why — Norah Jones", joke: "How do you organize a space party? You planet." },
    { quote: "", song: "blue — yung kai", joke: "What do you call a fish wearing a bowtie? Sofishticated." },
    { quote: "“If you want to go fast, go alone. If you want to go far, go together.” — African Proverb", song: "Manhattanhenge — corner club", joke: "Why did the math book look sad? Because it had too many problems." },
    { quote: "", song: "Kiss Me — Sixpence None The Richer", joke: "Why don’t eggs tell jokes? They’d crack each other up." },
    { quote: "“The journey of a thousand miles begins with one step.” — Lao Tzu", song: "Put Your Records On — Corinne Bailey Rae", joke: "What do you call a factory that makes okay products? A satisfactory." },
    { quote: "", song: "Can’t Take My Eyes off You — Frankie Valli", joke: "How does a penguin build its house? Igloos it together." },
    { quote: "“Not all those who wander are lost.” — J.R.R. Tolkien", song: "Almost (Sweet Music) — Hozier", joke: "Why did the coffee file a police report? It got mugged." },
    { quote: "", song: "Ain’t No Mountain High Enough — Marvin Gaye, Tammi Terrell", joke: "What do you call an alligator in a vest? An investigator." },
    { quote: "“Courage is not the absence of fear, but the triumph over it.” — Nelson Mandela", song: "Isn’t She Lovely — Stevie Wonder", joke: "Why did the tomato turn red? Because it saw the salad dressing." },
    { quote: "", song: "You Make Loving Fun — Fleetwood Mac", joke: "What do you call a belt made of watches? A waist of time." },
    { quote: "“The best way to predict the future is to create it.” — Peter Drucker", song: "My Girl — The Temptations", joke: "How do you make a tissue dance? Put a little boogie in it." },
    { quote: "", song: "Lean on Me — Bill Withers", joke: "Why don’t scientists trust atoms? Because they make up everything." },
    { quote: "“It’s the job that’s never started as takes longest to finish.” — The Lord of the Rings", song: "The Sound — The 1975", joke: "What did one ocean say to the other ocean? Nothing, they just waved." },
    { quote: "", song: "London Time — OWALLOIL", joke: "Why was the math lecture so long? The professor kept going off on a tangent." },
    { quote: "웃음은 최고의 명약이다.", song: "All for You — Micah Edwards, Theo Juarez", joke: "What do you call a snowman with a six-pack? An abdominal snowman." },
    { quote: "", song: "Free Fallin' (Live) — John Mayer" },
    { quote: "시작이 반이다.", song: "You Make Me Feel So Young — Frank Sinatra" },
    { quote: "뜻이 있는 곳에 길이 있다.", song: "I Get A Kick Out Of You — Frank Sinatra" },
    { quote: "“Don’t worry about a thing, ’cause every little thing is gonna be all right.” — Bob Marley", song: "Three Little Birds — Bob Marley & The Wailers" },
    { quote: "“Let it be, let it be, let it be, let it be. Whisper words of wisdom, let it be.” — The Beatles", song: "And I Love Her — The Beatles" },
    { quote: "YOU DID IT! ❤️", song: "James at Rayleigh skatepark", yt: "https://www.youtube.com/watch?v=FqSj5i0N30U" }
];

// --- LOGIC: COUNTDOWN & DOORS ---

// Calculate days remaining for the header
const diffTime = endDate - today;
const daysRemaining = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
document.getElementById('days-left').innerText = daysRemaining;

// Calculate which doors are unlocked (starts at 0 if before Feb 9)
const doorsCurrentlyOpen = testMode ? 26 : Math.floor((today - startDate) / (1000 * 60 * 60 * 24)) + 1;

function checkPassword() {
    const input = document.getElementById('pass-input').value;
    if (input === "19.10.25") {
        document.getElementById('password-screen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('password-screen').style.display = 'none';
            document.getElementById('main-content').style.display = 'block';
        }, 500);
    } else {
        document.getElementById('error-msg').innerText = "Try again, my love! 🥺";
    }
}

// --- GRID SETUP ---
const grid = document.getElementById('grid');
for (let i = 1; i <= 26; i++) {
    const isReady = i <= doorsCurrentlyOpen;
    const btn = document.createElement('div');
    
    if (i === 26) {
        btn.className = `door-small finale ${isReady ? 'ready' : ''}`;
        btn.innerHTML = `<span style="display: flex; align-items: center; gap: 5px;">26 <img src="photos_countdown/youtube.jpg" class="yt-mini-icon"><span class="dots-hint">...</span></span>`;
    } else {
        btn.className = `door-small ${isReady ? 'ready' : ''}`;
        btn.innerText = i;
    }

    btn.onclick = () => {
        if (isReady) openDetail(i);
        else document.getElementById('modal').style.display = 'flex';
    };
    grid.appendChild(btn);
}

function openDetail(dayNum) {
    const data = dayData[dayNum - 1];
    document.getElementById('detail-front').innerText = dayNum;
    
    // Link logic
    const finalUrl = (dayNum === 26) ? data.yt : `https://www.google.com/search?q=spotify+${encodeURIComponent(data.song)}`;

    let cardContent = '';
    
    if (dayNum === 26) {
        // Finale Content (No photo/quote/joke)
        cardContent = `
            <h3 style="color:var(--dark-pink); font-size:1.8rem; margin-bottom: 15px;">Day 26</h3>
            <p style="font-size: 1.05rem; line-height: 1.5; margin-bottom: 25px; color: var(--text-color);">
                So proud of you baby, and congrats on finishing! You've worked so hard and you deserve to celebrate. ❤️
            </p>
            <p style="margin-bottom:15px;"><b>🎵 Special Video:</b><br>
                <a href="${finalUrl}" target="_blank" onclick="event.stopPropagation();" style="color:var(--dark-pink); font-weight:700; text-decoration:underline;">${data.song}</a>
            </p>
        `;
    } else {
        // Daily Content
        cardContent = `
            <h3 style="color:var(--dark-pink); font-size:1.6rem; margin:0;">Day ${dayNum}</h3>
            <span class="photo-label">Photo of the day:</span>
            <img src="photos_countdown/${dayNum}.jpg" class="daily-photo" onerror="if(this.src.indexOf('.jpg')!==-1)this.src='photos_countdown/${dayNum}.jpeg';">
            
            ${data.quote ? `<p style="font-size:0.8rem; margin: 8px 0; color: var(--text-color);"><b>Quote:</b><br>${data.quote}</p>` : ''}
            
            ${data.joke ? `
                <span class="joke-label">Bad joke of the day</span>
                <p class="joke-text">${data.joke}</p>
            ` : ''}

            <p style="margin-top:10px; font-size:0.9rem; color: var(--text-color);"><b>🎵 Song:</b><br>
                <a href="${finalUrl}" target="_blank" onclick="event.stopPropagation();" style="color:var(--dark-pink); font-weight:700; text-decoration:underline;">${data.song}</a>
            </p>
        `;
    }

    document.getElementById('detail-back').innerHTML = `
        ${cardContent}
        <button onclick="closeFocus()" style="background:var(--primary-pink); border:none; color:white; padding:8px 15px; border-radius:10px; cursor:pointer; font-family:'Fredoka'; margin-top: 10px;">Close</button>
    `;

    document.getElementById('overlay').style.display = 'block';
    const card = document.getElementById('detail-card');
    card.style.display = 'block';
    
    setTimeout(() => {
        card.classList.add('active');
        document.getElementById('card-inner').classList.add('flipped');
    }, 50);

    confetti({ 
        particleCount: dayNum === 26 ? 400 : 100, 
        spread: 80, 
        origin: { y: 0.6 } 
    });
}

function closeFocus() {
    document.getElementById('card-inner').classList.remove('flipped');
    document.getElementById('detail-card').classList.remove('active');
    setTimeout(() => {
        document.getElementById('detail-card').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
    }, 400);
}

function openLetter() { document.getElementById('letter-overlay').style.display = 'flex'; }
function closeLetter() { document.getElementById('letter-overlay').style.display = 'none'; }
function closeModal() { document.getElementById('modal').style.display = 'none'; }