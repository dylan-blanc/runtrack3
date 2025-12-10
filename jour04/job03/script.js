$(function () {

    const formulaire = [`
        <form>
        <input type="text" id="id" placeholder="ID"/>
        <input type="text" id="nom" placeholder="Nom"/>
        <select id="type" placeholder="deroulant"></select>
        <button type="submit" id="submit">Ajouter un pokémon</button>
        </form>
      `];


    Promise.all([fetch("pokemons.json").then((x) => x.json())]).then(
        ([pokemons]) => {