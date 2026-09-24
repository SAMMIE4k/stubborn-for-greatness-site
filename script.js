// Stubborn for Greatness — order flow logic.
// No backend, no payment gateway keys required: this runs entirely
// in the browser. Buyer pays by bank transfer, then this script opens
// a pre-filled WhatsApp message to the author for confirmation.

(function () {
  "use strict";

  var WHATSAPP_NUMBER = "2348167822124"; // international format, no leading +

  var acctNumberEl = document.getElementById("acctNumber");
  var copyBtn = document.getElementById("copyAcctBtn");
  var confirmBtn = document.getElementById("confirmBtn");
  var nameInput = document.getElementById("buyerName");
  var emailInput = document.getElementById("buyerEmail");
  var statusEl = document.getElementById("formStatus");

  // ---- Copy account number ----
  if (copyBtn && acctNumberEl) {
    copyBtn.addEventListener("click", function () {
      var text = acctNumberEl.textContent.trim();

      function fallbackCopy() {
        var ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); } catch (e) { /* no-op */ }
        document.body.removeChild(ta);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).catch(fallbackCopy);
      } else {
        fallbackCopy();
      }

      var original = copyBtn.textContent;
      copyBtn.textContent = "Copied!";
      copyBtn.disabled = true;
      setTimeout(function () {
        copyBtn.textContent = original;
        copyBtn.disabled = false;
      }, 1800);
    });
  }

  // ---- WhatsApp payment confirmation ----
  if (confirmBtn) {
    confirmBtn.addEventListener("click", function () {
      var name = (nameInput && nameInput.value.trim()) || "";
      var email = (emailInput && emailInput.value.trim()) || "";

      if (!name || !email) {
        statusEl.textContent = "Please fill in your name and email above first — Kunle needs these to match your payment and send your book.";
        statusEl.style.color = "#8B2E1A";
        (name ? emailInput : nameInput).focus();
        return;
      }

      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        statusEl.textContent = "That email address doesn't look complete — please double-check it.";
        statusEl.style.color = "#8B2E1A";
        emailInput.focus();
        return;
      }

      var lines = [
        "Hello Kunle, I just paid \u20A63,500 for STUBBORN FOR GREATNESS.",
        "",
        "Name on payment receipt: " + name,
        "Email for delivery: " + email,
        "",
        "Attaching my payment screenshot now."
      ];
      var message = encodeURIComponent(lines.join("\n"));
      var url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + message;

      window.open(url, "_blank", "noopener");

      statusEl.style.color = "#1E5C45";
      statusEl.textContent = "Opening WhatsApp... attach your payment screenshot there to complete your order.";
    });
  }
})();
