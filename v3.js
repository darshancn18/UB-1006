// Save Phone Permanently
function savePhoneNumber() {
    const phone = document.getElementById("parentPhone").value;

    if (!phone) {
        alert("Please enter valid WhatsApp number");
        return;
    }

    localStorage.setItem("parentPhone", phone);
    document.getElementById("phoneStatus").innerHTML =
        "✅ WhatsApp number saved successfully!";
}

// Save Birth Date
function saveBirthDate() {
    const birthDate = document.getElementById("birthDate").value;

    if (!birthDate) {
        alert("Please select birth date");
        return;
    }

    localStorage.setItem("childBirthDate", birthDate);
    analyzeAge();
}

// Age Analysis + Auto WhatsApp
function analyzeAge() {
    const birthDate = localStorage.getItem("childBirthDate");
    const phone = localStorage.getItem("parentPhone");

    if (!birthDate || !phone) return;

    const today = new Date();
    const birth = new Date(birthDate);

    let ageYears = today.getFullYear() - birth.getFullYear();
    let ageMonths = today.getMonth() - birth.getMonth();

    if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12;
    }

    let messageHTML = `<h3>📊 Child Age: ${ageYears} Years ${ageMonths} Months</h3>`;
    let whatsappMessage = "";

    if (ageYears === 0) {

    const birthLink = "https://ejanma.karnataka.gov.in/";

    messageHTML += `
        <p>💉 Vaccination Schedule Active</p>
        <p>📄 Apply for Birth Certificate</p>

        <p>
            🔗 Official Government Link:
            <br>
            <a href="${birthLink}" target="_blank" 
               style="color:#000080; font-weight:bold;">
               Apply for Birth Certificate (Karnataka)
            </a>
        </p>

        <div id="qrCode" style="margin-top:20px;"></div>
        <p>📱 Scan QR Code to Apply Instantly</p>
    `;

    whatsappMessage = 
    "👶 Government Alert:\n\n" +
    "Apply for Birth Certificate & follow vaccination schedule.\n\n" +
    "Official Link:\n" +
    birthLink;

    // Generate QR Code
    setTimeout(() => {
        const qrContainer = document.getElementById("qrCode");
        qrContainer.innerHTML = ""; // Clear previous QR if any

        new QRCode(qrContainer, {
            text: birthLink,
            width: 150,
            height: 150,
        });
    }, 100);
}

    if (ageYears === 5) {

    const schoolLink = "https://schooleducation.karnataka.gov.in/en";

    messageHTML += `
        <p> Hi congiratulation for becoming 5 years old </p>
        <p>🏫 Eligible for School Admission</p>

        <p>
            🔗 Official Karnataka School Education Portal:
            <br>
            <a href="${schoolLink}" target="_blank"
               style="color:#000080; font-weight:bold;">
               Visit School Education Portal
            </a>
        </p>

        <div id="qrCodeSchool" style="margin-top:20px;"></div>
        <p>📱 Scan QR Code to Access School Portal</p>
    `;

    whatsappMessage =
        "🏫 Government Alert:\n\n" +
        "Your child is eligible for school admission.\n\n" +
        "Official Portal:\n" +
        schoolLink;

    // Generate QR Code
    setTimeout(() => {
        const qrContainer = document.getElementById("qrCodeSchool");
        if (qrContainer) {
            qrContainer.innerHTML = "";

            new QRCode(qrContainer, {
                text: schoolLink,
                width: 150,
                height: 150
            });
        }
    }, 100);
}


   if (ageYears === 15) {

    const scholarshipLink = "https://ssp.postmatric.karnataka.gov.in/";

    messageHTML += `
        <p> Hi congiratulation for becoming 15 years old </p>
        <p>🎓 Scholarship Eligibility Detected</p>
        <p>💰 Apply for Karnataka State Scholarship Schemes</p>

        <p>
            🔗 Official Scholarship Portal:
            <br>
            <a href="${scholarshipLink}" target="_blank"
               style="color:#000080; font-weight:bold;">
               Visit Karnataka Scholarship Portal
            </a>
        </p>

        <div id="qrCodeScholarship" style="margin-top:20px;"></div>
        <p>📱 Scan QR Code to Apply for Scholarship</p>
    `;

    whatsappMessage =
        "🎓 Government Alert:\n\n" +
        "Scholarship schemes are available for eligible students.\n\n" +
        "Apply using official portal:\n" +
        scholarshipLink;

    // Generate QR Code
    setTimeout(() => {
        const qrContainer = document.getElementById("qrCodeScholarship");
        if (qrContainer) {
            qrContainer.innerHTML = "";

            new QRCode(qrContainer, {
                text: scholarshipLink,
                width: 150,
                height: 150
            });
        }
    }, 100);
}


    if (ageYears === 18) {
        messageHTML += `
        <p> Hi congiratulation for becoming 18 years old </p>
            <p>🗳️ Eligible for Voter Registration</p>
        `;
        whatsappMessage = "🗳️ Government Alert: Eligible for voter registration.";
    }
     if (ageYears === 25) {
        messageHTML += `
        <p> Hi congiratulation for becoming 25 years old </p>
            <p>🗳️ Eligible for Voter Registration</p>
            <p> get job schems </p>
        `;
        whatsappMessage = "🗳️ Government Alert: Eligible for voter registration.";
    }

    document.getElementById("ageResult").innerHTML = messageHTML;

    // AUTO TRIGGER WITHOUT ASKING
    if (whatsappMessage !== "") {
        sendWhatsApp(phone, whatsappMessage);
    }
}

// Send WhatsApp Automatically
function sendWhatsApp(phone, message) {
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phone}?text=${encodedMessage}`;
    window.open(url, "_blank");
}

// Run automatically on load
window.onload = analyzeAge;
let countdownInterval;

function showNextMilestone(birth) {

    const milestones = [5, 15, 18];
    const today = new Date();

    let currentAge = today.getFullYear() - birth.getFullYear();
    let nextAge = milestones.find(age => age > currentAge);

    if (!nextAge) {
        document.getElementById("nextMilestoneBox").innerHTML =
            "🎉 All major milestones completed!";
        return;
    }

    const nextMilestoneDate = new Date(birth);
    nextMilestoneDate.setFullYear(birth.getFullYear() + nextAge);

    clearInterval(countdownInterval);

    countdownInterval = setInterval(() => {

        const now = new Date();
        const diff = nextMilestoneDate - now;

        if (diff <= 0) {
            clearInterval(countdownInterval);
            document.getElementById("nextMilestoneBox").innerHTML =
                `🎉 Milestone Age ${nextAge} Reached!`;

            analyzeAge(); // Re-run logic to trigger WhatsApp + portal
            return;
        }

        const totalSeconds = Math.floor(diff / 1000);

        const days = Math.floor(totalSeconds / (3600 * 24));
        const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        document.getElementById("nextMilestoneBox").innerHTML = `
            ⏳ Next Milestone: Age ${nextAge} <br><br>
            Time Remaining:<br>
            ${days} Days 
            ${hours} Hours 
            ${minutes} Minutes 
            ${seconds} Seconds
        `;

    }, 1000);
}
// 3D Tilt Effect
document.querySelectorAll(".glass-card").forEach(card => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = -(y - centerY) / 15;
        const rotateY = (x - centerX) / 15;

        card.style.transform = 
            `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = 
            "rotateX(0deg) rotateY(0deg) scale(1)";
    });
});


// Scroll Reveal Animation
const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 100;

        if (revealTop < windowHeight - revealPoint) {
            reveal.classList.add("active");
        }
    });
});