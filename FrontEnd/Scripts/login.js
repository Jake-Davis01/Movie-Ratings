const loginForm = document.getElementById('login-form');
const secForm = document.getElementById('security-question-form');

let userEmail = '';

// Step 1 - check email and password
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    userEmail = email;

    try {
        const res = await fetch('http://localhost:3000/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (data.success) {
            // show security question step
            showSecurityQuestion(data.securityQuestion);
        } else {
            alert(data.error || 'Invalid email or password.');
        }
    } catch (err) {
        console.error('Login error:', err);
        alert('Something went wrong.');
    }
});

// show the security question form
function showSecurityQuestion(question) {
    loginForm.style.display = 'none';
    secForm.style.display = 'block';
    secForm.innerHTML = `
        <label>${question}</label>
        <input type="text" id="sec-answer" placeholder="Your answer" required>
        <button type="submit" class="main-btn">Verify</button>
    `;
}

// Step 2 - verify security answer
secForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const answer = document.getElementById('sec-answer').value.trim();

    try {
        const res = await fetch('http://localhost:3000/user/verify-security', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: userEmail,
                answer
            })
        });

        const data = await res.json();

        if (data.success) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            window.location.href = 'home.html';
        } else {
            alert(data.error || 'Incorrect security answer.');
        }
    } catch (err) {
        console.error('Security verification error:', err);
        alert('Something went wrong.');
    }
});

// const loginForm = document.getElementById('login-form');
// const secForm = document.getElementById('security-question-form');

// let selectedQuestion = '';
// let userEmail = '';

// // Step 1: Login with email + password
// loginForm.addEventListener('submit', async (e) => {
//   e.preventDefault();

//   const email = document.getElementById('email').value.trim();
//   const password = document.getElementById('password').value.trim();
//   userEmail = email;

//   try {
//     const res = await fetch('http://localhost:3000/user/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password })
//     });

//     const data = await res.json();

//     if (data.success) {
//       selectedQuestion = data.securityQuestion;
//       showSecurityQuestion(selectedQuestion);
//     } else {
//       alert(data.message || 'Invalid email or password.');
//     }
//   } catch (err) {
//     console.error('Login error:', err);
//     alert('Something went wrong.');
//   }
// });

// // Show security question form
// function showSecurityQuestion(question) {
//   loginForm.style.display = 'none';
//   secForm.style.display = 'block';
//   secForm.innerHTML = `
//     <label>${question}</label>
//     <input type="text" id="sec-answer" placeholder="Your answer" required>
//     <button type="submit" class="main-btn">Verify</button>
//   `;
// }

// // Step 2: Verify security answer
// secForm.addEventListener('submit', async (e) => {
//   e.preventDefault();
//   const answer = document.getElementById('sec-answer').value.trim();

//   try {
//     const res = await fetch('/api/verify-security-answer', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         email: userEmail,
//         question: selectedQuestion,
//         answer
//       })
//     });

//     const data = await res.json();
//     if (data.success) {
//       alert('Login successful!');
//       window.location.href = '/dashboard.html';
//     } else {
//       alert(data.message || 'Incorrect security answer.');
//     }
//   } catch (err) {
//     console.error('Security verification error:', err);
//     alert('Something went wrong.');
//   }
// });