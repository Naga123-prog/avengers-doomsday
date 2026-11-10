/* =============================================
   AVENGERS: DOOMSDAY — App v2
   Release: 18 Desember 2026
   ============================================= */

const IMG = "https://image.tmdb.org/t/p/w500";
const API_URL = window.location.hostname === "localhost" ? "http://localhost:3001" : "https://avengers-doomsday-api.onrender.com";
let socket = null;

const CAST = [
    // ── AVENGERS ──
    { name: "Captain America", real: "Steve Rogers", actor: "Chris Evans", team: "avenger",
      img: "/3bOGNsHlrswhyW79uvIHH1V43JI.jpg", icon: "fa-shield-halved", clr: "#64b5f6",
      desc: "The First Avenger kembali! Super soldier dengan perisai vibranium yang menjadi simbol harapan umat manusia.",
      powers: ["Perisai Vibranium","Super Soldier","Taktik Militer","Kepemimpinan"] },

    { name: "Thor", real: "Thor Odinson", actor: "Chris Hemsworth", team: "avenger",
      img: "/piQGdoIQOF3C1EI5cbYZLAW1gfj.jpg", icon: "fa-bolt", clr: "#64b5f6",
      desc: "Dewa Petir Asgard. Pembawa Stormbreaker dengan kekuatan kosmik yang tak tertandingi.",
      powers: ["Petir","Stormbreaker","Dewa Asgard","Terbang"] },

    { name: "Hulk", real: "Bruce Banner", actor: "Mark Ruffalo", team: "avenger",
      img: "/5GilHMOt5PAQh6rlUKZzGmaKEI7.jpg", icon: "fa-hand-fist", clr: "#66bb6a",
      desc: "Smart Hulk — kombinasi otak Banner dan kekuatan Hulk. Kekuatan yang hampir tak terbatas.",
      powers: ["Super Strength","Regenerasi","Tahan Banting","Kecerdasan"] },

    { name: "Doctor Strange", real: "Stephen Strange", actor: "Benedict Cumberbatch", team: "avenger",
      img: "/wz3MRiMmoz6b5X3oSzMRC9nLxY1.jpg", icon: "fa-eye", clr: "#ce93d8",
      desc: "Sorcerer Supreme. Penjaga realitas dengan kekuatan mistik lintas dimensi.",
      powers: ["Sihir Mistik","Portal Dimensi","Time Magic","Astral Form"] },

    { name: "Spider-Man", real: "Peter Parker", actor: "Tom Holland", team: "avenger",
      img: "/xKBAaPIa1c7tzZD3Y0MhBLv4hPE.jpg", icon: "fa-spider", clr: "#ef5350",
      desc: "Friendly Neighborhood Spider-Man. Spider-Sense dan teknologi membuat musuh tak berdaya.",
      powers: ["Spider-Sense","Jaring","Wall-Crawling","Super Agility"] },

    { name: "Winter Soldier", real: "Bucky Barnes", actor: "Sebastian Stan", team: "avenger",
      img: "/v20RLWst39klatsqUgSrwHxhwee.jpg", icon: "fa-crosshairs", clr: "#90a4ae",
      desc: "De facto leader New Avengers. Super soldier dengan lengan vibranium dan keahlian tempur mematikan.",
      powers: ["Lengan Vibranium","Super Soldier","Marksman","Stealth"] },

    { name: "Falcon", real: "Joaquin Torres", actor: "Danny Ramirez", team: "avenger",
      img: "/7ZvcfWA5O5ULiupbHZtGGEPwnpI.jpg", icon: "fa-dove", clr: "#ef9a9a",
      desc: "Penerus sayap Falcon dari Sam Wilson. Pilot tempur Air Force yang lincah di udara.",
      powers: ["Sayap Falcon","Terbang","Pilot Tempur","Redwing Drone"] },

    { name: "Black Panther", real: "Shuri", actor: "Letitia Wright", team: "avenger",
      img: "/f7PevpEeBqwzACPhoZ8K3ktrKvE.jpg", icon: "fa-paw", clr: "#b39ddb",
      desc: "Ratu Wakanda dan Black Panther baru. Jenius teknologi dengan kekuatan Heart-Shaped Herb.",
      powers: ["Vibranium Suit","Super Agility","Teknologi Canggih","Martial Arts"] },

    { name: "Shang-Chi", real: "Xu Shang-Chi", actor: "Simu Liu", team: "avenger",
      img: "/cCx2OghLj9KN73oyRZe92i2p3Ih.jpg", icon: "fa-yin-yang", clr: "#ffab91",
      desc: "Master seni bela diri. Penguasa Ten Rings legendaris dengan kekuatan kosmik kuno.",
      powers: ["Ten Rings","Martial Arts","Chi Energy","Super Agility"] },

    { name: "U.S. Agent", real: "John Walker", actor: "Wyatt Russell", team: "avenger",
      img: "/zIldBzXdBWskPZB7x35G2hYEVDo.jpg", icon: "fa-shield", clr: "#64b5f6",
      desc: "Super soldier kontroversial. Kekuatan serum dan pelatihan militer menjadikannya petarung brutal.",
      powers: ["Super Soldier","Perisai","Combat Training","Ketahanan"] },

    { name: "Sentry", real: "Bob Reynolds", actor: "Lewis Pullman", team: "avenger",
      img: "/i2wJQ2eaVuTPaA84jzxNtxs54mO.jpg", icon: "fa-sun", clr: "#ffd54f",
      desc: "Pahlawan dengan kekuatan satu juta matahari. Salah satu makhluk terkuat di Marvel Universe.",
      powers: ["Power of Sun","Terbang","Invulnerable","Molecular Control"] },

    { name: "Red Guardian", real: "Alexei Shostakov", actor: "David Harbour", team: "avenger",
      img: "/qMFtMWlYVtFVyBoBhX5IoA5sN5a.jpg", icon: "fa-star", clr: "#ef5350",
      desc: "Super soldier Rusia. Captain America versi Soviet dengan pengalaman tempur puluhan tahun.",
      powers: ["Super Soldier","Perisai","Kekuatan Fisik","Pengalaman Tempur"] },

    { name: "Ghost", real: "Ava Starr", actor: "Hannah John-Kamen", team: "avenger",
      img: "/2fqNQQW3B7upH4rBubhxXkIIoGk.jpg", icon: "fa-ghost", clr: "#bdbdbd",
      desc: "Bisa menembus materi padat. Kemampuan phase-shifting membuatnya hampir mustahil ditangkap.",
      powers: ["Phase-Shifting","Intangibility","Stealth","Combat"] },

    { name: "Cassie Lang", real: "Cassie Lang", actor: "Kathryn Newton", team: "avenger",
      img: "/3mos4oK6bps0uhQzW1L7nj5O0Gd.jpg", icon: "fa-minimize", clr: "#f48fb1",
      desc: "Putri Scott Lang. Stature — pahlawan muda dengan teknologi Pym Particles seperti ayahnya.",
      powers: ["Pym Particles","Membesar","Mengecil","Combat Training"] },

    // ── FANTASTIC FOUR ──
    { name: "Mr. Fantastic", real: "Reed Richards", actor: "Pedro Pascal", team: "f4",
      img: "/oKcMbVn0NJTNzQt0ClKKvVXkm60.jpg", icon: "fa-infinity", clr: "#90caf9",
      desc: "Pemimpin Fantastic Four. Ilmuwan paling jenius di Bumi dengan tubuh super elastis.",
      powers: ["Elastisitas","Super Genius","Inventor","Kepemimpinan"] },

    { name: "Invisible Woman", real: "Sue Storm", actor: "Vanessa Kirby", team: "f4",
      img: "/a8a9U00KL2JJkkekzhNnueIGKKF.jpg", icon: "fa-eye-slash", clr: "#90caf9",
      desc: "Anggota terkuat Fantastic Four. Force field dan invisibilitas menjadikannya aset vital.",
      powers: ["Invisibility","Force Fields","Proyeksi Energi","Telekinesis"] },

    { name: "Human Torch", real: "Johnny Storm", actor: "Joseph Quinn", team: "f4",
      img: "/zshhuioZaH8S5ZKdMcojzWi1ntl.jpg", icon: "fa-fire", clr: "#ff9800",
      desc: "Si manusia api. Bisa menyelimuti tubuh dengan api dan terbang dengan kecepatan luar biasa.",
      powers: ["Pyrokinesis","Terbang","Nova Flame","Tahan Panas"] },

    { name: "The Thing", real: "Ben Grimm", actor: "Ebon Moss-Bachrach", team: "f4",
      img: "/xD8GVNayMpiTZxLfahy2DseYcQq.jpg", icon: "fa-mountain", clr: "#bcaaa4",
      desc: "It's clobberin' time! Pria batu terkuat dengan kekuatan luar biasa dan ketahanan baja.",
      powers: ["Super Strength","Kulit Batu","Tahan Banting","Petarung Ulung"] },

    // ── X-MEN ──
    { name: "Wolverine", real: "Logan", actor: "Hugh Jackman", team: "xmen",
      img: "/4Xujtewxqt6aU0Y81tsS9gkjizk.jpg", icon: "fa-paw", clr: "#fdd835",
      desc: "Mutan dengan cakar adamantium dan faktor penyembuhan. Petarung paling ganas di dunia.",
      powers: ["Cakar Adamantium","Regenerasi","Super Senses","Berserker Rage"] },

    { name: "Deadpool", real: "Wade Wilson", actor: "Ryan Reynolds", team: "xmen",
      img: "/trzgptffGvAlAT6MEu01fz47cLW.jpg", icon: "fa-face-grin-tongue-wink", clr: "#ef5350",
      desc: "Merc with a Mouth. Regenerasi mutlak, senjata, dan humor yang merusak fourth wall.",
      powers: ["Regenerasi","Swordsman","Marksman","Fourth Wall Break"] },

    { name: "Professor X", real: "Charles Xavier", actor: "Patrick Stewart", team: "xmen",
      img: "/ufqtnLh3JJjPbEgxEag3MM5nZyv.jpg", icon: "fa-brain", clr: "#90caf9",
      desc: "Telepat terkuat di Bumi. Pendiri X-Men dan pejuang kesetaraan mutan-manusia.",
      powers: ["Telepati","Cerebro","Mind Control","Astral Projection"] },

    { name: "Magneto", real: "Erik Lehnsherr", actor: "Ian McKellen", team: "xmen",
      img: "/5cnnnpnJG6TiYUSS7qgJheUZgnv.jpg", icon: "fa-magnet", clr: "#ce93d8",
      desc: "Master of Magnetism. Mengendalikan semua logam dengan pikiran — sahabat sekaligus rival Xavier.",
      powers: ["Magnetokinesis","Terbang","Force Field","Kontrol Logam"] },

    { name: "Cyclops", real: "Scott Summers", actor: "James Marsden", team: "xmen",
      img: "/lf7OnfKZnMgNh9b98764tqSocGK.jpg", icon: "fa-glasses", clr: "#ef5350",
      desc: "Pemimpin lapangan X-Men. Sinar optik destruktif yang bisa menghancurkan bangunan.",
      powers: ["Optic Blast","Taktik Militer","Kepemimpinan","Martial Arts"] },

    { name: "Beast", real: "Hank McCoy", actor: "Kelsey Grammer", team: "xmen",
      img: "/qn38jJHEqRBsj50Gqo2uM38fgJx.jpg", icon: "fa-dna", clr: "#64b5f6",
      desc: "Jenius dan atlet mutan. Kekuatan fisik besar dikombinasi kecerdasan tingkat doktor.",
      powers: ["Super Strength","Agility","Kecerdasan","Senses"] },

    { name: "Nightcrawler", real: "Kurt Wagner", actor: "Alan Cumming", team: "xmen",
      img: "/axil8ufunARfqyU4ceZNh36fkVQ.jpg", icon: "fa-bolt-lightning", clr: "#b39ddb",
      desc: "Mutan teleporter. Bisa berpindah tempat seketika dengan 'BAMF!' yang khas.",
      powers: ["Teleportasi","Agility","Wall-Crawling","Stealth"] },

    { name: "Mystique", real: "Raven Darkhölme", actor: "Rebecca Romijn", team: "xmen",
      img: "/doqFBHNbNhoLF9RX9SYPqwu1mvd.jpg", icon: "fa-masks-theater", clr: "#64b5f6",
      desc: "Shapeshifter sempurna. Bisa meniru siapa saja — wajah, suara, bahkan sidik jari.",
      powers: ["Shapeshifting","Ageless","Combat Master","Infiltrasi"] },

    { name: "Gambit", real: "Remy LeBeau", actor: "Channing Tatum", team: "xmen",
      img: "/4TpgnS6l8YUXSne9Av9nda6mjxY.jpg", icon: "fa-diamond", clr: "#f48fb1",
      desc: "Cajun charmer. Mengisi benda dengan energi kinetik explosif — kartu remi adalah senjata mematikan.",
      powers: ["Energi Kinetik","Kartu Remi","Tongkat Bo","Hypnotic Charm"] },

    // ── COSMIC / LAINNYA ──
    { name: "Loki", real: "Loki Laufeyson", actor: "Tom Hiddleston", team: "cosmic",
      img: "/mclHxMm8aPlCPKptP67257F5GPo.jpg", icon: "fa-hat-wizard", clr: "#81c784",
      desc: "Dewa Tipu Daya Asgard. Setelah mengorbankan diri untuk timeline, ia kembali dengan misi baru.",
      powers: ["Ilusi","Sihir Asgard","Shapeshifting","Taktik Cerdas"] },

    { name: "Namor", real: "K'uk'ulkan", actor: "Tenoch Huerta", team: "cosmic",
      img: "/x0Wy85CZu887ZQMWrjj4vVulczM.jpg", icon: "fa-water", clr: "#4dd0e1",
      desc: "Raja Talokan. Penguasa kerajaan bawah laut dengan kekuatan dewa dan kemampuan terbang.",
      powers: ["Super Strength","Terbang","Aquatic","Kekuatan Dewa"] },

    { name: "M'Baku", real: "M'Baku", actor: "Winston Duke", team: "cosmic",
      img: "/MhBiZbryibwuoEtPL9Ns8pYHC1.jpg", icon: "fa-mountain-sun", clr: "#a1887f",
      desc: "Raja Wakanda dan pemimpin suku Jabari. Petarung tangguh dengan kekuatan dan kebijaksanaan.",
      powers: ["Super Strength","Pemimpin Jabari","Petarung","Kebijaksanaan"] },

    { name: "Peggy Carter", real: "Peggy Carter", actor: "Hayley Atwell", team: "cosmic",
      img: "/x57wXHexIjD2ywly9cRA4rov7cu.jpg", icon: "fa-user-secret", clr: "#f48fb1",
      desc: "Agen militer legendaris. Kembali dari timeline lain untuk misi kritis melawan Doom.",
      powers: ["Combat Training","Strategi Militer","Kepemimpinan","Keberanian"] },

    { name: "Mobius", real: "Mobius M. Mobius", actor: "Owen Wilson", team: "cosmic",
      img: "/5A46lNOwmpX77jAdhyKxU7e2Hub.jpg", icon: "fa-clock-rotate-left", clr: "#ffb74d",
      desc: "Analis TVA (Time Variance Authority). Ahli timeline dan varian yang kini membantu Avengers.",
      powers: ["Pengetahuan TVA","Analisis Waktu","TemPad","Diplomasi"] },

    { name: "Attuma", real: "Attuma", actor: "Alex Livinalli", team: "cosmic",
      img: "/kcPcUfbPMiuNfY3Ox48lXc50NHS.jpg", icon: "fa-anchor", clr: "#4db6ac",
      desc: "Prajurit terkuat Talokan. Kekuatan bawah laut yang mematikan di darat maupun air.",
      powers: ["Super Strength","Aquatic","Pertahanan","Warrior"] },

    { name: "Namora", real: "Namora", actor: "Mabel Cadena", team: "cosmic",
      img: "/z0kAf1LBESLPj4zUaXSngKH7cwg.jpg", icon: "fa-droplet", clr: "#80deea",
      desc: "Prajurit elite Talokan dan sepupu Namor. Petarung lincah dengan kekuatan laut.",
      powers: ["Aquatic","Super Strength","Agility","Combat"] },
];

