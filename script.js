document.addEventListener("DOMContentLoaded", () => {

  // =====================================
  // CONFIGURACIÓN DE WHATSAPP
  // =====================================

  const numeroWhatsApp = "573001640580";

  function enviarWhatsApp(mensaje) {
    const enlace = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    window.open(enlace, "_blank");
  }

  // =====================================
  // MENÚ PARA CELULARES
  // =====================================

  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    menuToggle.textContent =
      navLinks.classList.contains("active") ? "✕" : "☰";
  });

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuToggle.textContent = "☰";
    });
  });

  // =====================================
  // SELECCIÓN DE CURSOS
  // =====================================

  const botonesCursos = document.querySelectorAll(".course-btn");
  const idiomaSelect = document.getElementById("idioma");

  botonesCursos.forEach(boton => {
    boton.addEventListener("click", () => {
      const curso = boton.dataset.course;

      if (curso.startsWith("Inglés")) {
        idiomaSelect.value = "Inglés";
      } else if (curso.startsWith("Francés")) {
        idiomaSelect.value = "Francés";
      } else if (curso.startsWith("Portugués")) {
        idiomaSelect.value = "Portugués";
      }
    });
  });

  // =====================================
  // TEST DE NIVEL - 10 PREGUNTAS
  // =====================================

  const preguntas = [
    {
      pregunta: "Choose the correct option: She ___ a student.",
      opciones: ["am", "is", "are", "be"],
      respuesta: 1
    },
    {
      pregunta: "What is the plural of 'child'?",
      opciones: ["Childs", "Childes", "Children", "Childrens"],
      respuesta: 2
    },
    {
      pregunta: "Complete: I have lived here ___ 2020.",
      opciones: ["for", "since", "during", "from"],
      respuesta: 1
    },
    {
      pregunta: "Choose the correct sentence.",
      opciones: [
        "He don't like coffee.",
        "He doesn't likes coffee.",
        "He doesn't like coffee.",
        "He not like coffee."
      ],
      respuesta: 2
    },
    {
      pregunta: "What does 'although' mean?",
      opciones: ["Porque", "Aunque", "Entonces", "Después"],
      respuesta: 1
    },
    {
      pregunta: "Complete: If I had more time, I ___ travel.",
      opciones: ["will", "would", "am", "have"],
      respuesta: 1
    },
    {
      pregunta: "Choose the correct passive sentence.",
      opciones: [
        "The book wrote yesterday.",
        "The book was written yesterday.",
        "The book is write yesterday.",
        "The book writing yesterday."
      ],
      respuesta: 1
    },
    {
      pregunta: "What does 'reliable' mean?",
      opciones: ["Confiable", "Rápido", "Costoso", "Difícil"],
      respuesta: 0
    },
    {
      pregunta: "Complete: By next year, she ___ graduated.",
      opciones: [
        "will have",
        "has",
        "would",
        "is"
      ],
      respuesta: 0
    },
    {
      pregunta: "Choose the correct expression.",
      opciones: [
        "Despite of the rain",
        "Despite the rain",
        "Although the rain",
        "In spite the rain"
      ],
      respuesta: 1
    }
  ];

  let preguntaActual = 0;
  let puntuacion = 0;
  let respuestaSeleccionada = null;

  const startQuiz = document.getElementById("startQuiz");
  const quizContent = document.getElementById("quizContent");
  const quizResult = document.getElementById("quizResult");
  const questionNumber = document.getElementById("questionNumber");
  const progressBar = document.getElementById("progressBar");

  startQuiz.addEventListener("click", iniciarTest);

  function iniciarTest() {
    preguntaActual = 0;
    puntuacion = 0;
    respuestaSeleccionada = null;

    quizContent.classList.remove("hidden");
    quizResult.classList.add("hidden");

    mostrarPregunta();
  }

  function mostrarPregunta() {

    const pregunta = preguntas[preguntaActual];

    respuestaSeleccionada = null;

    questionNumber.textContent =
      `${preguntaActual + 1} / ${preguntas.length}`;

    progressBar.style.width =
      `${(preguntaActual / preguntas.length) * 100}%`;

    quizContent.innerHTML = `
      <div class="question-text">
        ${preguntaActual + 1}. ${pregunta.pregunta}
      </div>

      <div class="answers">
        ${pregunta.opciones.map((opcion, indice) => `
          <button type="button" class="answer" data-index="${indice}">
            ${String.fromCharCode(65 + indice)}. ${opcion}
          </button>
        `).join("")}
      </div>

      <div class="quiz-actions">
        <button class="btn btn-blue" id="nextQuestion" disabled>
          ${preguntaActual === preguntas.length - 1
            ? "Ver resultado"
            : "Siguiente pregunta →"}
        </button>
      </div>
    `;

    const botonesRespuestas =
      quizContent.querySelectorAll(".answer");

    const botonSiguiente =
      document.getElementById("nextQuestion");

    botonesRespuestas.forEach(boton => {
      boton.addEventListener("click", () => {

        botonesRespuestas.forEach(b => {
          b.classList.remove("selected");
        });

        boton.classList.add("selected");

        respuestaSeleccionada =
          Number(boton.dataset.index);

        botonSiguiente.disabled = false;
      });
    });

    botonSiguiente.addEventListener("click", () => {

      if (respuestaSeleccionada === null) return;

      if (respuestaSeleccionada === pregunta.respuesta) {
        puntuacion++;
      }

      preguntaActual++;

      if (preguntaActual < preguntas.length) {
        mostrarPregunta();
      } else {
        mostrarResultado();
      }
    });
  }

  function mostrarResultado() {

    quizContent.classList.add("hidden");
    quizResult.classList.remove("hidden");

    progressBar.style.width = "100%";
    questionNumber.textContent = "10 / 10";

    let nivel = "";
    let descripcion = "";

    if (puntuacion <= 3) {
      nivel = "Básico";
      descripcion =
        "Tienes una buena oportunidad para comenzar con las bases del idioma y fortalecer tus conocimientos.";
    } else if (puntuacion <= 7) {
      nivel = "Intermedio";
      descripcion =
        "Tienes conocimientos previos. Puedes continuar mejorando tu comprensión y comunicación.";
    } else {
      nivel = "Avanzado";
      descripcion =
        "Demuestras un buen dominio de los conocimientos evaluados. Puedes continuar perfeccionando tus habilidades.";
    }

    quizResult.innerHTML = `
      <div class="quiz-symbol">🏆</div>

      <h3>¡Test completado!</h3>

      <span class="result-score">
        ${puntuacion} / 10
      </span>

      <h3>Nivel sugerido: ${nivel}</h3>

      <p>${descripcion}</p>

      <p>
        Este resultado es orientativo y no reemplaza
        una evaluación oficial de cada idioma.
      </p>

      <button class="btn btn-blue" id="contactQuiz">
        Consultar mi nivel por WhatsApp
      </button>

      <br><br>

      <button class="btn btn-gold" id="retryQuiz">
        Repetir test
      </button>
    `;

    document.getElementById("contactQuiz").addEventListener("click", () => {
      enviarWhatsApp(
        `Hola Lingua Plus. Realicé el test de nivel y obtuve ${puntuacion}/10. Mi nivel sugerido es ${nivel}. Quisiera recibir información sobre los cursos.`
      );
    });

    document.getElementById("retryQuiz").addEventListener("click", iniciarTest);
  }

  // =====================================
  // FORMULARIO DE PREINSCRIPCIÓN
  // =====================================

  const registrationForm =
    document.getElementById("registrationForm");

  const formMessage =
    document.getElementById("formMessage");

  registrationForm.addEventListener("submit", event => {

    event.preventDefault();

    if (!registrationForm.reportValidity()) {
      return;
    }

    const nombre =
      document.getElementById("nombre").value.trim();

    const correo =
      document.getElementById("correo").value.trim();

    const telefono =
      document.getElementById("telefono").value.trim();

    const idioma =
      document.getElementById("idioma").value;

    const nivel =
      document.getElementById("nivel").value;

    const horario =
      document.getElementById("horario").value;

    const acepta =
      document.getElementById("acepta").checked;

    if (
      nombre.length < 3 ||
      !correo ||
      !telefono ||
      !idioma ||
      !nivel ||
      !horario ||
      !acepta
    ) {
      formMessage.textContent =
        "Por favor, completa todos los campos correctamente.";

      formMessage.style.color = "#c0392b";
      return;
    }

    const mensaje = `
Hola Lingua Plus. Quiero realizar una preinscripción.

DATOS DEL ESTUDIANTE

Nombre: ${nombre}
Correo: ${correo}
Teléfono: ${telefono}

INFORMACIÓN DEL CURSO

Idioma: ${idioma}
Nivel: ${nivel}
Horario preferido: ${horario}

Quisiera recibir información sobre disponibilidad y proceso de inscripción.

¡Muchas gracias!
    `.trim();

    formMessage.textContent =
      "¡Datos validados! Se abrirá WhatsApp para enviar tu solicitud.";

    formMessage.style.color = "#16834a";

    enviarWhatsApp(mensaje);

    registrationForm.reset();
  });

});