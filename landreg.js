const districts = [
"Bagalkot","Ballari (Bellary)","Belagavi (Belgaum)",
"Bengaluru Rural","Bengaluru Urban","Bidar",
"Chamarajanagar","Chikkaballapur","Chikkamagaluru",
"Chitradurga","Dakshina Kannada","Davanagere",
"Dharwad","Gadag","Hassan","Haveri",
"Kalaburagi (Gulbarga)","Kodagu","Kolar",
"Koppal","Mandya","Mysuru (Mysore)",
"Raichur","Ramanagara","Shivamogga (Shimoga)",
"Tumakuru (Tumkur)","Udupi","Uttara Kannada (Karwar)",
"Vijayapura (Bijapur)","Yadgir"
];

const offices = {};

districts.forEach(district => {
    offices[district] = [
        "Deputy Commissioner Office",
        "District Court",
        "Municipal Corporation Office",
        "Sub-Registrar Office",
        "Revenue Department Office",
        "Police Superintendent Office",
        "Transport Office (RTO)",
        "Zilla Panchayat Office"
    ];
});

function openPopup(){
    let popup = document.getElementById("popup");
    let select = document.getElementById("districtSelect");

    select.innerHTML = '<option value="">-- Select District --</option>';

    districts.forEach(d => {
        let option = document.createElement("option");
        option.value = d;
        option.textContent = d;
        select.appendChild(option);
    });

    popup.classList.add("active");
}

function loadOffices(){
    let district = document.getElementById("districtSelect").value;
    let officeSelect = document.getElementById("officeSelect");

    officeSelect.innerHTML = '<option value="">-- Select Office --</option>';

    if(district){
        offices[district].forEach(office => {
            let option = document.createElement("option");
            option.value = office;
            option.textContent = office;
            officeSelect.appendChild(option);
        });
    }
}

function saveData(){

    let aadhaar = document.getElementById("aadhaar").value;
    let reason = document.getElementById("reason").value;
    let district = document.getElementById("districtSelect").value;
    let office = document.getElementById("officeSelect").value;

    if(!aadhaar || !reason || !district || !office){
        alert("Please fill all details!");
        return;
    }

    fetch('backend/register.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `aadhaar=${encodeURIComponent(aadhaar)}
                &reason=${encodeURIComponent(reason)}
                &district=${encodeURIComponent(district)}
                &office=${encodeURIComponent(office)}`
    })
    .then(response => response.json())
    .then(data => {
        if(data.status === "success"){

            alert("Registration Successful!\nYour Time Slot: " + data.time_slot);

            getTotalRegistrations();

            document.getElementById("popup").classList.remove("active");

        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("There was an error submitting the data.");
    });
}

function getTotalRegistrations() {
    fetch('backend/get_count.php')
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            document.getElementById("totalCount").innerText =
                "Total Registered Members: " + data.total;
        }
    })
    .catch(error => console.error("Error:", error));
}