// ─── INITIALIZATION ─────────────────────────

document.addEventListener("DOMContentLoaded", () => {
    initLoader();
    initParticles();
    initNavigation();
    initCountdown();
    renderCast();
    initCastFilter();
    initCastSearch();
    initScrollReveal();
    initVillainStats();
    initBackToTop();
    initScrollProgress();
    initTrailerModal();
    initSound();
    initShare();
    initGallery();
    initQuiz();
    initEasterEgg();
    initParallax();
    initBackend();
});

// ─── LOADER ─────────────────────────────────

function initLoader() {
    document.body.style.overflow = "hidden";
    setTimeout(() => {
        document.getElementById("loader").classList.add("hidden");
        document.body.style.overflow = "";
    }, 2800);
}

// ─── GREEN PARTICLE SYSTEM ──────────────────

function initParticles() {
    const c = document.getElementById("particles");
    const ctx = c.getContext("2d");
    let pts = [];

    function resize() { c.width = innerWidth; c.height = innerHeight; }
    resize();
    addEventListener("resize", resize);

    class P {
        constructor() { this.init(); }
        init() {
            this.x = Math.random() * c.width;
            this.y = Math.random() * c.height;
            this.r = Math.random() * 1.8 + 0.4;
            this.vx = (Math.random() - 0.5) * 0.25;
            this.vy = Math.random() * -0.4 - 0.08;
            this.a = Math.random() * 0.4 + 0.08;
            this.fade = Math.random() * 0.004 + 0.001;
            this.h = 125 + Math.random() * 15;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.a -= this.fade;
            if (this.a <= 0 || this.y < -5) { this.init(); this.y = c.height + 5; this.a = Math.random() * 0.4 + 0.08; }
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${this.h},100%,50%,${this.a})`;
            ctx.fill();
            if (this.r > 1) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r * 3, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${this.h},100%,50%,${this.a * 0.12})`;
                ctx.fill();
            }
        }
    }

    const n = Math.min(70, Math.floor(innerWidth / 18));
    for (let i = 0; i < n; i++) pts.push(new P());

    (function loop() {
        ctx.clearRect(0, 0, c.width, c.height);
        for (let i = 0; i < pts.length; i++) {
            for (let j = i + 1; j < pts.length; j++) {
                const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
                const d = Math.sqrt(dx * dx + dy * dy);
                if (d < 110) {
                    ctx.beginPath();
                    ctx.moveTo(pts[i].x, pts[i].y);
                    ctx.lineTo(pts[j].x, pts[j].y);
                    ctx.strokeStyle = `rgba(0,255,65,${(1 - d / 110) * 0.08 * Math.min(pts[i].a, pts[j].a)})`;
                    ctx.lineWidth = 0.4;
                    ctx.stroke();
                }
            }
        }
        pts.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(loop);
    })();
}

