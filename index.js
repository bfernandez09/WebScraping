const puppeteer = require('puppeteer');

async function interatorForProfesional(page, result) {
  let informacion = [];
  for (let i = 0; i < result.length; i++) {
    const element = result[i];
    await page.goto(element);

    const resultadoNumero = await page.evaluate(async () => { 
      const element = document.querySelector('[data-patient-app-event-name="dp-call-phone"]');
      if (element) {
        return element.querySelector('b').innerText; 
      }
      else{
        return "No especifica numero";
      }
    });
    const resultadoNombre = await page.evaluate(() => {
      const element = document.querySelector('div[class="unified-doctor-header-info__name"]');
      if (element) {
        return element.querySelector('span[itemprop="name"]').innerText;
      }
      else{
        return "No especifica nombre";
      }
    });
    console.log(resultadoNombre);
    const especialidades = await page.evaluate(() => {
      const elements = document.querySelector('div[data-test-id="doctor-exp-expert_in"]');
      if (elements) {
        const esp = Array.from(elements.querySelectorAll('li')).map(li => li.textContent);
        return esp;
      } else {
        return ["No especifica especialidad"];
      }
    });
    
    informacion.push({
      nombre: resultadoNombre,
      numero: resultadoNumero,
      especialidad: "Psicólogo/a",
      especialidades: especialidades,
      link: element
    });
  }
  for (let i = 0; i < informacion.length; i++) {;
    console.log(informacion[i]);
  }
}

async function openWebPage() {
  const list = [
    "psicologia",
    medicana
  ]
  // Con Browser inicializamos el navegador que utilizaremos.
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 250
  });

  // Con Page abrimos una nueva pestaña.
  const page = await browser.newPage();

  // Con el método goto navegamos a la página que le indiquemos.
  await page.goto('https://www.doctoralia.pe/buscar?q=Psic%C3%B3logo&loc=Lima&filters%5Bspecializations%5D%5B%5D=58');

  // Con el método click hacemos click en el botón que le indiquemos o cualquier elemento que necesitemos
  // hacer click, en este caso, el botón de cookies.
  await page.click('button[id="onetrust-accept-btn-handler"]');

  // Con el método evaluate podemos ejecutar código JavaScript en el navegador,
  // Esto significa que podemos obtener información de la página web, pero, todo lo que hagamos dentro del método
  // se verá reflejado dentro del navegador, por eso es importante almacenarlo en una variable. 
  const result = await page.evaluate(() => {
    const elements = document.querySelectorAll('div[class="card-body p-0"]');
    const links = [];
    for (let element of elements) {
      links.push(element.querySelector('a').href);
    }
    return links;
  });
  
  await interatorForProfesional(page, result);
  await browser.close();
}

module.exports = {
  openWebPage
};
