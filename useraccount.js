// Function to change the username
function change() {
  const newUsername = prompt("Enter new username:");
  if (newUsername) {
    document.getElementById("companyname").textContent = newUsername;
    showModal(`Username changed to: ${newUsername}`);
  }
}

// Function to edit the password
function editPassword() {
  const currentPassword = prompt("Enter your current password:");
  if (currentPassword) {
    const newPassword = prompt("Enter new password:");
    if (newPassword) {
      showModal("Password changed successfully");
    } else {
      showModal("Password change canceled");
    }
  } else {
    showModal("Password change canceled");
  }
}

// Function to view favorites
function viewFavorites() {
  showModal("Here are your favorite trips.");
  // Add logic to display favorite trips if applicable
}

// Function to view history
function viewHistory() {
  showModal("Here is your trip history.");
  // Add logic to display the user's travel history if applicable
}

// Function to delete the account
function deleteAccount() {
  const confirmDelete = confirm("Are you sure you want to delete your account?");
  if (confirmDelete) {
    showModal("Your account has been deleted.");
  } else {
    showModal("Account deletion canceled.");
  }
}

// Function to log out
function logOut() {
  const confirmLogout = confirm("Are you sure you want to log out?");
  if (confirmLogout) {
    showModal("You have successfully logged out.");
  } else {
    showModal("Logout canceled.");
  }
}

// Function to show a modal with a message
function showModal(message) {
  const modal = document.getElementById("alertModal");
  const modalMessage = document.getElementById("modalMessage");
  modalMessage.textContent = message;
  modal.style.display = "block";
}

// Function to close the modal
function closeModal() {
  const modal = document.getElementById("alertModal");
  modal.style.display = "none";
}

// Optional: Close modal when clicking outside of it
window.onclick = function(event) {
  const modal = document.getElementById("alertModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
