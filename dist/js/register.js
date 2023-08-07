let = document.querySelector("#submitBtn")
let msg_box = document.querySelector("#msg_box")

const onSubmit = async (e) => {
  // e.preventDefault()
  submitBtn.classList.add("hidden")
  msg_box.innerHTML = `
  <div className="flex justify-center items-center mt-4">
    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-200"></div>
    <span class="text-white">Loading...</span>
  </div>
  `
  let data = {}
  let allInputs = document.querySelectorAll(".regInputs")

  allInputs.forEach(inpt => {
    data[inpt.dataset.name] = inpt.value
  })

  var selectedValues = [];

  $('input[type="checkbox"]:checked').each(function() {
    selectedValues.push($(this).val());
  });
  selectedValuesString = selectedValues.join('~')
  data['program'] = selectedValuesString

  try {
    const response = await fetch('https://registration-backend-eta.vercel.app/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    const resData = await response.json()
if (resData.status === 1) {
      console.log(resData);
      alert("User Registered Successfully !")

      window.location.reload()

    } else {
      alert("An error occurred while registering the user")
      submitBtn.classList.remove("hidden")
      msg_box.innerHTML = ``
    }

  } catch (error) {
    console.error('An error occurred while registering the user:', error);
    alert("An error occurred while registering the user")
    submitBtn.classList.remove("hidden")
    msg_box.innerHTML = ``
  }
};