$(function() {

    function refreshJeuList(){
        $("#jeux").empty();
        $.ajax({
            url: "http://localhost:5000/jeux",
            type: "GET",
            dataType : "json",
            success: function(jeux) {
                $('#jeux').empty();
                for(let i=0;i<jeux.length;i++){
                    $('#jeux')
                    .append($('<div class="uk-width-1-3"><div class="uk-card uk-card-default"><div class="uk-card-header"><div class="uk-grid-small" uk-grid><div class="uk-width-auto"><img width="80" height="80" src="' + jeux[i].iconeJeu + '"></div>'
                    + '<div class="uk-width-expand uk-text-center"><h3 class="uk-card-title uk-margin-remove-bottom">' + jeux[i].nomJeu + '</h3><p class="uk-text-meta uk-margin-remove-top">' + jeux[i].nomEditeur + ', ' + jeux[i].anneeJeu + ', ' + jeux[i].nomGenre + '</p></div></div></div>'
                    + '<div class="uk-card-footer uk-text-center"><a class="uk-icon-button  uk-margin-small-right"  href="#modal-sections-'+ jeux[i].idJeu + '" uk-icon="plus-circle" uk-toggle></a><div id="modal-sections-'+ jeux[i].idJeu +'" uk-modal><div class="uk-modal-dialog"><button class="uk-modal-close-default" type="button" uk-close></button><div class="uk-modal-header"><h2 class="uk-modal-title uk-text-center">' + jeux[i].nomJeu +'</h2></div>'
                    + '<div class="uk-modal-body"><img class="uk-align-center" width="300" height="500"src="' + jeux[i].imageJeu + '"/><p>' + jeux[i].descriptionJeu + '</p></div><div class="uk-modal-footer uk-text-right"><button class="uk-button uk-button-default uk-modal-close" type="button">retour</button></div></div></div>'
                    + '<a href="#modal-media-youtube-' + jeux[i].idJeu + '" class="uk-icon-button  uk-margin-small-right" uk-icon="youtube" uk-toggle></a>'
                    + '<a class="uk-icon-button  uk-margin-small-right" uk-icon="pencil" uk-toggle></a>'
                    + '<a class="uk-icon-button  uk-margin-small-right" uk-icon="trash" uk-toggle></a>'
                    + '<div id="modal-media-youtube-' + jeux[i].idJeu + '" class="uk-flex-top" uk-modal><div class="uk-modal-dialog uk-width-auto uk-margin-auto-vertical"><button class="uk-modal-close-outside" type="button" uk-close></button>' + jeux[i].urlTrailer + '</div></div></div></div></div>'))
                }
                if (jeux.length == 0){
                  $('#jeux').append($('<b>Aucun jeu à afficher !</b>'))
                }
              },
            error: function(req, status, err) {
              $("#jeux").html("<b>Impossible de récupérer les taches à réaliser !</b>");
            }
          });
        }
      window.onload = refreshJeuList()


  $("#tools #addJeu").on("click", formJeu);
  $("#tools #addEditeur").on("click", formEditeur);

  function Jeu(nomJeu, nomGenre, anneeJeu, nomEditeur, descriptionJeu, iconeJeu, imageJeu,   urlTrailer){
      this.nomJeu = nomJeu;
      this.nomGenre = nomGenre;
      this.anneeJeu = anneeJeu;
      this.nomEditeur = nomEditeur;
      this.descriptionJeu = descriptionJeu;
      this.iconeJeu = iconeJeu;
      this.imageJeu = imageJeu;
      this.urlTrailer = urlTrailer;
    }

  function Editeur(nomEditeur, anneeCreation){
    this.nomEditeur = nomEditeur;
    this.anneeCreation = anneeCreation;
  }

    function formJeu(){
      $.ajax({
        url: "http://localhost:5000/editeurs",
        type: "GET",
        dataType : "json",
        success: function(editeurs){
          var listeEditeurs = ''
          for (var i = 0; i < editeurs.length; i++) {
            if (i ==1){
              listeEditeurs += '<option autofocus>' + editeurs[i].nomEditeur + '</option>';
            }
            else{
              listeEditeurs += '<option>' + editeurs[i].nomEditeur + '</option>';
            }
          }
          $("#currentJeu").empty();
          $("#currentEditeur").empty();
          $("#currentJeu")
              .append($('<div class="container currentJeu uk-margin"><form class="uk-form-horizontal">'))
              .append($('<div><label class="uk-form-label uk-label uk-width-1-4 uk-text-center" for="form-horizontal-text">Nom du Jeu</label><div class="uk-form-controls"><input class="uk-input uk-width-1-2 nomJeu"  id="form-horizontal-text" type="text" placeholder="Minecraft, League of Legends, ..."></div></div>'))
              .append($('<div class="uk-margin-medium"><label class="uk-form-label uk-label uk-width-1-4 uk-text-center" for="form-horizontal-text">Genre du Jeu</label><div class="uk-form-controls"><input class="uk-input uk-width-1-2 nomGenre" id="form-horizontal-text" type="text" placeholder="MOBA, Survie, ...  "></div></div>'))
              .append($('<div class="uk-margin-medium"><label class="uk-form-label uk-label uk-width-1-4 uk-text-center" for="form-horizontal-text">Icone du Jeu</label><div class="uk-form-controls"><input class="uk-input uk-width-1-2 iconeJeu" id="form-horizontal-text" type="text" placeholder="Url de l icone ..."></div></div>'))
              .append($('<div class="uk-margin-medium"><label class="uk-form-label uk-label uk-width-1-4 uk-text-center" for="form-horizontal-text">Image du Jeu</label><div class="uk-form-controls"><input class="uk-input uk-width-1-2 imageJeu" id="form-horizontal-text" type="text" placeholder="Url de l image ..."></div></div>'))
              .append($('<div class="uk-margin-medium"><label class="uk-form-label uk-label uk-width-1-4 uk-text-center" for="form-horizontal-text">Trailer du Jeu</label><div class="uk-form-controls"><input class="uk-input uk-width-1-2 urlTrailer" id="form-horizontal-text" type="text" placeholder="Url du trailer ..."></div></div>'))
              .append($('<div class="uk-margin-medium"><label class="uk-form-label uk-label uk-width-1-4 uk-text-center" for="form-horizontal-text">Description du Jeu</label><div class="uk-form-controls"><input class="uk-input uk-width-1-2 descriptionJeu" id="form-horizontal-text" type="text" placeholder="Description du jeu ..."></div></div>'))
              .append($('<div class="uk-margin-medium"><label class="uk-form-label uk-label uk-width-1-4 uk-text-center" for="form-horizontal-select">Éditeur du Jeu</label><div class="uk-form-controls"><select class="uk-select uk-width-1-2 nomEditeur" id="form-horizontal-select">' + listeEditeurs  + '</select></div></div>'))
              .append($('<div class="uk-margin-medium"><label class="uk-form-label uk-label uk-width-1-4 uk-text-center" for="form-horizontal-text">Année de création du Jeu</label><div class="uk-form-controls"><input class="uk-input uk-width-1-2 anneeJeu" id="form-horizontal-text" type="number" value="2019"></div></div>'))
              .append($('<span><input type="button" class="uk-button uk-button-primary" value="Sauvegarder le Jeu"><br></span>').on("click", saveNewJeu))
              .append($('</form></div>'));
        },
        error: function(req, status, err) {
          console.log("Erreur lors du chargement des editeurs.");
        }
      });
    }

    function saveNewJeu(){
      var jeu = new Jeu(
        $("#currentJeu .nomJeu").val(),
        $("#currentJeu .nomGenre").val(),
        $("#currentJeu .anneeJeu").val(),
        $("#currentJeu .nomEditeur").val(),
        $("#currentJeu .descriptionJeu").val(),
        $("#currentJeu .iconeJeu").val(),
        $("#currentJeu .imageJeu").val(),
        $("#currentJeu .urlTrailer").val()
      );
      console.log(JSON.stringify(jeu))
      $.ajax({
        url : "http://localhost:5000/jeux",
        type : 'POST',
        contentType : 'application/json',
        data : JSON.stringify(jeu),
        dataType : 'json',
        success: function(msg){
          refreshJeuList();
          $("#currentJeu").empty();
          alert('Save Success');
        },
        error: function(err){
          alert('Save Error');
          console.log(err)
        }
      });
    }

    function formEditeur(){
          $("#currentEditeur").empty();
          $("#currentJeu").empty();
          $("#currentEditeur")
              .append($('<div class="container currentEditeur uk-margin"><form class="uk-form-horizontal">'))

              .append($('<div><label class="uk-form-label uk-label uk-width-1-4 uk-text-center" for="form-horizontal-text">Nom du éditeur</label><div class="uk-form-controls"><input class="uk-input uk-width-1-2 nomEditeur"  id="form-horizontal-text" type="text" placeholder="Riot Games, Epic Games, ..."></div></div>'))
              .append($('<div class="uk-margin-medium"><label class="uk-form-label uk-label uk-width-1-4 uk-text-center" for="form-horizontal-text">Année de création</label><div class="uk-form-controls"><input class="uk-input uk-width-1-2 anneeCreation" id="form-horizontal-text" type="number" value="2019"></div></div>'))

              .append($('<span><input type="button" class="uk-button uk-button-primary" value="Sauvegarder l\'éditeur"><br></span>').on("click", saveNewEditeur))
              .append($('</form></div>'));
    }


    function saveNewEditeur(){
      var editeur = new Editeur(
        $("#currentEditeur .nomEditeur").val(),
        $("#currentEditeur .anneeCreation").val(),
      );
      console.log(JSON.stringify(editeur))
      $.ajax({
        url : "http://localhost:5000/editeurs",
        type : 'POST',
        contentType : 'application/json',
        data : JSON.stringify(editeur),
        dataType : 'json',
        success: function(msg){
          alert('Save Success');
        },
        error: function(err){
          alert('Save Error');
          console.log(err)
        }
      });
      refreshJeuList();
    }
});
