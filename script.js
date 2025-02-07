let coins = localStorage.getItem("coins") ? parseInt(localStorage.getItem("coins")) : 50;
document.getElementById("coin-count").textContent = coins;

// Ajout automatique de 50 coins par jour
let lastLogin = localStorage.getItem("lastLogin");
let today = new Date().toDateString();

if (lastLogin !== today) {
    coins += 50;
    localStorage.setItem("coins", coins);
    localStorage.setItem("lastLogin", today);
    document.getElementById("coin-count").textContent = coins;
}

// Fonction pour placer une mise
function placeBet(color) {
    let betAmount = parseInt(document.getElementById("bet-amount").value);
    if (betAmount < 10 || betAmount > coins) {
        alert("Mise invalide !");
        return;
    }

    coins -= betAmount;
    localStorage.setItem("coins", coins);
    document.getElementById("coin-count").textContent = coins;

    let wheel = document.getElementById("roulette-wheel");
    let randomDegree = Math.floor(360 * 5 + Math.random() * 360);
    wheel.style.transform = `rotate(${randomDegree}deg)`;

    setTimeout(() => {
        let result = getResult(randomDegree % 360);
        if (result === color) {
            alert("Félicitations ! Vous avez gagné " + (betAmount * 2) + " coins !");
            coins += betAmount * 2;
        } else {
            alert("Dommage, vous avez perdu !");
        }
        localStorage.setItem("coins", coins);
        document.getElementById("coin-count").textContent = coins;
    }, 3000);
}

function afficherDetailsMatch(equipe1, logo1, equipe2, logo2, score1, score2, buteurs1, buteurs2) {
    document.getElementById("team1-name").textContent = equipe1;
    document.getElementById("team1-logo").src = logo1;
    document.getElementById("team2-name").textContent = equipe2;
    document.getElementById("team2-logo").src = logo2;
    document.getElementById("score-display").textContent = score1 + " - " + score2;

    document.getElementById("buteurs-equipe1").textContent = buteurs1 ? buteurs1 : "Aucun buteur";
    document.getElementById("buteurs-equipe2").textContent = buteurs2 ? buteurs2 : "Aucun buteur";

    document.getElementById("match-details").classList.add("active");
}

/// Afficher les détails du match
function afficherDetails(matchNumber) {
    document.querySelector(`.match-details-${matchNumber}`).classList.add("active");
}

// Fermer les détails du match
function fermerDetails(matchNumber) {
    document.querySelector(`.match-details-${matchNumber}`).classList.remove("active");
}