// ─── NAVIGATION ─────────────────────────────

function initNavigation() {
    const nav = document.getElementById("navbar");
    const tog = document.getElementById("navToggle");
    const menu = document.querySelector(".nav-links");
    const links = document.querySelectorAll(".nav-links a");

    addEventListener("scroll", () => {
        nav.classList.toggle("scrolled", scrollY > 50);
        updateActive();
    });

    tog.addEventListener("click", () => {
        tog.classList.toggle("active");
        menu.classList.toggle("open");
    });

    links.forEach(l => l.addEventListener("click", () => {
        tog.classList.remove("active");
        menu.classList.remove("open");
    }));

    function updateActive() {
        let cur = "";
        document.querySelectorAll("section").forEach(s => {
            if (scrollY >= s.offsetTop - 150) cur = s.id;
        });
        links.forEach(l => {
            l.classList.toggle("active", l.dataset.section === cur);
        });
    }
}

// ─── COUNTDOWN — 18 DES 2026 ───────────────

function initCountdown() {
    const target = new Date("2026-12-18T00:00:00+07:00").getTime();
    const circ = 2 * Math.PI * 54;

    function tick() {
        const diff = target - Date.now();
        if (diff <= 0) return;

        const d = Math.floor(diff / 864e5);
        const h = Math.floor((diff % 864e5) / 36e5);
        const m = Math.floor((diff % 36e5) / 6e4);
        const s = Math.floor((diff % 6e4) / 1e3);

        setValue("days", d);
        setValue("hours", h);
        setValue("minutes", m);
        setValue("seconds", s);

        setRing("days-ring", d, 365);
        setRing("hours-ring", h, 24);
        setRing("minutes-ring", m, 60);
        setRing("seconds-ring", s, 60);
    }

    function setValue(id, v) {
        const el = document.getElementById(id);
        const str = String(v).padStart(2, "0");
        if (el.textContent !== str) {
            el.style.transform = "scale(1.08)";
            el.textContent = str;
            setTimeout(() => el.style.transform = "scale(1)", 150);
        }
    }

    function setRing(id, v, max) {
        const el = document.getElementById(id);
        if (el) el.style.strokeDashoffset = circ * (1 - v / max);
    }

    tick();
    setInterval(tick, 1000);
}

