import { DepartementETS, prisma } from "./index";

async function main() {
  const departments = [
    {
      id: "ele",
      type: DepartementETS.ELE,
    },
    {
      id: "log_ti",
      type: DepartementETS.LOG_TI,
    },
    {
      id: "mec",
      type: DepartementETS.MEC,
    },
    {
      id: "gpa",
      type: DepartementETS.GPA,
    },
    {
      id: "gol",
      type: DepartementETS.GOL,
    },
    {
      id: "ctn",
      type: DepartementETS.CTN,
    },
  ];

  const thematics = [
    {
      name: "Télécommunication",
      departmentId: "ele",
    },
    {
      name: "Information",
      departmentId: "ele",
    },
    {
      name: "Technologie de la santé",
      departmentId: "ele",
    },
    {
      name: "Énergie",
      departmentId: "ele",
    },
    {
      name: "Systèmes embarqués",
      departmentId: "ele",
    },
    {
      name: "Aérospatiale",
      departmentId: "ele",
    },
    {
      name: "Contrôle",
      departmentId: "ele",
    },
    {
      name: "Microélectronique",
      departmentId: "ele",
    },
    {
      name: "Optique / Photonique",
      departmentId: "ele",
    },
    {
      name: "Transport",
      departmentId: "ele",
    },
    {
      name: "Commande / Automatisation / Robotique",
      departmentId: "ele",
    },
    {
      name: "Intelligence artificielle",
      departmentId: "ele",
    },
    {
      name: "Modélisation des données du bâtiment (BIM)",
      departmentId: "ctn",
    },
    {
      name: "Rénovation de bâtiments historiques",
      departmentId: "ctn",
    },
    {
      name: "Analyse des impacts environnementaux de la construction",
      departmentId: "ctn",
    },
    {
      name: "Gestion des matières résiduelles",
      departmentId: "ctn",
    },
    {
      name: "Inspection et analyse de fondations",
      departmentId: "ctn",
    },
    {
      name: "Construction de barrages hydroélectriques",
      departmentId: "ctn",
    },
    {
      name: "Réseaux d'approvisionnement et d'évacuation des eaux",
      departmentId: "ctn",
    },
    {
      name: "Mécanique des sols",
      departmentId: "ctn",
    },
    {
      name: "Environnement",
      departmentId: "ctn",
    },
    {
      name: "Conception routière",
      departmentId: "ctn",
    },
    {
      name: "Thermique et sciences du bâtiment",
      departmentId: "ctn",
    },
    {
      name: "Gestion des contrats de construction",
      departmentId: "ctn",
    },
    {
      name: "Développement Web",
      departmentId: "log_ti",
    },
    {
      name: "Développement d'applications mobiles",
      departmentId: "log_ti",
    },
    {
      name: "Infrastructures et services TI",
      departmentId: "log_ti",
    },
    {
      name: "Internet des objets (IoT)",
      departmentId: "log_ti",
    },
    {
      name: "Intelligence artificielle (IA)",
      departmentId: "log_ti",
    },
    {
      name: "Cybersécurité",
      departmentId: "log_ti",
    },
    {
      name: "Systèmes embarqués",
      departmentId: "log_ti",
    },
    {
      name: "Architecture Cloud",
      departmentId: "log_ti",
    },
    {
      name: "Analyse de données (Data Analytics)",
      departmentId: "log_ti",
    },
    {
      name: "Réseaux et télécommunications",
      departmentId: "log_ti",
    },
    {
      name: "Développement de jeux",
      departmentId: "log_ti",
    },
    {
      name: "Sciences des données (Data Science)",
      departmentId: "log_ti",
    },
    {
      name: "Algorithmique",
      departmentId: "log_ti",
    },
    {
      name: "Systèmes mécaniques",
      departmentId: "mec",
    },
    {
      name: "Contraintes mécaniques",
      departmentId: "mec",
    },
    {
      name: "Résistance des structures",
      departmentId: "mec",
    },
    {
      name: "Robotique",
      departmentId: "mec",
    },
    {
      name: "Modélisation 3D",
      departmentId: "mec",
    },
    {
      name: "Diagnostic de défaillances",
      departmentId: "mec",
    },
    {
      name: "Études de faisabilité",
      departmentId: "mec",
    },
    {
      name: "Aérospatiale",
      departmentId: "mec",
    },
    {
      name: "Automobile",
      departmentId: "mec",
    },
    {
      name: "Transport et Bâtiment",
      departmentId: "mec",
    },
    {
      name: "Fabrication",
      departmentId: "mec",
    },
    {
      name: "Santé",
      departmentId: "mec",
    },
    {
      name: "Amélioration continue des processus",
      departmentId: "gol",
    },
    {
      name: "Systèmes intégrés de gestion d'entreprise",
      departmentId: "gol",
    },
    {
      name: "Chaîne logistique aéronautique",
      departmentId: "gol",
    },
    {
      name: "Gestion des opérations hospitalières",
      departmentId: "gol",
    },
    {
      name: "Transport en commun et mobilité durable",
      departmentId: "gol",
    },
    {
      name: "Logistique internationale",
      departmentId: "gol",
    },
    {
      name: "Conception systèmes industriels",
      departmentId: "gol",
    },
    {
      name: "Réingénierie processus et transformation numérique",
      departmentId: "gol",
    },
    {
      name: "Planification et contrôle opérations",
      departmentId: "gol",
    },
    {
      name: "Chaînes logistiques et approvisionnement",
      departmentId: "gol",
    },
    {
      name: "Conception systèmes information et forage données",
      departmentId: "gol",
    },
    {
      name: "Gestion projets produits et services",
      departmentId: "gol",
    },
    {
      name: "Systèmes de production",
      departmentId: "gpa",
    },
    {
      name: "Manufacture",
      departmentId: "gpa",
    },
    {
      name: "Hydraulique et pneumatique",
      departmentId: "gpa",
    },
    {
      name: "Microsystèmes",
      departmentId: "gpa",
    },
    {
      name: "Analyse des circuits électriques",
      departmentId: "gpa",
    },
    {
      name: "Biomédicale",
      departmentId: "gpa",
    },
    {
      name: "Vision artificielle",
      departmentId: "gpa",
    },
    {
      name: "Fabrication assistée par ordinateur",
      departmentId: "gpa",
    },
    {
      name: "Capteurs et actionneurs",
      departmentId: "gpa",
    },
    {
      name: "Conception de machines",
      departmentId: "gpa",
    },
    {
      name: "Algorithmes embarqués en robotique",
      departmentId: "gpa",
    },
    {
      name: "Objets connectés",
      departmentId: "gpa",
    },
  ];

  const departmentOperations = departments.map((department) =>
    prisma.department.upsert({
      where: { id: department.id },
      update: department,
      create: department,
    }),
  );

  const thematicOperations = thematics.map((thematic) =>
    prisma.thematic.upsert({
      where: {
        name_departmentId: {
          name: thematic.name,
          departmentId: thematic.departmentId,
        },
      },
      update: thematic,
      create: thematic,
    }),
  );

  try {
    await prisma.$transaction([...departmentOperations, ...thematicOperations]);
  } catch (error) {
    console.log("Error seeding data: ", error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
