let packages = [
  {
    name: "Camp Samburu",
    destination: "Samburu",
    price: 15000,
    feedback: 4,
    features: ["Safari", "Wildlife Viewing", "Guided Tour"],
  },
  {
    name: "Camp Jangwani",
    destination: "Nyeri",
    price: 12000,
    feedback: 5,
    features: ["Hiking", "River View", "Relaxation"],
  },
];

let selectedPackageIndex = null;

emailjs.init("3huLxN0AfUpcolYmv");

function displayPackages() {
  const packageListElement = document.getElementById("package-list");
  packageListElement.innerHTML = "";

  packages.forEach((pkg, index) => {
    const packageItem = document.createElement("div");
    packageItem.classList.add("package-item");

    packageItem.innerHTML = `
      <h3>${pkg.name}</h3>
      <p>Destination: ${pkg.destination} | Price: Ksh. ${pkg.price} per person</p>
      <div class="features-list">
        <strong>Features:</strong>
        <ul>
          ${pkg.features.map((feature) => `<li>${feature}</li>`).join("")}
        </ul>
      </div>
      <div class="feedback-stars">${getStarsHtml(pkg.feedback)}</div>
      <button class="btn book-btn" onclick="bookPackage(${index})">Book</button>
    `;

    packageListElement.appendChild(packageItem);
  });
}

function getStarsHtml(rating) {
  return Array.from({ length: 5 }, (_, i) =>
    `<span class="star ${i < rating ? "filled" : ""}">&#9733;</span>`
  ).join("");
}

function bookPackage(index) {
  if (index < 0 || index >= packages.length) {
    console.error("Invalid package index:", index);
    return;
  }

  selectedPackageIndex = index;

  const selectedPackage = packages[index];
  document.getElementById("packageName").textContent = selectedPackage.name;
  document.getElementById("basePrice").textContent = selectedPackage.price;
  document.getElementById("totalPrice").textContent = "0";
  document.getElementById("numPeople").value = "";

  document.getElementById("bookingModal").style.display = "block";
}

function updatePrice() {
  if (selectedPackageIndex === null) {
    console.error("Selected package index is not set!");
    return;
  }

  const numPeople = parseInt(document.getElementById("numPeople").value) || 0;

  if (numPeople < 1) {
    document.getElementById("totalPrice").textContent = "0";
    return;
  }

  const selectedPackage = packages[selectedPackageIndex];
  const basePrice = selectedPackage.price;
  const totalPrice = numPeople * basePrice;

  document.getElementById("totalPrice").textContent = totalPrice;
}

function confirmBooking() {
  const numPeople = parseInt(document.getElementById("numPeople").value);

  if (!numPeople || numPeople < 1) {
    alert("Please enter a valid number of people!");
    return;
  }

  const selectedPackage = packages[selectedPackageIndex];
  const userEmail = prompt("Please enter your email for confirmation:");
  
  if (!userEmail || !validateEmail(userEmail)) {
    alert("Please enter a valid email address.");
    return;
  }

  sendEmailNotification(userEmail, selectedPackage);

  alert(
    `Booking confirmed for "${selectedPackage.name}" for ${numPeople} people.\n` +
    `Total Price: Ksh. ${numPeople * selectedPackage.price}.`
  );

  showRateYourTripModal(selectedPackage);
  closeModal();
}

function closeModal() {
  document.getElementById("bookingModal").style.display = "none";
}

function filterPackages() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const filteredPackages = packages.filter((pkg) =>
    pkg.destination.toLowerCase().includes(searchTerm)
  );

  displayFilteredPackages(filteredPackages, searchTerm);
}

function displayFilteredPackages(filteredPackages, searchTerm) {
  const packageListElement = document.getElementById("package-list");
  packageListElement.innerHTML = "";

  if (filteredPackages.length === 0) {
    packageListElement.innerHTML = `<p>No packages found for "${searchTerm}".</p>`;
    return;
  }

  filteredPackages.forEach((pkg, index) => {
    const packageItem = document.createElement("div");
    packageItem.classList.add("package-item");

    packageItem.innerHTML = `
      <h3>${pkg.name}</h3>
      <p>Destination: ${pkg.destination} | Price: Ksh. ${pkg.price} per person</p>
      <div class="features-list">
        <strong>Features:</strong>
        <ul>
          ${pkg.features.map((feature) => `<li>${feature}</li>`).join("")}
        </ul>
      </div>
      <div class="feedback-stars">${getStarsHtml(pkg.feedback)}</div>
      <button class="btn book-btn" onclick="bookPackage(${index})">Book</button>
    `;

    packageListElement.appendChild(packageItem);
  });
}

// Listens for the Enter key press to trigger search
document.getElementById("searchInput").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    filterPackages();
  }
});

function showRateYourTripModal(pkg) {
  const rateModal = document.createElement("div");
  rateModal.classList.add("rate-modal");

  rateModal.innerHTML = `
    <h3>Rate Your Trip: "${pkg.name}"</h3>
    <p>How would you rate your experience?</p>
    <div class="rating-stars">
      <span class="star" onclick="submitRating(1)">&#9733;</span>
      <span class="star" onclick="submitRating(2)">&#9733;</span>
      <span class="star" onclick="submitRating(3)">&#9733;</span>
      <span class="star" onclick="submitRating(4)">&#9733;</span>
      <span class="star" onclick="submitRating(5)">&#9733;</span>
    </div>
  `;

  document.body.appendChild(rateModal);
}

function submitRating(rating) {
  console.log(`You rated this package ${rating} stars!`);
  document.querySelector(".rate-modal").remove();
}

async function sendEmailNotification(userEmail, selectedPackage) {
  const numPeople = parseInt(document.getElementById("numPeople").value);
  const totalPrice = numPeople * selectedPackage.price;

  try {
    await emailjs.send("service_uu6usjg", "template_gy3e09d", {
      to_email: userEmail,
      subject: "Your Booking Confirmation - Trippin' Packages",
      customerName: userEmail,
      packageName: selectedPackage.name,
      destination: selectedPackage.destination,
      price: selectedPackage.price,
      numPeople: numPeople,
      totalPrice: totalPrice,
      feature1: selectedPackage.features[0] || "Not available",
      feature2: selectedPackage.features[1] || "Not available",
      feature3: selectedPackage.features[2] || "Not available",
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Failed to send email:", error);
    alert("There was a problem sending the email. Please try again later.");
  }
}

function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
}

// Display packages on page load
displayPackages();