// ─── CAST CARDS ─────────────────────────────

function renderCast() {
    const grid = document.getElementById("castGrid");
    grid.innerHTML = "";

    CAST.forEach((c, i) => {
        const card = document.createElement("div");
        card.className = "cast-card reveal-up";
        card.dataset.team = c.team;
        card.dataset.name = `${c.name} ${c.real} ${c.actor}`.toLowerCase();
        card.style.transitionDelay = `${Math.min(i * 0.03, 0.6)}s`;

        const photoUrl = c.img ? IMG + c.img : "";
        card.innerHTML = `
            <div class="cast-card-inner">
                <div class="cast-front" style="background:#111">
                    ${photoUrl ? `<img src="${photoUrl}" alt="${c.name}" class="cast-photo" loading="lazy">` : ""}
                    <div class="cast-team-tag" style="color:${c.clr}">${teamLabel(c.team)}</div>
                    <div class="cast-icon-corner" style="color:${c.clr}"><i class="fas ${c.icon}"></i></div>
                    <h3>${c.name}</h3>
                    <span class="c-real">${c.real}</span>
                    <span class="c-actor"><i class="fas fa-star" style="font-size:9px"></i> ${c.actor}</span>
                </div>
                <div class="cast-back">
                    ${photoUrl ? `<img src="${photoUrl}" alt="${c.actor}" class="cast-back-photo" loading="lazy">` : ""}
                    <div class="cast-back-content">
                        <h3><i class="fas ${c.icon}"></i> ${c.name}</h3>
                        <p class="cast-back-actor">${c.actor}</p>
                        <p>${c.desc}</p>
                        <div class="cast-powers">${c.powers.map(p => `<span class="pwr-tag">${p}</span>`).join("")}</div>
                    </div>
                    <span class="flip-back">Klik untuk kembali</span>
                </div>
            </div>`;

        card.addEventListener("click", () => card.classList.toggle("flipped"));

        card.addEventListener("mousemove", (e) => {
            if (card.classList.contains("flipped")) return;
            const r = card.getBoundingClientRect();
            const rx = ((e.clientY - r.top) / r.height - 0.5) * -10;
            const ry = ((e.clientX - r.left) / r.width - 0.5) * 10;
            card.querySelector(".cast-card-inner").style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
        });

        card.addEventListener("mouseleave", () => {
            if (!card.classList.contains("flipped"))
                card.querySelector(".cast-card-inner").style.transform = "";
        });

        grid.appendChild(card);
    });
}

