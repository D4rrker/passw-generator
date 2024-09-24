const range = document.getElementById("range");
const spanRange = document.getElementById("span-range");

const mainInput = document.querySelector(".content-input input");

// Función para actualizar la longitud de la contraseña
function updateLengthDisplay(value) {
  spanRange.innerHTML = `${value}`;
}

// Evento al cambiar la longitud de la contraseña mediante el slider
range.addEventListener("input", () => {
  updateLengthDisplay(range.value);
  generatePassword();
});

// Primera ejecución, se genera la contraseña y se actualiza el display
updateLengthDisplay(range.value);
generatePassword();

// --------------------------------------------------------------------------------

// Función para filtrar los switches que estén activados
function checkSwitches() {
  const uppercaseSwitch = document.getElementById("uppercase-switch");
  const numberSwitch = document.getElementById("number-switch");
  const simbolSwitch = document.getElementById("simbol-switch");


  // Array de objetos con los switches
  const switches = [
    { switch: uppercaseSwitch.checked, simbol: "ABCDEFGHIJKLMNOPQRSTUVWXYZ", name: "uppercase" },
    { switch: numberSwitch.checked, simbol: "1234567890", name: "number" },
    { switch: simbolSwitch.checked, simbol: "@#?!\/&%$¿*", name: "simbol" },
    { switch: true, simbol: "abcdefghijklmnopqrstuvwxyz", name: "lowercase" },
  ]

  // Filtro de los switches que estén activados
  const switchesCheckFilter = switches.filter((switchItem) => switchItem.switch === true);
  return switchesCheckFilter;
}


// Funcion para generar la contraseña
function generatePassword() {
  if (range.value > 25 || range.value < 6) return;

  let password = "";

  const switches = checkSwitches();
  const switchesLength = switches.length;

  if (!switchesLength) return;
  
  for (let i = 0; i < range.value; i++) {
    const randomSwitch = Math.floor(Math.random() * switchesLength);  // Obtener un número aleatorio entre 0 y el número de switches
    const switchSelected = switches[randomSwitch];  // Obtener el switch seleccionado
    
    const randomNumberSimbolSelected = Math.floor(Math.random() * switchSelected.simbol.length) // Obtener un número aleatorio entre 0 y el número de simbolos
    password += switchSelected.simbol[randomNumberSimbolSelected];  // Agregar el simbolo seleccionado al password
  }

  const newPassw = mainInput.value = password;
  copyToClipboard(newPassw)
}

// Función para copiar el texto al portapapeles
function copyToClipboard(text) {
  let clicked = false;

  const copy = document.querySelector(".content-copy");
  copy.addEventListener("click", () => {
    if (clicked) return; // Evitar clics múltiples en los 3 segundos

    navigator.clipboard.writeText('')
      .then(() => {
        return navigator.clipboard.writeText(text); // Copiar el texto deseado
      })
      .then(() => {
        clicked = true;
        copy.classList.add("disabled"); // Desactivar el botón visualmente

        // Evento para activar el botón de copiar después de 3 segundos
        setTimeout(() => {
          clicked = false;
          copy.classList.remove("disabled"); // Reactivar el botón visualmente
        }, 1500);
      })
      .catch(err => {
        console.error("Error al copiar el texto:", err); // Manejo de errores
      });
  });
}

// Evento al generar la contraseña
const btnGenerate = document.querySelector(".container-button button");
btnGenerate.addEventListener("click", () => {
  generatePassword()
});

// Evento al cambiar el estado de los switches, se vuelve a generar la contraseña si se cambia alguno
const allSwitches = document.querySelectorAll(".switch-verify");
allSwitches.forEach((switchItem) => {
  switchItem.addEventListener("change", () => {
    generatePassword();
  });
});
