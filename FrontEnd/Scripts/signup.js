const signupForm = document.getElementById('signup-form');

signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  const q1 = document.getElementById('sec-question1').value;
  const a1 = document.getElementById('sec-answer1').value.trim();
  const q2 = document.getElementById('sec-question2').value;
  const a2 = document.getElementById('sec-answer2').value.trim();

  if (!q1 || !q2) return alert("Select both security questions");
  if (q1 === q2) return alert("Security questions must be different");

  const payload = {
    username,
    email,
    password,
    securityQuestions: [
      { question: q1, answer: a1 },
      { question: q2, answer: a2 }
    ]
  };

  try {
    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (data.success) {
      alert('Signup successful! Please log in.');
      window.location.href = 'login.html';
    } else {
      alert(data.message || 'Signup failed.');
    }
  } catch (err) {
    console.error('Signup error:', err);
    alert('Something went wrong.');
  }
});