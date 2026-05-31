/**
 * Seed content for the `portfolio` single type.
 *
 * Mirrors a real published portfolio so a clean clone shows content without any
 * manual admin step. `technologies` is an array (the shape the SPA renders);
 * a couple of "fi" ligature drops and a `portfolio` keyword typo from the
 * original copy were corrected here.
 */

const paragraph = (text: string) => ({
  type: "paragraph" as const,
  children: [{ type: "text" as const, text }],
});

export const portfolioSeed = {
  aboutMe: [
    paragraph(
      "Ingeniero de Software Frontend con 4 años de experiencia construyendo aplicaciones web y móviles de gran escala para el sector financiero. Especializado en Angular, TypeScript, JavaScript y RxJS, con experiencia en arquitecturas de microfrontends, desarrollo de sistemas de diseño con PrimeNG y Storybook, gestión reactiva de estado mediante Angular Signals, integraciones en tiempo real con WebSockets y desarrollo de aplicaciones móviles híbridas con Ionic y Flutter. Aplico Clean Architecture, principios SOLID y patrones de diseño para construir interfaces escalables, mantenibles y de alto rendimiento.",
    ),
  ],
  contactInformation: {
    email: "gjoiver@gmail.com",
    phone: "3218171818",
    socialMedia: {
      github: "https://github.com/gjoiver",
      linkedin: "https://linkedin.com/in/gjoiver",
    },
  },
  skills: [
    { name: "Angular", level: "Advanced" },
    { name: "HTML", level: "Advanced" },
    { name: "CSS", level: "Advanced" },
    { name: "Ionic", level: "Advanced" },
    { name: "Microfrontends", level: "Advanced" },
  ],
  experience: [
    {
      title: "Desarrollador FrontEnd",
      company: "Pragma S.A",
      duration: "2022-04-12 - Actualidad",
      responsibilities: [
        paragraph(
          "Desarrollé un sistema de facturación dinámica en Angular con configuración remota de parámetros, reduciendo el tiempo de entrega de nuevas funcionalidades en un 80%.",
        ),
        paragraph(
          "Construí Nequiz, una plataforma de quizzes interactivos en Angular con animaciones en Lottie, desplegada en AWS (S3 + CloudFront), presentada por Nequi durante su exposición en el evento AWS Community Day.",
        ),
        paragraph(
          "Desarrollé un chatbot conversacional sobre temas de emprendimiento con JavaScript, HTML y WebSockets para comunicación en tiempo real, presentado por Nequi en el evento Bintech de Bancolombia.",
        ),
        paragraph(
          "Construí el Módulo Administrativo de Nequi (MAN), plataforma en Angular con dashboards interactivos en tiempo real para la gestión y monitoreo de configuraciones operativas, implementando arquitectura de microfrontends con lazy loading integrados en una SPA principal.",
        ),
        paragraph(
          "Implementé políticas de Content Security Policy (CSP) en el MAN para mitigar ataques XSS y reforzar la seguridad de la aplicación frente a inyección de scripts y recursos no autorizados.",
        ),
        paragraph(
          "Desarrollé y mantuve librerías del sistema de diseño de Nequi, creando componentes reutilizables con PrimeNG y estilos con PrimeFlex, documentados con Storybook para facilitar su adopción por otros equipos.",
        ),
        paragraph(
          "Implementé el módulo de recaudos masivos en Angular con integración a servicios externos (PayPal, SOAT), procesando transacciones financieras de alto volumen.",
        ),
        paragraph(
          "Desarrollé WebViews embebidos con Ionic y Cordova integrados a la app móvil de Nequi (millones de usuarios), implementando comunicación bidireccional entre WebView y código nativo.",
        ),
        paragraph(
          "Apliqué Angular Signals para gestión reactiva del estado y diseñé servicios reutilizables para generar formularios y vistas dinámicas desde esquemas JSON.",
        ),
        paragraph(
          "Mantuve cobertura superior al 90% en pruebas unitarias (Jest, Karma), realicé code reviews a compañeros del equipo, documenté arquitecturas de microfrontends y patrones de integración para apoyar el onboarding y la consistencia entre equipos, y participé en refinamientos técnicos junto con producto, UX y backend.",
        ),
      ],
    },
  ],
  seo: {
    metaTitle: "Portfolio",
    metaDescription: "Personal Portfolio",
    keywords: "portfolio, personal, angular, frontend, react, css, html",
  },
  projects: [
    {
      __component: "portfolio.project",
      title: "Flowlite - App Movil de Finanzas Personales",
      description: [
        paragraph(
          "Desarrollé app móvil con Flutter aplicando Clean Architecture y BLoC/Cubit para gestión reactiva del estado.",
        ),
        paragraph(
          "Diseñé un sistema de componentes reutilizables y navegación modular para escalar el desarrollo de nuevas pantallas con mínima fricción.",
        ),
      ],
      technologies: ["Flutter", "Dart", "Bloc"],
    },
  ],
};
