function jourtravaille() {
  const annee = 2020;
  const JoursFerieEnNumerique = [
    1, 103, 121, 128, 141, 152, 195, 227, 305, 315, 359,
  ];

  for (let jour = 1; jour <= 365; jour++) {
    let mois = 1,
      jourDuMois = jour;
    for (; mois <= 12; mois++) {
      const joursDansMois = new Date(annee, mois, 0).getDate();
      if (jourDuMois > joursDansMois) {
        jourDuMois -= joursDansMois;
      } else {
        break;
      }
    }

    const date = new Date(annee, mois - 1, jourDuMois);
    const estWeekend = date.getDay() === 0 || date.getDay() === 6;
    const estJourFerie = JoursFerieEnNumerique.includes(jour);

    if (estWeekend) {
      console.log(`${jourDuMois}/${mois}/${annee} est un weekend.`);
    } else if (estJourFerie) {
      console.log(`${jourDuMois}/${mois}/${annee} est un jour férié.`);
    } else {
      console.log(`${jourDuMois}/${mois}/${annee} est un jour travaillé.`);
    }
  }
}
jourtravaille();