function teamLabel(t) {
    return { avenger: "AVENGER", f4: "FANTASTIC 4", xmen: "X-MEN", cosmic: "COSMIC" }[t] || t.toUpperCase();
}

// ─── CAST FILTER ────────────────────────────

function initCastFilter() {
    const btns = document.querySelectorAll(".filter-btn");
    const grid = document.getElementById("castGrid");

    btns.forEach(btn => btn.addEventListener("click", () => {
        btns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const f = btn.dataset.filter;

        grid.querySelectorAll(".cast-card").forEach((card, i) => {
            const show = f === "all" || card.dataset.team === f;
            card.style.transition = `opacity .3s ease ${i * 0.02}s, transform .3s ease ${i * 0.02}s`;
            if (show) {
                card.style.display = "";
                requestAnimationFrame(() => { card.style.opacity = "1"; card.style.transform = "translateY(0) scale(1)"; });
            } else {
                card.style.opacity = "0"; card.style.transform = "translateY(16px) scale(.96)";
                setTimeout(() => card.style.display = "none", 300);
            }
        });
    }));
}

// ─── CAST SEARCH ────────────────────────────

function initCastSearch() {
    const input = document.getElementById("castSearch");
    const grid = document.getElementById("castGrid");

    input.addEventListener("input", () => {
        const q = input.value.toLowerCase().trim();
        const cards = grid.querySelectorAll(".cast-card");

        cards.forEach(card => {
            if (!q) {
                card.style.display = "";
                card.style.opacity = "1";
                card.style.transform = "translateY(0) scale(1)";
                return;
            }
            const name = card.dataset.name || "";
            const match = name.includes(q);
            if (match) {
                card.style.display = "";
                card.style.opacity = "1";
                card.style.transform = "translateY(0) scale(1)";
            } else {
                card.style.opacity = "0";
                card.style.transform = "translateY(10px) scale(.96)";
                setTimeout(() => { if (!name.includes(input.value.toLowerCase().trim())) card.style.display = "none"; }, 250);
            }
        });
    });
}

// ─── SCROLL REVEAL ──────────────────────────

function initScrollReveal() {
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("revealed"); });
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });

    document.querySelectorAll(".reveal-text,.reveal-left,.reveal-right,.reveal-up").forEach(el => obs.observe(el));
}

// ─── VILLAIN STATS ──────────────────────────

function initVillainStats() {
    let done = false;
    const sec = document.getElementById("villain");
    new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting && !done) {
                done = true;
                sec.querySelectorAll(".pwr-fill").forEach((f, i) => {
                    setTimeout(() => f.style.width = f.dataset.val + "%", i * 180);
                });
            }
        });
    }, { threshold: 0.25 }).observe(sec);
}

// ─── BACK TO TOP ────────────────────────────

function initBackToTop() {
    const btn = document.getElementById("backToTop");
    addEventListener("scroll", () => btn.classList.toggle("visible", scrollY > 400));
    btn.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));
}

// ─── SCROLL PROGRESS BAR ────────────────────

function initScrollProgress() {
    const bar = document.getElementById("scrollProgress");
    addEventListener("scroll", () => {
        const h = document.documentElement.scrollHeight - innerHeight;
        bar.style.width = (scrollY / h * 100) + "%";
    });
}

// ─── TRAILER MODAL ──────────────────────────

function initTrailerModal() {
    const modal = document.getElementById("trailerModal");
    const frame = document.getElementById("trailerFrame");
    const openBtn = document.getElementById("openTrailer");
    const closeBtn = document.getElementById("closeTrailer");
    const trailerUrl = "https://www.youtube.com/embed/PyTEUYXVDaU?autoplay=1&rel=0";

    if (openBtn) openBtn.addEventListener("click", () => {
        frame.src = trailerUrl;
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
    });

    function closeModal() {
        modal.classList.remove("active");
        frame.src = "";
        document.body.style.overflow = "";
    }

    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (modal) modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });
    addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("active")) closeModal();
    });
}

// ─── AMBIENT SOUND (Web Audio API) ──────────

function initSound() {
    const btn = document.getElementById("soundToggle");
    let ctx, playing = false, nodes = [];

    function createDrone() {
        ctx = new (window.AudioContext || window.webkitAudioContext)();
        const freqs = [55, 82.5, 110, 165];
        const master = ctx.createGain();
        master.gain.value = 0.06;
        master.connect(ctx.destination);

        freqs.forEach((f, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = i < 2 ? "sine" : "triangle";
            osc.frequency.value = f;
            gain.gain.value = i < 2 ? 0.4 : 0.15;
            osc.connect(gain);
            gain.connect(master);
            osc.start();
            nodes.push(osc);
        });

        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.value = 0.15;
        lfoGain.gain.value = 3;
        lfo.connect(lfoGain);
        freqs.forEach((_, i) => { if (nodes[i]) lfoGain.connect(nodes[i].frequency); });
        lfo.start();
        nodes.push(lfo);
    }

    btn.addEventListener("click", () => {
        if (!playing) {
            createDrone();
            playing = true;
            btn.classList.add("playing");
            btn.innerHTML = '<i class="fas fa-volume-high"></i>';
        } else {
            nodes.forEach(n => n.stop());
            nodes = [];
            if (ctx) ctx.close();
            playing = false;
            btn.classList.remove("playing");
            btn.innerHTML = '<i class="fas fa-volume-xmark"></i>';
        }
    });
}

// ─── SHARE BUTTONS ──────────────────────────

