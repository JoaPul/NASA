//PARTICULAS
particlesJS({
  particles: {
    number: {
      value: 120,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: "#ffffff",
    },
    shape: {
      type: "star",
      stroke: {
        width: 0,
        color: "#000000",
      },
      polygon: {
        nb_sides: 5,
      },
      image: {
        src: "img/github.svg",
        width: 100,
        height: 100,
      },
    },
    opacity: {
      value: 1,
      random: true,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0,
        sync: false,
      },
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: false,
        speed: 4,
        size_min: 0.3,
        sync: false,
      },
    },
    line_linked: {
      enable: false,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 1,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 600,
      },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: false,
        mode: "bubble",
      },
      onclick: {
        enable: false,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 250,
        size: 0,
        duration: 2,
        opacity: 0,
        speed: 3,
      },
      repulse: {
        distance: 400,
        duration: 0.4,
      },
      push: {
        particles_nb: 4,
      },
      remove: {
        particles_nb: 2,
      },
    },
  },
  retina_detect: true,
});

//FUNCION PARA BUSCAR ASTEROIDES EN FECHA
const buscar = () => {
  // const axios = require("axios"); no se necesita
  document.getElementById("audio").play();

  const date = document.getElementById("date").value;

  console.log(date);

  document.getElementById("container").innerHTML = `<p><span class="Inicio" id="Inicio">...</span></p>`;

  //AQUI SACA LA INFO DE LOS COMETAS
  const config = {
    method: "GET",
    url: `https://api.nasa.gov/neo/rest/v1/feed?start_date=${date}&end_date=${date}&api_key=MettAyn1eX6YZfALmbcmb29cUVIz0V7naUipGvbF`,
    headers: {},
  };

  axios(config)
    .then((response) => {
      let add = "";
      let aste = "";

      for (let i = 0; i < response.data.near_earth_objects[date].length; i++) {
        if (response.data.near_earth_objects[date][i].is_potentially_hazardous_asteroid == true) {
          add += ` 
          <tr>
            <td>${response.data.near_earth_objects[date][i].name}</td>
            <td>${response.data.near_earth_objects[date][i].estimated_diameter.kilometers.estimated_diameter_min}
          </tr>
          `;
        }
      }
      console.log(add.length);

      //LO QUE VA ESCRITO EN LA TERMINAL y asteroides IMG
      if (add.length > 0) {
        document.getElementById("Inicio").innerHTML = "";
        let table = `
        <table>
        <tr>
          <th>Nombre</th>
          <th>Minimo diametro estimado(KM)</th>
        </tr>
          ${add}
        </table>  
        `;

        let options = {
          strings: [
            "Cargando transmision... ^5000 ",
            `CM: Aqu?? control de misi??n, respondan cambio... ^5000 <br><br> <i style="font-style: normal; color:yellow">
            D1: Aqu?? Discovery 1, te recibimos fuerte y claro Control, cambio... ^7000 </i>`,
            `CM: Nos alegra escucharlo, nos acaban de llegar los datos de meteorolog??a sobre los APP para hoy ${date}`,
            `${table} <br><br> <i onclick="Inicio()" class="reg">Click aqu?? para regresar a elegir fecha</i>`,
          ],
          typeSpeed: 75,
          contentType: "html",
          smartBackspace: false,
          fadeOut: true,
          cursorChar: "_",
        };

        let typed = new Typed(".Inicio", options);
      } else {
        let options = {
          strings: [
            "Cargando transmision... ^5000 ",
            `CM: Aqu?? control de misi??n, respondan cambio... ^5000 <br><br> <i style="font-style: normal; color:yellow">
            D1: Aqu?? Discovery 1, te recibimos fuerte y claro Control, cambio... ^7000 </i>`,
            `CM: Nos alegra escucharlo, nos acaban de llegar los datos de meteorolog??a sobre los APP para hoy ${date}`,
            `CM: No hay asteroides potenciales para hoy <br>
            <br> <i onclick="Inicio()" class="reg">Click aqu?? para regresar a elegir fecha</i>`,
          ],
          typeSpeed: 75,
          contentType: "html",
          smartBackspace: false,
          fadeOut: true,
          cursorChar: "_",
        };

        let typed = new Typed(".Inicio", options);
      }
    })
    .catch((error) => {
      let options = {
        strings: [
          "Cargando transmision... ^5000 ",
          `CM: Aqu?? control de misi??n, respondan cambio... ^5000 <br><br> <i style="font-style: normal; color:yellow">
          D1: Aqu?? Discovery 1, te recibimos fuerte y claro Control, cambio... ^7000 </i>`,
          `CM: Nos alegra escucharlo, nos acaban de llegar los datos de meteorolog??a sobre los APP para hoy`,
          `CM: No hay asteroides potencialmente peligrosos para hoy 
          <br><br> <i style="font-style: normal; color:yellow">D1:Excelente</i>
          <br><br> <i onclick="Inicio()"
          class="reg">Click aqu?? para regresar a elegir fecha</i>`,
        ],
        typeSpeed: 75,
        contentType: "html",
        smartBackspace: false,
        fadeOut: true,
        cursorChar: "_",
      };

      var typed = new Typed(".Inicio", options);
      console.log(error);
    });
};

const Inicio = () => {
  document.getElementById("container").innerHTML = `
  <div class="term" id="term">
            <h1 class="Elige" id="Elige">Elige una Fecha</h1>
            <br />
            <div class="in" id="in">
              <input type="date" class="date" id="date" placeholder="YYYY-MM-DD" />
              <button class="busqueda" id="busqueda" onclick="buscar()">Conectar</button>
            </div>
          </div>
  `;
};
//LINEA DE DESARROLLO
