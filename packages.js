let packages = [
    { name: "Camp Samburu", destination: "Samburu", price: 15000, feedback: 0, features: [] },
    { name: "Camp Jangwani", destination: "Nyeri", price: 12000, feedback: 0, features: [] },
];

displayPackage();  // Initially call displayPackage() to show initial packages

function addPackageFun() {
    let name = prompt("Enter package name");
    if (name === null || name.trim() === "") {
        alert("Package name is required");
        return;
    }

    let destination = prompt("Enter package destination");
    if (destination === null || destination.trim() === "") {
        alert("Package destination is required");
        return;
    }

    let price = prompt("Enter package price");
    if (price === null || isNaN(price) || parseInt(price) <= 0) {
        alert("Please enter a valid price");
        return;
    }

    price = parseInt(price);

    let featuresInput = prompt("Enter features for the package (comma separated)");
    let features = [];
    if (featuresInput !== null && featuresInput.trim() !== "") {
        features = featuresInput.split(',').map((feature) => feature.trim());
    }

    // Create new package without image
    const newPackage = {
        name: name,
        destination: destination,
        price: price,
        feedback: 0,
        features: features
    };

    // Push the new package into the `packages` array
    packages.push(newPackage);

    // Log to confirm the package has been added
    console.log("New Package added: ", newPackage);

    // Call displayPackage() after the new package is added
    displayPackage();
}

function displayPackage() {
    let packagesList = document.getElementById("packages-List");
    packagesList.innerHTML = "";  // Clear the current content

    // Debugging log to show the array being displayed
    console.log("Displaying Packages: ", packages);

    // Loop through packages and display each item
    packages.forEach(function (pkg, index) {
        let packageItem = document.createElement("div");
        packageItem.classList.add("package-item");

        packageItem.innerHTML = `
          <h3>${pkg.name}</h3>
          <p>Destination: ${pkg.destination} | Price: Ksh. ${pkg.price}</p>
        `;
        
        // Display features if available
        if (pkg.features.length > 0) {
            let featureList = document.createElement("div");
            featureList.classList.add("features-list");
            featureList.innerHTML = `<strong>Features:</strong><ul></ul>`;
            let featureListUL = featureList.querySelector('ul');
            pkg.features.forEach(function (feature) {
                let featureItem = document.createElement("li");
                featureItem.textContent = feature;
                featureListUL.appendChild(featureItem);
            });
            packageItem.appendChild(featureList);
        }

        // Add feedback, edit, and delete buttons
        let feedbackButton = document.createElement("div");
        feedbackButton.classList.add("feedback-stars");
        feedbackButton.innerHTML = getStarsHtml(pkg.feedback || 0, index);
        feedbackButton.addEventListener('click', function () {
            giveFeedback(index);
        });

        let editButton = document.createElement("button");
        editButton.classList.add("btn", "edit-btn");
        editButton.textContent = "Edit";
        editButton.addEventListener('click', function () {
            editFun(index);
        });

        let deleteButton = document.createElement("button");
        deleteButton.classList.add("btn", "delete-btn");
        deleteButton.textContent = "Delete Package";
        deleteButton.addEventListener('click', function () {
            deleteFun(index);
        });

        packageItem.append(feedbackButton, editButton, deleteButton);
        packagesList.appendChild(packageItem);
    });
}

function getStarsHtml(rating, index) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += `<span class="star ${i <= rating ? 'filled' : ''}" data-rating="${i}" onclick="ratePackage(${index}, ${i})">&#9733;</span>`;
    }
    return stars;
}

function ratePackage(index, rating) {
    packages[index].feedback = rating;
    displayPackage();  // Update the list after rating
    alert(`Package rated: ${rating} star${rating > 1 ? 's' : ''}`);
}

function editFun(index) {
    let packageItem = packages[index];

    let name = prompt("Enter new package name");
    if (name !== null && name.length <= 30) {
        packageItem.name = name;
    } else if (name !== null && name.length > 30) {
        alert("Package name cannot exceed 30 characters!");
        return;
    }

    let destination = prompt("Enter new package destination");
    if (destination !== null && destination.length <= 30) {
        packageItem.destination = destination;
    } else if (destination !== null && destination.length > 30) {
        alert("Package destination cannot exceed 30 characters!");
        return;
    }

    let price = prompt("Enter new package price");
    if (price !== null && !isNaN(price)) {
        packageItem.price = parseInt(price);
    } else {
        alert("Enter a valid price!");
        return;
    }

    let featuresInput = prompt("Enter package features (comma separated):");
    if (featuresInput !== null) {
        packageItem.features = featuresInput.split(',').map((feature) => feature.trim());
    }

    displayPackage();  // Update list after editing the package
}

function deleteFun(index) {
    packages.splice(index, 1);  // Remove the selected package
    displayPackage();  // Update the list after deletion
}
