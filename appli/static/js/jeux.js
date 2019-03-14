$(function() {

  $("#tools #add").on("click", formJeu);

  function Jeu(nomJeu, genreJeu, anneeJeu, editeurJeu, descriptionJeu, iconeJeu, imageJeu,   urlTrailer){
      this.nomJeu = nomJeu;
      this.genreJeu = genreJeu;
      this.anneeJeu = anneeJeu;
      this.editeurJeu = editeurJeu;
      this.descriptionJeu = descriptionJeu;
      this.iconeJeu = iconeJeu;
      this.imageJeu = imageJeu;
      this.urlTrailer = urlTrailer;
      console.log(this.nomJeu);
    }

    function formJeu(){
      var ul = document.getElementById("listeEditeurs");
      var items = ul.getElementsByTagName("li");
      var listeEditeurs = ''
      for (item of items) {
        listeEditeurs += '<option>' + item.textContent + '<option>';
      }
      console.log(listeEditeurs)
      $("#currentJeu").empty();
      $("#currentJeu")
          .append($('<div class="container currentJeu uk-margin"><form class="uk-form-horizontal">'))
          .append($('<div><label class="uk-form-label uk-label uk-width-1-4 uk-text-center" for="form-horizontal-text">Nom du Jeu</label><div class="uk-form-controls"><input class="uk-input uk-width-1-2" id="form-horizontal-text nomJeu" type="text" placeholder="Minecraft, League of Legends, ..."></div></div>'))
          .append($('<div class="uk-margin-medium"><label class="uk-form-label uk-label uk-width-1-4 uk-text-center" for="form-horizontal-text">Genre du Jeu</label><div class="uk-form-controls"><input class="uk-input uk-width-1-2" id="form-horizontal-text genreJeu" type="text" placeholder="MOBA, Survie, ...  "></div></div>'))
          .append($('<div class="uk-margin-medium"><label class="uk-form-label uk-label uk-width-1-4 uk-text-center" for="form-horizontal-text">Icone du Jeu</label><div class="uk-form-controls"><input class="uk-input uk-width-1-2" id="form-horizontal-text iconeJeu" type="text" placeholder="Url de l icone ..."></div></div>'))
          .append($('<div class="uk-margin-medium"><label class="uk-form-label uk-label uk-width-1-4 uk-text-center" for="form-horizontal-text">Image du Jeu</label><div class="uk-form-controls"><input class="uk-input uk-width-1-2" id="form-horizontal-text imageJeu" type="text" placeholder="Url de l image ..."></div></div>'))
          .append($('<div class="uk-margin-medium"><label class="uk-form-label uk-label uk-width-1-4 uk-text-center" for="form-horizontal-text">Trailer du Jeu</label><div class="uk-form-controls"><input class="uk-input uk-width-1-2" id="form-horizontal-text urlTrailer" type="text" placeholder="Url du trailer ..."></div></div>'))
          .append($('<div class="uk-margin-medium"><label class="uk-form-label uk-label uk-width-1-4 uk-text-center" for="form-horizontal-text">Description du Jeu</label><div class="uk-form-controls"><input class="uk-input uk-width-1-2" id="form-horizontal-text descriptionJeu" type="text" placeholder="Description du jeu ..."></div></div>'))
          .append($('<div class="uk-margin-medium"><label class="uk-form-label uk-label uk-width-1-4 uk-text-center" for="form-horizontal-select">Éditeur du Jeu</label><div class="uk-form-controls"><select class="uk-select uk-width-1-2" id="form-horizontal-select editeurJeu">' + listeEditeurs +'</select></div></div>'))
          .append($('<div class="uk-margin-medium"><label class="uk-form-label uk-label uk-width-1-4 uk-text-center" for="form-horizontal-text">Année de création du Jeu</label><div class="uk-form-controls"><input class="uk-input uk-width-1-2" id="form-horizontal-text anneeJeu" type="number" value="2019"></div></div>'))
          .append($('</form></div>'));
    }

    function toString(jeu){
      var jeuString = (jeu.nomJeu, jeu.genreJeu, jeu.anneeJeu, jeu.editeurJeu, jeu.descriptionJeu, jeu.iconeJeu, jeu.imageJeu, jeu.urlTrailer);
    }

    function saveNewJeu(){
      var jeu = new Jeu(
          $("#currentJeu #nomJeu").val(),
          $("#currentJeu #nomGenre").val(),
          $("#currentJeu #anneeJeu").val(),
          $("#currentJeu #editeurJeu").val(),
          $("#currentJeu #descriptionJeu").val(),
          $("#currentJeu #iconeJeu").val(),
          $("#currentJeu #imageJeu").val(),
          $("#currentJeu #urlTrailer").val()
          );
      var jeuString = toString(jeu);
      console.log(jeuString)
      // var sql = "INSERT INTO JEU VALUES " + jeuString;
      // connection.query(sql);
    }

});