function initShare() {
    const fab = document.getElementById("shareFab");
    const toggle = document.getElementById("shareToggle");
    const url = "https://naga123-prog.github.io/avengers-doomsday/";
    const text = "Cek jadwal Avengers: Doomsday — 18 Desember 2026!";

    toggle.addEventListener("click", () => fab.classList.toggle("open"));

    document.getElementById("shareWA").href =
        "https://wa.me/?text=" + encodeURIComponent(text + " " + url);
    document.getElementById("shareTW").href =
        "https://twitter.com/intent/tweet?text=" + encodeURIComponent(text) + "&url=" + encodeURIComponent(url);

    document.getElementById("shareCopy").addEventListener("click", () => {
        navigator.clipboard.writeText(url).then(() => {
            const btn = document.getElementById("shareCopy");
            btn.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => btn.innerHTML = '<i class="fas fa-link"></i>', 2000);
        });
    });

    document.addEventListener("click", (e) => {
        if (!fab.contains(e.target)) fab.classList.remove("open");
    });
}

// ─── GALLERY + LIGHTBOX ─────────────────────

function initGallery() {
    const grid = document.getElementById("galleryGrid");
    const backdrops = [
        "/rObL4of4eFA8yWaN9pRFo9aOVNi.jpg",
        "/g3gpP5YDbA85DsA0bt5mgGQIe5q.jpg",
        "/6TgmIXoVGEDyp0MSoVytIeyfhDR.jpg",
        "/4NxnrRmI7goXMsRASwSegf50MC8.jpg",
        "/tXNt66khUBZcusc22INKCeGRr4l.jpg",
        "/pGbP900NvKzOtLWdyH0sWmLQu1G.jpg",
        "/Ad0C6CKwmp9mNz2iit2r9shuZTN.jpg",
        "/s4v0UX1anfXm0UvloLsTTJ4v222.jpg",
        "/6KDDoTq8Vq3HuQHULzuvPiCJbMI.jpg",
        "/kg4X2vidTNtAHGBZYmaxn3FqrT1.jpg",
        "/iPaWPsBPmWIginVeU5oCa5ecmle.jpg",
        "/esV9PPwm3WQYvAOmYOmyTyodjlt.jpg"
    ];

    const base = "https://image.tmdb.org/t/p/";
    if (!grid) return;

    backdrops.forEach((p, i) => {
        const item = document.createElement("div");
        item.className = "gallery-item reveal-up";
        item.style.transitionDelay = `${i * 0.05}s`;
        item.innerHTML = `<img src="${base}w780${p}" alt="Scene ${i+1}" loading="lazy">`;
        item.addEventListener("click", () => openLightbox(i));
        grid.appendChild(item);
    });

    const lb = document.getElementById("lightbox");
    const lbImg = document.getElementById("lbImg");
    const lbCounter = document.getElementById("lbCounter");
    let currentIdx = 0;

    function openLightbox(idx) {
        currentIdx = idx;
        lbImg.src = base + "original" + backdrops[idx];
        lbCounter.textContent = `${idx + 1} / ${backdrops.length}`;
        lb.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
        lb.classList.remove("active");
        document.body.style.overflow = "";
    }

    document.getElementById("lbClose").addEventListener("click", closeLightbox);
    document.getElementById("lbPrev").addEventListener("click", () => {
        currentIdx = (currentIdx - 1 + backdrops.length) % backdrops.length;
        lbImg.src = base + "original" + backdrops[currentIdx];
        lbCounter.textContent = `${currentIdx + 1} / ${backdrops.length}`;
    });
    document.getElementById("lbNext").addEventListener("click", () => {
        currentIdx = (currentIdx + 1) % backdrops.length;
        lbImg.src = base + "original" + backdrops[currentIdx];
        lbCounter.textContent = `${currentIdx + 1} / ${backdrops.length}`;
    });

    lb.addEventListener("click", (e) => { if (e.target === lb) closeLightbox(); });
    addEventListener("keydown", (e) => {
        if (!lb.classList.contains("active")) return;
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowLeft") document.getElementById("lbPrev").click();
        if (e.key === "ArrowRight") document.getElementById("lbNext").click();
    });
}

// ─── QUIZ: WHICH AVENGER ARE YOU? ───────────

