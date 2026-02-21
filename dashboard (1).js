const name = localStorage.getItem("userName");
const suggestions = JSON.parse(localStorage.getItem("aiSuggestions")) || [];

document.getElementById("welcomeText").innerText = 
    `Welcome, ${name}!`;

document.getElementById("totalSchemes").innerText = 
    suggestions.length;

const container = document.getElementById("schemeContainer");

suggestions.forEach(scheme => {
    const card = document.createElement("div");
    card.classList.add("scheme-card");

    card.innerHTML = `
        <h3>${scheme}</h3>
        <p>AI recommended government scheme based on your profile.</p>
        <button onclick="applyScheme('${scheme}')">Apply Now</button>
    `;

    container.appendChild(card);
});

function applyScheme(scheme){
    alert(`Application process started for ${scheme}`);
}

function logout(){
    localStorage.clear();
    window.location.href = "index.html";
}
let documents = JSON.parse(localStorage.getItem("documents")) || [];

function addDocument() {
    let name = document.getElementById("docName").value;
    let expiry = document.getElementById("expiryDate").value;

    if (!name || !expiry) {
        alert("Please fill all fields");
        return;
    }

    let doc = {
        name: name,
        expiry: expiry
    };

    documents.push(doc);
    localStorage.setItem("documents", JSON.stringify(documents));

    document.getElementById("docName").value = "";
    document.getElementById("expiryDate").value = "";

    displayDocuments();
}

function displayDocuments() {
    let docList = document.getElementById("docList");
    docList.innerHTML = "";

    let today = new Date();

    documents.forEach((doc, index) => {
        let expiryDate = new Date(doc.expiry);
        let timeDiff = expiryDate - today;
        let daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

        let statusClass = "safe";
        let statusText = `${daysLeft} days left`;

        if (daysLeft < 0) {
            statusClass = "expired";
            statusText = "Expired ❌";
        } else if (daysLeft <= 30) {
            statusClass = "warning";
            statusText = `${daysLeft} days left ⚠️`;
        }

        let div = document.createElement("div");
        div.className = `doc-item ${statusClass}`;
        div.innerHTML = `
            <span>${doc.name}</span>
            <span>${statusText}</span>
        `;

        docList.appendChild(div);
    });
}

window.onload = function() {
    displayDocuments();
};

let notifications = JSON.parse(localStorage.getItem("notifications")) || [];

function checkExpiryAlerts() {
    let today = new Date();

    documents.forEach(doc => {
        let expiryDate = new Date(doc.expiry);
        let timeDiff = expiryDate - today;
        let daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

        if (daysLeft === 7) {
            let message = `Reminder: ${doc.name} expires in 7 days! 📅`;

            // Avoid duplicate alerts
            if (!notifications.find(n => n.message === message)) {
                notifications.push({
                    message: message,
                    type: "reminder",
                    date: new Date().toLocaleString()
                });

                localStorage.setItem("notifications", JSON.stringify(notifications));

                simulateEmailSMS(doc.name);
            }
        }
    });

    updateNotificationUI();
}

sendRealEmail(doc.name); {

    let templateParams = {
        document_name: docName,
        to_email: "user_email_here@example.com" // Replace dynamically later
    };

    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams)
        .then(function(response) {
            console.log("Email Sent Successfully!", response.status, response.text);
            alert("📧 Real Email Sent Successfully!");
        }, function(error) {
            console.log("FAILED...", error);
            alert("Email sending failed. Check console.");
        });
}
function sendRealSMS(docName) {

    let userPhone = localStorage.getItem("userPhone");

    fetch("http://localhost:5000/send-sms", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            phone: userPhone,
            message: `Government Alert 🇮🇳: Your ${docName} is expiring soon.`
        })
    })
    .then(res => res.json())
    .then(data => {
        if(data.success){
            alert("📱 Real SMS Sent!");
        }
    });
}
function sendMessage() {
  const input = document.getElementById("userInput").value;
  const chatBox = document.getElementById("chatBox");

  chatBox.innerHTML += `<p><b>You:</b> ${input}</p>`;

  let response = "";

  if (input.toLowerCase().includes("birth certificate")) {
    response = `
Your Birth Certificate may need renewal.

Apply here:
https://services.india.gov.in/service/detail/apply-for-birth-certificate-karnatak
    `;
  }

  else if (input.toLowerCase().includes("expiry")) {
    checkExpiryAlerts();
    response = "I checked your documents. Expiry reminders sent if needed.";
  }

  else {
    response = "I can help with document expiry, reminders, and applications.";
  }

  chatBox.innerHTML += `<p><b>Assistant:</b> ${response}</p>`;
}
const userDocs = JSON.parse(localStorage.getItem("documents"));

function checkExpiryAlerts() {
  userDocs.forEach(doc => {
    if (new Date(doc.expiry) < new Date()) {
      sendReminder(doc.name);
    }
  });
}
