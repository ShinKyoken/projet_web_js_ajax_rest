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
                    .append($('<li><div class="uk-panel"><div class="uk-card uk-card-default"><div class="uk-card-header"><div class="uk-grid-small" uk-grid=""><div class="uk-width-auto"><img class="imageJeu" src="' + jeux[i].iconeJeu + '"></div>'
                    + '<div class="uk-width-expand uk-text-center"><h3 class="uk-card-title uk-margin-remove-bottom">' + jeux[i].nomJeu + '</h3><p class="uk-margin-remove-top">' + jeux[i].nomEditeur + ', ' + jeux[i].anneeJeu + ', ' + jeux[i].nomGenre + '</p></div></div></div>'
                    + '<div class="uk-card-footer uk-text-center"><a class="uk-icon-button uk-margin-small-right"  href="#modal-sections-'+ jeux[i].idJeu + '" uk-icon="plus-circle" uk-toggle></a><div id="modal-sections-'+ jeux[i].idJeu +'" uk-modal><div class="uk-modal-dialog"><button class="uk-modal-close-default" type="button" uk-close></button><div class="uk-modal-header"><h2 class="uk-modal-title uk-text-center">' + jeux[i].nomJeu +'</h2></div>'
                    + '<div class="uk-modal-body"><img class="uk-align-center" width="300" height="500"src="' + jeux[i].imageJeu + '"/><p>' + jeux[i].descriptionJeu + '</p></div><div class="uk-modal-footer uk-text-right"><button class="uk-button uk-button-default uk-modal-close" type="button">retour</button></div></div></div>'
                    + '<a href="#modal-media-youtube-' + jeux[i].idJeu + '" class="uk-icon-button  uk-margin-small-right" uk-icon="youtube" uk-toggle></a>'
                    + '<a class="uk-icon-button  uk-margin-small-right" uk-icon="pencil" uk-toggle></a>'
                    + '<a class="uk-icon-button  uk-margin-small-right" uk-icon="trash" uk-toggle></a>'
                    + '<div id="modal-media-youtube-' + jeux[i].idJeu + '" class="uk-flex-top" uk-modal><div class="uk-modal-dialog uk-width-auto uk-margin-auto-vertical"><button class="uk-modal-close-outside" type="button" uk-close></button>' + jeux[i].urlTrailer + '</div></div></div></div></div></li>'))
                }
                if (jeux.length == 0){
                  $('#jeux').append($('<b>Aucun jeu à afficher !</b>'))
                }
              },
            error: function(req, status, err) {
              $("#jeux").html("<b>Impossible de récupérer les jeux  !</b>");
            }
          });
        }
        
      window.onload = refreshJeuList()

      function refreshEditeurList(){
      $("#editeurs").empty();
          $.ajax({
              url: "http://localhost:5000/editeurs",
              type: "GET",
              dataType : "json",
              success: function(editeurs) {
                  $('#editeurs').empty();
                  for(let i=0;i<editeurs.length;i++){
                      $('#editeurs')
                      /*.append($('<li><div class="uk-panel"><div class="uk-card uk-card-default"><div class="uk-card-header"><div class="uk-grid-small" uk-grid><div class="uk-width-auto"><img width="80" height="80" src="' + editeurs[i].logoEditeur + '"></div>'
                      + '<div class="uk-width-expand uk-text-center"><h3 class="uk-card-title uk-margin-remove-bottom">' + editeurs[i].nomEditeur + '</h3></div><div><p class="uk-text-meta uk-margin-remove-top">' + editeurs[i].anneeCreation +'</p></div></div>'
                      + '</div><div class="uk-card-footer uk-text-center"></div>'
                      + '<a class="uk-icon-button uk-button  uk-margin-small-right" uk-icon="pencil" uk-toggle></a>'
                      + '<a class="uk-icon-button uk-button uk-margin-small-right" uk-icon="trash" uk-toggle></a></div></div></div></div></li>'))*/
                      .append($('<li><div class="uk-panel"><div class="uk-card uk-card-default"><div class="uk-card-header"><div class="uk-grid-small" uk-grid><div class="uk-width-auto"><img id="img" src="' + editeurs[i].logoEditeur + '"></div>'
                    + '<div class="uk-width-expand uk-text-center"><h3 class="uk-card-title uk-margin-remove-bottom">' + editeurs[i].nomEditeur + '</h3><p class="uk-margin-remove-top">' + editeurs[i].anneeCreation +'</p></div></div></div>'
                    + '<div class="uk-card-footer uk-text-center">'
                    + '<a  class="uk-button  uk-margin-small-right lien" uk-icon="pencil" uk-toggle></a>'
                    + '<a  class="uk-button  uk-margin-small-right lien" uk-icon="trash" uk-toggle></a>'
                    + '</div></div></div></div></li>'))
                  }
                  if (editeurs.length == 0){
                    $('#editeurs').append($('<b>Aucun éditeur à afficher !</b>'))
                  }
                },
              error: function(req, status, err) {
                $("#editeurs").html("<b>Impossible de récupérer les éditeurs !</b>");
              }
            });
          }
      window.onload = refreshEditeurList()
  $("#tools #addJeu").on("click", formJeu);
  $("#tools #addEditeur").on("click", formEditeur);
  $("#tools #details").on("click", fillFormJeu);

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

  function Editeur(nomEditeur, anneeCreation, logoEditeur){
    this.nomEditeur = nomEditeur;
    this.anneeCreation = anneeCreation;
    this.logoEditeur = logoEditeur;
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
          refreshEditeurList();
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
              .append($('<div class="uk-margin-medium"><label class="uk-form-label uk-label uk-width-1-4 uk-text-center" for="form-horizontal-text">Logo de l\'éditeur</label><div class="uk-form-controls"><input class="uk-input uk-width-1-2 logoEditeur" id="form-horizontal-text" type="text" placeholder="URL logo"></div></div>'))

              .append($('<span><input type="button" class="uk-button uk-button-primary" value="Sauvegarder l\'éditeur"><br></span>').on("click", saveNewEditeur))
              .append($('</form></div>'));
    }


    function saveNewEditeur(){
      var editeur = new Editeur(
        $("#currentEditeur .nomEditeur").val(),
        $("#currentEditeur .anneeCreation").val(),
        $("#currentEditeur .logoEditeur").val()
      );
      console.log("ok")
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

    function delTask(){
      if ($("#currentJeu .nomJeu").val()){
          console.log("Suppr");
      }
      $.ajax({
        url:$("#currentJeu .nomJeu").val(),
        type:'DELETE',
        dataType:'json',
        success:function(msg){
          window.alert("La tâche a été supprimée ");
          refreshTaskList();
        }
      })
  }
    function details(event){
        $("#currentJeu").empty();
        formTask();
        fillFormTask(event.data);
        }

    function fillFormJeu(jeu){
      formJeu()
      $("#currentJeu .nomJeu").val(jeu.nomJeu),
      $("#currentJeu .nomGenre").val(jeu.nomGenre),
      $("#currentJeu .anneeJeu").val(jeu.anneeJeu),
      $("#currentJeu .nomEditeur").val(jeu.nomEditeur),
      $("#currentJeu .descriptionJeu").val(jeu.description),
      $("#currentJeu .iconeJeu").val(jeu.iconeJeu),
      $("#currentJeu .imageJeu").val(jeu.imageJeu),
      $("#currentJeu .urlTrailer").val(jeu.urlTrailer)
    }

    function affiche(x) {
      console.log(x);
    }
    function fillDetailsJeu(jeu){
      $('#cardFooter-' + jeu.idJeu)
            .append($('<span><input type="button" class="uk-button uk-button-primary boutonDetails" value="Modifier"><br></span>').on("click",fillFormJeu(jeu)))
    }
});