function initQuiz() {
    const container = document.getElementById("quizContent");
    const startBtn = document.getElementById("startQuiz");
    if (!startBtn) return;

    const questions = [
        { q: "Dalam situasi berbahaya, apa yang pertama kamu lakukan?",
          opts: [
            { text: "Langsung maju tanpa pikir panjang", scores: {thor:2,wolverine:2} },
            { text: "Analisis situasi dulu, baru bertindak", scores: {strange:2,reed:2} },
            { text: "Lindungi orang-orang di sekitar", scores: {cap:2,spidey:1} },
            { text: "Cari celah dan manfaatkan dengan cerdik", scores: {loki:2,deadpool:1} }
          ]},
        { q: "Kekuatan super apa yang paling kamu inginkan?",
          opts: [
            { text: "Kekuatan fisik yang luar biasa", scores: {thor:2,hulk:2} },
            { text: "Sihir dan penguasaan dimensi", scores: {strange:2,loki:1} },
            { text: "Teknologi canggih", scores: {reed:2,spidey:1} },
            { text: "Regenerasi — nggak bisa mati", scores: {wolverine:2,deadpool:2} }
          ]},
        { q: "Bagaimana cara kamu bekerja dalam tim?",
          opts: [
            { text: "Saya pemimpinnya", scores: {cap:2,reed:1} },
            { text: "Solo player, tapi bisa kerja tim kalau perlu", scores: {wolverine:2,strange:1} },
            { text: "Saya yang bikin suasana cair", scores: {deadpool:2,spidey:1} },
            { text: "Saya yang diam-diam menyelesaikan semua", scores: {loki:2,hulk:1} }
          ]},
        { q: "Film genre apa yang paling kamu suka?",
          opts: [
            { text: "Action/petualangan epic", scores: {thor:2,cap:1} },
            { text: "Sci-fi / teknologi masa depan", scores: {reed:2,spidey:1} },
            { text: "Komedi / parodi", scores: {deadpool:2,loki:1} },
            { text: "Horror / thriller gelap", scores: {wolverine:1,hulk:2,strange:1} }
          ]},
        { q: "Motto hidup kamu?",
          opts: [
            { text: "\"I can do this all day\"", scores: {cap:3} },
            { text: "\"It's not about how much we lost, it's about how much we have left\"", scores: {thor:2,hulk:1} },
            { text: "\"With great power comes great responsibility\"", scores: {spidey:3} },
            { text: "\"Maximum effort!\"", scores: {deadpool:3} }
          ]}
    ];

    const results = {
        cap: { name: "Captain America", desc: "Kamu pemimpin sejati! Penuh integritas, keberanian, dan selalu membela yang benar.", img: "/3bOGNsHlrswhyW79uvIHH1V43JI.jpg" },
        thor: { name: "Thor", desc: "Kamu punya kekuatan besar dan hati yang mulia. Worthy of Mjolnir!", img: "/piQGdoIQOF3C1EI5cbYZLAW1gfj.jpg" },
        hulk: { name: "Hulk", desc: "Tenang di luar, dahsyat di dalam. Kamu kombinasi kekuatan dan kecerdasan.", img: "/5GilHMOt5PAQh6rlUKZzGmaKEI7.jpg" },
        strange: { name: "Doctor Strange", desc: "Kamu visioner dan strategis. Kamu selalu lihat the bigger picture.", img: "/wz3MRiMmoz6b5X3oSzMRC9nLxY1.jpg" },
        spidey: { name: "Spider-Man", desc: "Kamu peduli sama orang lain dan selalu berusaha melakukan hal yang benar!", img: "/xKBAaPIa1c7tzZD3Y0MhBLv4hPE.jpg" },
        wolverine: { name: "Wolverine", desc: "Kamu tangguh, nggak gampang menyerah. Petarung sejati sampai akhir!", img: "/4Xujtewxqt6aU0Y81tsS9gkjizk.jpg" },
        deadpool: { name: "Deadpool", desc: "Kamu lucu, unik, dan nggak peduli apa kata orang. Maximum effort!", img: "/trzgptffGvAlAT6MEu01fz47cLW.jpg" },
        reed: { name: "Mr. Fantastic", desc: "Otak jenius! Kamu selalu punya solusi untuk masalah apapun.", img: "/oKcMbVn0NJTNzQt0ClKKvVXkm60.jpg" },
        loki: { name: "Loki", desc: "Cerdik dan misterius. Kamu selalu punya rencana cadangan!", img: "/mclHxMm8aPlCPKptP67257F5GPo.jpg" }
    };

    let currentQ = 0;
    let scores = {};

    startBtn.addEventListener("click", () => { currentQ = 0; scores = {}; showQuestion(); });

    function showQuestion() {
        const q = questions[currentQ];
        container.innerHTML = `
            <p class="quiz-question">${q.q}</p>
            <p class="quiz-progress">Pertanyaan ${currentQ+1} dari ${questions.length}</p>
            <div class="quiz-options">
                ${q.opts.map((o,i) => `<button class="quiz-opt" data-idx="${i}">${o.text}</button>`).join("")}
            </div>`;
        container.querySelectorAll(".quiz-opt").forEach(btn => {
            btn.addEventListener("click", () => {
                const opt = q.opts[parseInt(btn.dataset.idx)];
                Object.entries(opt.scores).forEach(([k,v]) => { scores[k] = (scores[k]||0) + v; });
                currentQ++;
                if (currentQ < questions.length) showQuestion();
                else showResult();
            });
        });
    }

    function showResult() {
        const winner = Object.entries(scores).sort((a,b) => b[1] - a[1])[0][0];
        const r = results[winner];
        const shareText = encodeURIComponent(`Aku adalah ${r.name} di quiz Avengers Doomsday! Kamu siapa? Cek di sini:`);
        const shareUrl = encodeURIComponent("https://naga123-prog.github.io/avengers-doomsday/#quiz");
        container.innerHTML = `
            <div class="quiz-result">
                <img src="https://image.tmdb.org/t/p/w200${r.img}" alt="${r.name}" class="quiz-result-img">
                <p class="quiz-result-name">${r.name}</p>
                <p class="quiz-result-desc">${r.desc}</p>
                <div class="quiz-share-row">
                    <a href="https://wa.me/?text=${shareText}+${shareUrl}" target="_blank" rel="noopener" class="quiz-share-btn"><i class="fab fa-whatsapp"></i> Share</a>
                    <a href="https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}" target="_blank" rel="noopener" class="quiz-share-btn"><i class="fab fa-twitter"></i> Tweet</a>
                </div>
                <button class="btn-primary" style="margin-top:20px;font-size:13px;padding:10px 24px" id="quizRestart">
                    <i class="fas fa-redo"></i> Main Lagi
                </button>
            </div>`;
        document.getElementById("quizRestart").addEventListener("click", () => {
            currentQ = 0; scores = {}; showQuestion();
        });
    }
}

// ─── EASTER EGG: Type "DOOM" ────────────────

function initEasterEgg() {
    let buffer = "";
    const overlay = document.getElementById("easterEgg");

    addEventListener("keydown", (e) => {
        if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
        buffer += e.key.toUpperCase();
        if (buffer.length > 10) buffer = buffer.slice(-10);
        if (buffer.includes("DOOM")) {
            buffer = "";
            overlay.classList.add("active");
            document.body.style.overflow = "hidden";
            setTimeout(() => {
                overlay.classList.remove("active");
                document.body.style.overflow = "";
            }, 3500);
        }
    });

    overlay.addEventListener("click", () => {
        overlay.classList.remove("active");
        document.body.style.overflow = "";
    });
}

