/**
 * js/dialog.js — Styled confirm dialog
 *
 * Usage:
 *   const confirmed = await showDialog({
 *     message:      "Are you sure?",
 *     confirmLabel: "Yes, do it",
 *     cancelLabel:  "Cancel",
 *   });
 *   if (confirmed) { ... }
 */

let _resolve = null;

/**
 * Show the styled confirm dialog and return a Promise<boolean>.
 * Resolves true if the user confirms, false if they cancel or press Escape.
 *
 * @param {{ message: string, confirmLabel?: string, cancelLabel?: string }} opts
 * @returns {Promise<boolean>}
 */
export function showDialog({ message, confirmLabel = "Confirm", cancelLabel = "Cancel" }) {
  return new Promise(resolve => {
    _resolve = resolve;
    document.getElementById("dialogMessage").innerHTML      = message;
    document.getElementById("dialogConfirmBtn").textContent = confirmLabel;
    document.getElementById("dialogCancelBtn").textContent  = cancelLabel;
    document.getElementById("dialogOverlay").classList.remove("hidden");
    // Focus cancel so Enter doesn't accidentally confirm
    document.getElementById("dialogCancelBtn").focus();
  });
}

/**
 * Wire up the dialog's buttons and backdrop click.
 * Call once during app init.
 */
export function initDialog() {
  document.getElementById("dialogConfirmBtn").addEventListener("click", () => _settle(true));
  document.getElementById("dialogCancelBtn").addEventListener("click",  () => _settle(false));

  document.getElementById("dialogOverlay").addEventListener("click", e => {
    if (e.target === document.getElementById("dialogOverlay")) _settle(false);
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" &&
        !document.getElementById("dialogOverlay").classList.contains("hidden")) {
      _settle(false);
    }
  });
}

function _settle(value) {
  document.getElementById("dialogOverlay").classList.add("hidden");
  if (_resolve) {
    _resolve(value);
    _resolve = null;
  }
}
