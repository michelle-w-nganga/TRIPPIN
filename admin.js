
function sum() {
  let num = [12000, 13000, 14000]; 
  return num.reduce((acc, curr) => acc + curr, 0);
}

function showModal(message) {
  
  document.getElementById('modalMessage').textContent = message;  
  
  document.getElementById('alertModal').style.display = "block";  
}

function closeModal() {
  document.getElementById('alertModal').style.display = "none";  
}

window.onclick = function(event) {
  if (event.target == document.getElementById('alertModal')) {
    closeModal();
  }
}

function displayEarnings() {
  const totalEarnings = sum();
  showModal(`Total Earnings: Ksh ${totalEarnings}`);  
}

function change() {
  const companyNameElem = document.getElementById("companyname");
  const currentName = companyNameElem.textContent;
  const newName = prompt("Enter new Company Name", currentName);
  
  if (newName && newName.trim() !== "") {
    companyNameElem.textContent = newName.trim();
    showModal("Company name updated successfully!");  
  } else {
    showModal("You must enter a valid name.");  
  }
}


function editPassword() {
  const newPassword = prompt("Enter new password (8-16 characters)");
  
  if (newPassword && newPassword.length >= 8 && newPassword.length <= 16) {
    showModal("Password updated successfully!");  
  } else {
    showModal("Password must be between 8 and 16 characters."); 
  }
}


function withdraw() {
  const amount = parseFloat(prompt("Enter amount to withdraw"));
  
  if (!isNaN(amount) && amount > 0) {
    const totalEarnings = sum();
    if (amount <= totalEarnings) {
      showModal("Withdrawal successful!");  
    } else {
      showModal("Insufficient funds!");  
    }
  } else {
    showModal("Invalid amount entered.");  
  }
}


function logout() {
  showModal("Logging out...");  
}


function deleteaccount() {
  const confirmed = confirm("Are you sure you want to delete your account? This action cannot be undone.");
  
  if (confirmed) {
    document.getElementById("companyname").textContent = "Account Deleted";  
    document.getElementById("earnings").innerHTML = `<label>Earnings:</label> 0`;  
    showModal("Your account has been deleted successfully.");
  } else {
    showModal("Account deletion canceled.");
  }
}
