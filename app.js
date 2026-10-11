// Web3 Internship Week 1 - Interactive Smart Contract Sandbox
document.addEventListener('DOMContentLoaded', () => {
  let storedValue = 42;
  let blockNumber = 5820491;

  // DOM Elements
  const currentStateVal = document.getElementById('current-state-val');
  const readValDisplay = document.getElementById('read-val-display');
  const readResult = document.getElementById('read-result');
  const btnCallGetValue = document.getElementById('btn-call-getvalue');
  const inputNewVal = document.getElementById('input-new-val');
  const btnCallSetValue = document.getElementById('btn-call-setvalue');
  const btnCopySol = document.getElementById('btn-copy-sol');
  const solCode = document.getElementById('sol-code');

  const rxHash = document.getElementById('rx-hash');
  const rxBlock = document.getElementById('rx-block');
  const rxGas = document.getElementById('rx-gas');
  const rxEvent = document.getElementById('rx-event');
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toast-text');

  // Copy Solidity Code
  btnCopySol.addEventListener('click', () => {
    navigator.clipboard.writeText(solCode.textContent).then(() => {
      showToast('Solidity code copied to clipboard!');
    }).catch(() => {
      showToast('Copied code!');
    });
  });

  function showToast(msg) {
    toastText.textContent = msg;
    toast.classList.remove('hidden');
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 2800);
  }

  // Call getValue() [view function]
  btnCallGetValue.addEventListener('click', () => {
    readValDisplay.textContent = storedValue;
    readResult.classList.remove('hidden');
  });

  // Call setValue(uint256) [state changing transaction]
  btnCallSetValue.addEventListener('click', () => {
    const newVal = parseInt(inputNewVal.value, 10);
    if (isNaN(newVal)) {
      alert('Please enter a valid uint256 number.');
      return;
    }

    storedValue = newVal;
    blockNumber += 1;
    currentStateVal.textContent = storedValue;
    readValDisplay.textContent = storedValue;

    // Generate simulated Tx Hash
    const randomHash = '0x' + Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const randomGas = Math.floor(26000 + Math.random() * 5000).toLocaleString();

    rxHash.textContent = `${randomHash.substring(0, 10)}...${randomHash.substring(58)}`;
    rxBlock.textContent = `#${blockNumber}`;
    rxGas.textContent = `${randomGas} gas`;
    rxEvent.textContent = `ValueChanged(0x742d...f44e, ${storedValue})`;

    showToast(`Tx Confirmed! Stored value set to ${storedValue}`);
  });
});
