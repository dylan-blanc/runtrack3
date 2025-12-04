function jourtravaille() {
    const annee = 2020;
    
    const MoisNumerique = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const JoursFerieEnNumerique = [
        1, 103, 121, 128, 141, 152,
        195, 227, 305, 315, 359
    ]


for (let jour = 1; jour <= 365; jour++) {
    const date = new Date(annee, 0);
    date.setDate(jour);
}
}

jourtravaille();