// ─── PARALLAX BANNER ────────────────────────

function initParallax() {
    const poster = document.querySelector(".banner-poster-img");
    if (!poster) return;
    addEventListener("scroll", () => {
        const y = scrollY;
        if (y < innerHeight) {
            poster.style.transform = `scale(1.05) translateY(${y * 0.15}px)`;
        }
    });
}

// ─── BACKEND CONNECTION ─────────────────────

function initBackend() {
    try {
        socket = io(API_URL, { transports: ["websocket", "polling"], timeout: 5000 });
        socket.on("connect", () => console.log("Connected to Doomsday API"));
        socket.on("connect_error", () => console.log("API offline — running in static mode"));
    } catch (e) {
        console.log("Socket.IO not available — static mode");
    }

    initVisitorCounter();
    initReviews();
    initLiveChat();
}

// ─── VISITOR COUNTER ────────────────────────

function initVisitorCounter() {
    fetch(API_URL + "/api/visit", { method: "POST" })
        .then(r => r.json())
        .then(d => { document.getElementById("visitorCount").textContent = d.count.toLocaleString("id-ID"); })
        .catch(() => { document.getElementById("visitorCount").textContent = "-"; });
}

// ─── REVIEWS ────────────────────────────────

function initReviews() {
    let selectedRating = 0;
    const stars = document.querySelectorAll("#starRating i");
    const list = document.getElementById("reviewsList");

    stars.forEach(s => {
        s.addEventListener("click", () => {
            selectedRating = parseInt(s.dataset.val);
            stars.forEach(st => st.classList.toggle("active", parseInt(st.dataset.val) <= selectedRating));
        });
        s.addEventListener("mouseenter", () => {
            const v = parseInt(s.dataset.val);
            stars.forEach(st => st.classList.toggle("active", parseInt(st.dataset.val) <= v));
        });
    });
    document.getElementById("starRating").addEventListener("mouseleave", () => {
        stars.forEach(st => st.classList.toggle("active", parseInt(st.dataset.val) <= selectedRating));
    });

    document.getElementById("submitReview").addEventListener("click", () => {
        const username = document.getElementById("reviewName").value.trim();
        const comment = document.getElementById("reviewComment").value.trim();
        if (!username || !comment || !selectedRating) {
            alert("Isi nama, rating, dan komentar ya!"); return;
        }
        fetch(API_URL + "/api/reviews", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, rating: selectedRating, comment })
        })
        .then(r => r.json())
        .then(() => {
            document.getElementById("reviewName").value = "";
            document.getElementById("reviewComment").value = "";
            selectedRating = 0;
            stars.forEach(s => s.classList.remove("active"));
        })
        .catch(() => alert("Server belum aktif. Coba lagi nanti!"));
    });

    fetch(API_URL + "/api/reviews")
        .then(r => r.json())
        .then(reviews => reviews.forEach(r => appendReview(r)))
        .catch(() => {
            list.innerHTML = '<p class="chat-empty">Server belum aktif — review akan muncul setelah backend di-deploy.</p>';
        });

    if (socket) socket.on("new-review", r => appendReview(r, true));

    function appendReview(r, prepend) {
        const div = document.createElement("div");
        div.className = "review-item";
        const starsHtml = Array(5).fill(0).map((_, i) =>
            `<i class="fas fa-star" style="color:${i < r.rating ? '#ffd700' : '#333'}"></i>`
        ).join("");
        const time = new Date(r.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
        div.innerHTML = `
            <div class="review-header">
                <span class="review-user">${escHtml(r.username)}</span>
                <span class="review-stars">${starsHtml}</span>
            </div>
            <p class="review-text">${escHtml(r.comment)}</p>
            <p class="review-time">${time}</p>`;
        if (prepend) list.prepend(div); else list.appendChild(div);
    }
}

// ─── LIVE CHAT ──────────────────────────────

function initLiveChat() {
    const messages = document.getElementById("chatMessages");
    const typing = document.getElementById("chatTyping");
    const nameIn = document.getElementById("chatName");
    const msgIn = document.getElementById("chatMsg");
    const sendBtn = document.getElementById("chatSend");
    let typingTimer;

    if (!socket) {
        messages.innerHTML = '<p class="chat-empty">Server belum aktif — chat akan aktif setelah backend di-deploy.</p>';
        return;
    }

    messages.innerHTML = '<p class="chat-empty">Belum ada pesan. Mulai chat!</p>';

    socket.on("chat-history", (history) => {
        if (history.length) {
            messages.innerHTML = "";
            history.forEach(m => appendMsg(m));
        }
    });

    socket.on("chat-msg", (m) => appendMsg(m));

    socket.on("online-count", (n) => {
        const el = document.getElementById("onlineCount");
        if (el) el.textContent = n;
    });

    socket.on("typing", (user) => {
        typing.textContent = user + " sedang mengetik...";
        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => typing.textContent = "", 2000);
    });

    function send() {
        const username = nameIn.value.trim();
        const message = msgIn.value.trim();
        if (!username || !message) return;
        socket.emit("chat-msg", { username, message });
        msgIn.value = "";
    }

    sendBtn.addEventListener("click", send);
    msgIn.addEventListener("keydown", (e) => {
        if (e.key === "Enter") { send(); return; }
        const name = nameIn.value.trim();
        if (name) socket.emit("typing", name);
    });

    function appendMsg(m) {
        const first = messages.querySelector(".chat-empty");
        if (first) first.remove();
        const div = document.createElement("div");
        div.className = "chat-msg";
        const t = new Date(m.time).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
        div.innerHTML = `
            <div class="chat-msg-user">${escHtml(m.username)}</div>
            <div class="chat-msg-text">${escHtml(m.message)}</div>
            <div class="chat-msg-time">${t}</div>`;
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
    }
}

function escHtml(s) {
    const d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
}
