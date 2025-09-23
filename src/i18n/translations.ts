export type Lang = "en" | "es";

export const translations = {
  en: {
    nav: {
      services: "Services",
      safety: "Safety",
      process: "Process",
      faq: "FAQ",
      contact: "Contact",
    },

    hero: {
      title: "High-Rise Rope Access Window Cleaning",
      subtitle:
        "Premium facade and glass maintenance for Miami’s landmark towers. Safety-first operations, reliable schedules, and spotless results.",
      cta: "Get a quote",
      cta2: "Technical visit",
    },

    work: {
      title: "Work in progress",
      description:
        "A selection of recent jobs while our technicians were on-rope or using access systems.",
      filters: {
        all: "All",
        exterior: "Exterior",
        interior: "Interior",
        post: "Post-construction",
        maintenance: "Maintenance",
        rope: "Rope-access",
      },
    },

    trust: {
      title: "Trusted across Miami’s landmark towers",
      description:
        "We’ve completed window-cleaning programs on some of Miami’s most prestigious and technically demanding buildings, earning the trust of property managers and residents with professional service and attention to detail.",
      projects: [
        {
          name: "Residences by Armani",
          description:
            "Premium luxury residential tower with complex glass facade systems",
          image: "/projects/residences-by-armani.webp",
        },
        {
          name: "One Thousand Museum",
          description:
            "Zaha Hadid-designed architectural masterpiece requiring specialized techniques",
          image: "/projects/one-thousand-museum.webp",
        },
        {
          name: "Hard Rock Building",
          description:
            "Iconic guitar-shaped structure with unique curved glass surfaces",
          image: "/projects/hard-rock-building.webp",
        },
        {
          name: "Paramount Miami Worldcenter",
          description:
            "Ultra-modern high-rise with floor-to-ceiling window systems",
          image: "/projects/paramount-miami-worldcenter.webp",
        },
        {
          name: "Elysee Miami",
          description:
            "Waterfront luxury tower with extensive glass balcony systems",
          image: "/projects/elysee-miami.webp",
        },
      ],
    },

    about: {
      title: "Who We Are",
      body: [
        "Founded in 2015 after training in rope-access techniques alongside Spanish experts from Windows Leaders. With 10+ years in the field and over 600 buildings serviced across Miami, we’ve built a reputation for excellence and safety.",
        "We evolved from GM Windows Cleaning to BULL Vertical Services LLC, staying fully committed to quality, compliance, and safety. Our team brings professional expertise to every high-rise project throughout Miami-Dade County.",
      ],
    },

    services: {
      title: "Our Services",
      subtitle:
        "Complete rope-access solutions for Miami's high-rise buildings",
      selectedLabel: "Selected services:",
      quoteSelectedCta: "Quote for Selected Services",
      items: [
        {
          id: "window-cleaning",
          title: "Window Cleaning",
          description:
            "Professional exterior and interior window cleaning via rope access",
          benefits: [
            "Streak-free crystal clear results",
            "Access to all building levels safely",
            "Minimal disruption to building operations",
          ],
        },
        {
          id: "stain-removal",
          title: "Hard-Water Stain Removal",
          description:
            "Glass restoration and hard-water stain removal services",
          benefits: [
            "Restore glass to original clarity",
            "Specialized cleaning compounds",
            "Long-lasting protection treatments",
          ],
        },
        {
          id: "sealant-cleaning",
          title: "Sealant & Frame Cleaning",
          description: "Complete window frame and sealant maintenance",
          benefits: [
            "Extend window system lifespan",
            "Prevent water infiltration",
            "Maintain building appearance",
          ],
        },
        {
          id: "post-construction",
          title: "Post-Construction Cleaning",
          description:
            "Deep interior and exterior cleaning for new construction",
          benefits: [
            "Remove construction residue completely",
            "Prepare building for occupancy",
            "White-glove interior detailing",
          ],
        },
        {
          id: "maintenance-programs",
          title: "Maintenance Programs",
          description: "Regular quarterly and bi-annual cleaning schedules",
          benefits: [
            "Customized cleaning schedules",
            "Priority booking and pricing",
            "Consistent building appearance",
          ],
        },
        {
          id: "pressure-washing",
          title: "Pressure Washing",
          description:
            "High-rise facade and pavement pressure washing services",
          benefits: [
            "Remove dirt, mold, and stains",
            "Eco-friendly cleaning solutions",
            "Professional wastewater handling",
          ],
        },
      ],
    },

    reviews: {
      title: "What Our Clients Say",
      subtitle: "Over 600 buildings trust us to keep their windows spotless",
      items: [
        {
          id: 1,
          name: "María González",
          role: "Property Manager",
          rating: 5,
          comment:
            "Exceptional service. The BULL team is professional, punctual, and leaves our windows perfect. Safety is their priority and it shows in every job.",
        },
        {
          id: 2,
          name: "Carlos Rodriguez",
          role: "Facilities Director",
          rating: 5,
          comment:
            "We've been working with BULL for 3 years. Their rope access technique is impressive and the results speak for themselves. Highly recommended.",
        },
        {
          id: 3,
          name: "Ana Martinez",
          role: "HOA President",
          rating: 5,
          comment:
            "BULL completely transformed our building's appearance. First-class professionals with an incredible focus on details and safety.",
        },
        {
          id: 4,
          name: "Roberto Silva",
          role: "Building Manager",
          rating: 5,
          comment:
            "The best window cleaning service in Miami. The BULL team is reliable, efficient, and always meets deadlines. Excellent value for money.",
        },
      ],
      stats: {
        buildings: { value: "600+", label: "Buildings" },
        years: { value: "10+", label: "Years" },
        rating: { value: "5★", label: "Rating" },
      },
    },

    contact: {
      title: "Contact Us",
      subtitle:
        "Ready to schedule your window cleaning service? Get in touch with us today.",
      infoTitle: "Contact Information",
      infoDesc: "Contact us for quotes and inquiries",
      emailLabel: "bullverticalservice@gmail.com",
      phoneLabel: "+1 (786) 613-0866",
      locationLabel: "Miami-Dade County",
      coiNote: "COI, W-9, vendor onboarding ready.",
      whatsappCta: "Chat on WhatsApp",
      whatsappMessage:
        "Hello BULL, I would like a quote for [Building] in Miami.",
      requestTitle: "Request a Quote",
      requestDesc:
        "Complete the form below and we'll get back to you within 24 hours",
      cta: "Request Quote",
      labels: {
        name: "Full name",
        email: "Email address",
        phone: "Phone number",
        building: "Building and address",
        stories: "Floors / last cleaning date",
        notes: "Notes / preferred schedule",
      },
      select: {
        placeholder: "Select service",
        options: {
          exterior: "Exterior",
          interior: "Interior",
          post: "Post-construction",
          hard: "Hard water removal",
          pressure: "Pressure washing",
        },
      },
    },

    faq: {
      title: "Frequently Asked Questions",
      items: [
        {
          q: "What services are included in your high-rise window cleaning?",
          a: [
            "We specialize in rope-access and facade access solutions for high-rise buildings across Miami and South Florida. Our programs are tailored to your tower’s height, facade material, and access constraints.",
            [
              [
                "Exterior Window Cleaning",
                "Full exterior coverage using rope access and/or building systems (BMU, swing stage) for a consistent, streak-free finish.",
              ],
              [
                "Interior Window Cleaning",
                "Detailed cleaning of interior glass and partitions with microfiber and pure-water methods where appropriate.",
              ],
              [
                "Glass Restoration",
                "Removal of hard-water spots, mineral deposits, and construction residue with restoration-grade compounds and pads.",
              ],
              [
                "Post-Construction Cleaning",
                "Specialized removal of dust, paint overspray, silicone, and sticker residue after new builds or refurbishments.",
              ],
              [
                "Regular Maintenance Programs",
                "Custom quarterly/bi-monthly routes to keep glass clear year-round and optimize operating budgets.",
              ],
            ],
          ],
        },
        {
          id: "safety",
          q: "What safety measures do you implement during high-rise window cleaning?",
          a: [
            "Safety is non-negotiable at BULL Vertical Services. Every project is planned and supervised by experienced leads, following U.S. safety requirements and best practices for rope access and facade work.",
            [
              [
                "Two-line rope systems",
                "Independent work and safety lines with approved anchor tactics; edge protection where required.",
              ],
              [
                "Job Hazard Analysis (JHA)",
                "Site-specific risk assessment and method statement before work begins.",
              ],
              [
                "Daily gear checks",
                "Pre-use inspection of ropes, descenders, connectors, and harnesses; documented equipment logs.",
              ],
              [
                "Weather monitoring",
                "Wind and lightning thresholds with clear stop criteria for waterfront and high-exposure zones.",
              ],
              [
                "Ground control",
                "Exclusion zones, spotters, and signage to protect pedestrians and vehicles.",
              ],
              [
                "Rescue readiness",
                "On-site rescue plan and trained leads capable of rapid retrieval.",
              ],
              [
                "Licensed & insured",
                "Coverage in place for operations and liability; COIs available on request.",
              ],
            ],
            "We coordinate closely with property management to align building rules, loading dock access, and resident communications.",
          ],
        },
        {
          q: "How often should high-rise windows be cleaned?",
          a: [
            "Frequency depends on exposure (salt air, traffic, landscaping), facade design, and brand standards. As a starting point for Miami:",
            [
              [
                "Coastal / waterfront",
                "Every 2–3 months due to salt spray and windborne minerals.",
              ],
              [
                "Urban cores (Brickell / Downtown)",
                "Every 3–4 months to manage soot and dust.",
              ],
              [
                "Standard maintenance",
                "Quarterly or bi-annual cycles balance clarity and budget for most assets.",
              ],
            ],
            "We can audit your facade and propose a maintenance plan tailored to your building’s exposure and occupancy.",
          ],
        },
      ],
    },
  },

  es: {
    nav: {
      services: "Servicios",
      safety: "Seguridad",
      process: "Proceso",
      faq: "Preguntas",
      contact: "Contacto",
    },

    hero: {
      title: "Limpieza de ventanas en altura por acceso con cuerdas",
      subtitle:
        "Mantenimiento premium de fachadas y vidrio para las torres emblemáticas de Miami. Operaciones con máxima seguridad, calendarios fiables y acabados impecables.",
      cta: "Pedir presupuesto",
      cta2: "Visita técnica",
    },

    trust: {
      title: "De confianza en los rascacielos de Miami",
      description:
        "Hemos ejecutado programas de limpieza de vidrio en algunos de los edificios más prestigiosos y exigentes de Miami, ganando la confianza de administradores y residentes con un servicio profesional y atención al detalle.",
      projects: [
        {
          name: "Residences by Armani",
          description:
            "Torre residencial de lujo con sistemas complejos de fachada acristalada",
          image: "/projects/residences-by-armani.webp",
        },
        {
          name: "One Thousand Museum",
          description:
            "Obra maestra de Zaha Hadid que requiere técnicas especializadas",
          image: "/projects/one-thousand-museum.webp",
        },
        {
          name: "Hard Rock Building",
          description:
            "Icónica estructura en forma de guitarra con superficies curvas de vidrio",
          image: "/projects/hard-rock-building.webp",
        },
        {
          name: "Paramount Miami Worldcenter",
          description:
            "Rascacielos ultramoderno con sistemas de vidrio de suelo a techo",
          image: "/projects/paramount-miami-worldcenter.webp",
        },
        {
          name: "Elysee Miami",
          description:
            "Torre de lujo frente al mar con extensos sistemas de balcones acristalados",
          image: "/projects/elysee-miami.webp",
        },
      ],
    },

    about: {
      title: "Quiénes somos",
      body: [
        "Nacimos en 2015 tras formarnos en técnicas de acceso con cuerdas junto a especialistas españoles de Windows Leaders. Con más de 10 años de experiencia y más de 600 edificios atendidos en Miami, hemos consolidado una reputación de excelencia y seguridad.",
        "Evolucionamos de GM Windows Cleaning a BULL Vertical Services LLC, siempre comprometidos con la calidad, el cumplimiento y la seguridad. Nuestro equipo aporta experiencia profesional a cada proyecto en altura en todo el condado de Miami-Dade.",
      ],
    },

    services: {
      title: "Nuestros servicios",
      subtitle:
        "Soluciones completas de acceso con cuerdas para los rascacielos de Miami",
      selectedLabel: "Servicios seleccionados:",
      quoteSelectedCta: "Presupuesto de los seleccionados",
      items: [
        {
          id: "window-cleaning",
          title: "Limpieza de ventanas",
          description:
            "Limpieza profesional de vidrio exterior e interior mediante acceso con cuerdas",
          benefits: [
            "Resultados cristalinos sin marcas",
            "Acceso seguro a todos los niveles del edificio",
            "Mínimas interrupciones en la operativa",
          ],
        },
        {
          id: "stain-removal",
          title: "Eliminación de cal/óxidos",
          description:
            "Restauración de vidrio y retirada de manchas de agua dura",
          benefits: [
            "Recupera la claridad original del vidrio",
            "Compuestos de limpieza especializados",
            "Tratamientos protectores de larga duración",
          ],
        },
        {
          id: "sealant-cleaning",
          title: "Limpieza de sellantes y marcos",
          description: "Mantenimiento integral de marcos y sellantes",
          benefits: [
            "Prolonga la vida útil del sistema",
            "Previene filtraciones de agua",
            "Mantiene la apariencia del edificio",
          ],
        },
        {
          id: "post-construction",
          title: "Limpieza post-obra",
          description: "Limpieza profunda interior y exterior para obra nueva",
          benefits: [
            "Elimina completamente los residuos de obra",
            "Prepara el edificio para la ocupación",
            "Acabado interior de alto estándar",
          ],
        },
        {
          id: "maintenance-programs",
          title: "Programas de mantenimiento",
          description: "Calendarios trimestrales y semestrales",
          benefits: [
            "Rutinas a medida",
            "Prioridad en agenda y tarifas",
            "Aspecto constante del edificio",
          ],
        },
        {
          id: "pressure-washing",
          title: "Limpieza a presión",
          description: "Lavado a presión de fachada y pavimentos en altura",
          benefits: [
            "Elimina suciedad, moho y manchas",
            "Soluciones de limpieza ecoamigables",
            "Gestión profesional de aguas residuales",
          ],
        },
      ],
    },

    reviews: {
      title: "Lo que dicen nuestros clientes",
      subtitle:
        "Más de 600 edificios confían en nosotros para mantener sus ventanas impecables",
      items: [
        {
          id: 1,
          name: "María González",
          role: "Property Manager",
          rating: 5,
          comment:
            "Servicio excepcional. El equipo de BULL es profesional, puntual y deja las ventanas perfectas. La seguridad es su prioridad y se nota en cada trabajo.",
        },
        {
          id: 2,
          name: "Carlos Rodriguez",
          role: "Facilities Director",
          rating: 5,
          comment:
            "Trabajamos con BULL desde hace 3 años. Su técnica de acceso con cuerdas es impresionante y los resultados hablan por sí solos. Muy recomendables.",
        },
        {
          id: 3,
          name: "Ana Martinez",
          role: "Presidenta de la HOA",
          rating: 5,
          comment:
            "BULL transformó por completo la apariencia de nuestro edificio. Profesionales de primer nivel con un foco increíble en los detalles y la seguridad.",
        },
        {
          id: 4,
          name: "Roberto Silva",
          role: "Building Manager",
          rating: 5,
          comment:
            "El mejor servicio de limpieza de ventanas en Miami. El equipo de BULL es confiable, eficiente y siempre cumple los plazos. Excelente relación calidad-precio.",
        },
      ],
      stats: {
        buildings: { value: "600+", label: "Edificios" },
        years: { value: "10+", label: "Años" },
        rating: { value: "5★", label: "Valoración" },
      },
    },

    work: {
      title: "Trabajos en ejecución",
      description:
        "Selección de proyectos recientes con el equipo trabajando en cuerda o con sistemas de acceso.",
      filters: {
        all: "Todos",
        exterior: "Exterior",
        interior: "Interior",
        post: "Post-obra",
        maintenance: "Mantenimiento",
        rope: "Acceso con cuerdas",
      },
      // ⬇️ NUEVO
      loadMore: "Ver más",
      noImages: "No hay imágenes para este filtro.",
    },

    contact: {
      title: "Contacto",
      subtitle:
        "¿Listo para programar la limpieza de ventanas? Ponte en contacto con nosotros hoy mismo.",
      infoTitle: "Información de contacto",
      infoDesc: "Escríbenos para presupuestos y consultas",
      emailLabel: "bullverticalservice@gmail.com",
      phoneLabel: "+1 (786) 613-0866",
      locationLabel: "Condado de Miami-Dade",
      coiNote: "COI, W-9 y alta de proveedor disponibles.",
      whatsappCta: "Chatear por WhatsApp",
      whatsappMessage:
        "Hola BULL, me gustaría un presupuesto para [Edificio] en Miami.",
      requestTitle: "Solicitar presupuesto",
      requestDesc:
        "Completa el formulario y te responderemos en menos de 24 horas",
      cta: "Solicitar presupuesto",
      labels: {
        name: "Nombre completo",
        email: "Correo electrónico",
        phone: "Teléfono",
        building: "Edificio y dirección",
        stories: "Plantas / fecha de última limpieza",
        notes: "Notas / horario preferido",
      },
      select: {
        placeholder: "Selecciona el servicio",
        options: {
          exterior: "Exterior",
          interior: "Interior",
          post: "Post-obra",
          hard: "Eliminación de cal",
          pressure: "Limpieza a presión",
        },
      },
    },

    faq: {
      title: "Preguntas frecuentes",
      items: [
        {
          q: "¿Qué servicios incluye vuestra limpieza de ventanas en altura?",
          a: [
            "Somos especialistas en acceso con cuerdas y soluciones de acceso a fachada para edificios en altura en Miami y el sur de Florida. Adaptamos cada programa a la altura, material de fachada y accesos de tu torre.",
            [
              [
                "Limpieza exterior de vidrio",
                "Cobertura total por acceso con cuerdas y/o sistemas del edificio (BMU, andamio colgante) para un acabado homogéneo y sin marcas.",
              ],
              [
                "Limpieza interior de vidrio",
                "Limpieza detallada de cristales y mamparas interiores con microfibra y agua pura cuando corresponde.",
              ],
              [
                "Restauración de vidrio",
                "Eliminación de cal, depósitos minerales y restos de obra con compuestos y pads de restauración.",
              ],
              [
                "Limpieza post-obra",
                "Retirada especializada de polvo, pintura pulverizada, silicona y adhesivos tras obra nueva o reforma.",
              ],
              [
                "Programas de mantenimiento",
                "Rutas trimestrales/bimensuales a medida para mantener el vidrio nítido todo el año y optimizar el presupuesto.",
              ],
            ],
          ],
        },
        {
          id: "safety",
          q: "¿Qué medidas de seguridad aplicáis durante la limpieza en altura?",
          a: [
            "La seguridad es innegociable en BULL Vertical Services. Cada proyecto se planifica y supervisa por jefes de equipo experimentados, siguiendo la normativa estadounidense y las mejores prácticas del sector.",
            [
              [
                "Sistema de doble cuerda",
                "Líneas de trabajo y de seguridad independientes con anclajes aprobados; protección de cantos cuando es necesario.",
              ],
              [
                "Análisis de riesgos (JHA)",
                "Evaluación específica del lugar y procedimiento de trabajo antes de comenzar.",
              ],
              [
                "Revisión diaria del equipo",
                "Inspección previa de cuerdas, descensores, conectores y arneses; registros documentados.",
              ],
              [
                "Control meteorológico",
                "Umbrales de viento/tormenta con criterios de parada claros en zonas expuestas o frente al mar.",
              ],
              [
                "Control en superficie",
                "Zonas de exclusión, señalización y vigilantes para proteger a peatones y vehículos.",
              ],
              [
                "Preparación de rescate",
                "Plan de rescate in situ y responsables formados para recuperación rápida.",
              ],
              [
                "Licencias y seguros",
                "Coberturas vigentes de operación y responsabilidad civil; certificados a petición.",
              ],
            ],
            "Coordinamos con administración de fincas para ajustar normas del edificio, muelles de carga y comunicación con residentes.",
          ],
        },
        {
          q: "¿Cada cuánto hay que limpiar las ventanas en un edificio en altura?",
          a: [
            "Depende de la exposición (salitre, tráfico, jardinería), el diseño de la fachada y los estándares de marca. Como referencia para Miami:",
            [
              [
                "Costa / primera línea",
                "Cada 2–3 meses por el salitre y los minerales arrastrados por el viento.",
              ],
              [
                "Centros urbanos (Brickell / Downtown)",
                "Cada 3–4 meses para controlar hollín y polvo.",
              ],
              [
                "Mantenimiento estándar",
                "Ciclos trimestrales o semestrales equilibran claridad y presupuesto.",
              ],
            ],
            "Podemos auditar tu fachada y proponer un plan a medida según exposición y ocupación del edificio.",
          ],
        },
      ],
    },
  },
} as const;
