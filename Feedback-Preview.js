document.addEventListener('DOMContentLoaded', function() {
    const previewData = JSON.parse(localStorage.getItem('previewData'));
    
    if (previewData) {
      document.getElementById('prevName').innerText = previewData.name;
      document.getElementById('prevEmail').innerText = previewData.email;
      document.getElementById('prevRate').innerText = previewData.rate;
      document.getElementById('prevImprovements').innerText = previewData.suggestion;
      document.getElementById('prevUpdate').innerText = previewData.update;
      document.getElementById('prevAdditional').innerText = previewData.additional;
    }
  });document.getElementById('backBtn').addEventListener("click", function(event) {
    event.preventDefault();
    window.history.back();
  });
