
document.addEventListener("DOMContentLoaded", function () {
  // عناصر HTML المشتركة
  const signinEmail = document.getElementById("signinEmail");
  const signinPassword = document.getElementById("signinPassword");
  const incorrectsignin = document.getElementById("incorrectsignin");
  const buttonSignIn = document.getElementById("buttonSignIn");

  const signupName = document.getElementById("signupName");
  const signupEmail = document.getElementById("signupEmail");
  const signupPassword = document.getElementById("signupPassword");
  const incorrectsignup = document.getElementById("incorrectsignup");
  const buttonSignUp = document.getElementById("ButtonSignUp");

  // دالة التحقق العامة
  function validateField(field, condition, errorMessage, errorElement) {
      if (!condition) {
          field.style.border = "2px solid red";
          if (errorElement) errorElement.textContent = errorMessage;
          return false;
      } else {
          field.style.border = "2px solid green";
          if (errorElement) errorElement.textContent = "";
          return true;
      }
  }

  // ** جزء Sign In **
  if (buttonSignIn) {
      buttonSignIn.addEventListener("click", function () {
          const email = signinEmail.value.trim();
          const password = signinPassword.value.trim();
          let isValid = true;

          // تحقق من input field
          isValid = validateField(signinEmail, /^\S+@\S+\.\S+$/.test(email), "Invalid email format!", incorrectsignin) && isValid;
          isValid = validateField(signinPassword, password !== "", "Password is required!", incorrectsignin) && isValid;

          if (!isValid) return;

          // جلب بيانات المستخدمين
          const users = JSON.parse(localStorage.getItem("users")) || [];
          const user = users.find(user => user.email === email && user.password === password);

          if (user) {
              alert(`Welcome Sir, ${user.name}!`);
                signinEmail.value = "";
                signinPassword.value = ""
           
          } else {
              incorrectsignin.textContent = "Incorrect email or password!";
          }
      });

      // تحقق فوري من الإيميل أثناء الكتابة
      signinEmail.addEventListener("input", function () {
          validateField(signinEmail, /^\S+@\S+\.\S+$/.test(signinEmail.value.trim()), "", null);
      });
  }

  // ** جزء Sign Up **
  if (buttonSignUp) {
      buttonSignUp.addEventListener("click", function () {
          const name = signupName.value.trim();
          const email = signupEmail.value.trim();
          const password = signupPassword.value.trim();
          let isValid = true;

          // تحقق من input field
          isValid = validateField(signupName, name !== "", "Name is required!", incorrectsignup) && isValid;
          isValid = validateField(signupEmail, /^\S+@\S+\.\S+$/.test(email), "Invalid email!", incorrectsignup) && isValid;
          isValid = validateField(signupPassword, password.length >= 6, "Password must be at least 6 characters!", incorrectsignup) && isValid;

          if (!isValid) return;

          // جلب بيانات المستخدمين
          let users = JSON.parse(localStorage.getItem("users")) || [];

          // تحقق من أن الإيميل غير مستخدم
          if (users.some(user => user.email === email)) {
              incorrectsignup.textContent = "This email is already taken!";
              signupEmail.style.border = "2px solid red";
              return;
          }

          // إضافة المستخدم الجديد
          users.push({ name, email, password });
          localStorage.setItem("users", JSON.stringify(users));

          alert("Sign up successful! Redirecting to login page...");
          window.location.href = "index.html"; // الانتقال لصفحة تسجيل الدخول
      });

      // تحقق فوري أثناء الكتابة
      signupName.addEventListener("input", function () {
          validateField(signupName, signupName.value.trim() !== "", "", null);
      });

      signupEmail.addEventListener("input", function () {
          validateField(signupEmail, /^\S+@\S+\.\S+$/.test(signupEmail.value.trim()), "", null);
      });

      signupPassword.addEventListener("input", function () {
          validateField(signupPassword, signupPassword.value.trim().length >= 6, "", null);
      });
  }
});








