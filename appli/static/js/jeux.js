$(function() {
  window.onload = refreshEditeurList()
  window.onload = refreshJeuList()

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
                    .append($('<li class="carteJeu"><div class="uk-panel"><div class="uk-card uk-card-default"><div class="uk-card-header"><div class="uk-grid-small" uk-grid=""><div class="uk-width-auto"><img class="imageJeu" src="' + jeux[i].iconeJeu + '"></div>'
                    + '<div class="uk-width-expand uk-text-center"><h3 class="uk-card-title uk-margin-remove-bottom">' + jeux[i].nomJeu + '</h3><p class="uk-margin-remove-top">' + jeux[i].nomEditeur + ', ' + jeux[i].anneeJeu + ', ' + jeux[i].nomGenre + '</p></div></div></div>'
                    + '<div id="card-footer-jeu' + jeux[i].idJeu + '" class="uk-card-footer uk-text-center"><a class="uk-icon-button uk-margin-small-right"  href="#modal-sections-'+ jeux[i].idJeu + '" uk-icon="plus-circle" uk-toggle></a><div id="modal-sections-'+ jeux[i].idJeu +'" uk-modal><div class="uk-modal-dialog"><button class="uk-modal-close-default" type="button" uk-close></button><div class="uk-modal-header"><h2 class="uk-modal-title uk-text-center">' + jeux[i].nomJeu +'</h2></div>'
                    + '<div class="uk-modal-body"><img class="uk-align-center" width="300" height="500"src="' + jeux[i].imageJeu + '"/><p>' + jeux[i].descriptionJeu + '</p></div><div class="uk-modal-footer uk-text-right"><button class="uk-button uk-button-default uk-modal-close" type="button">retour</button></div></div></div>'
                    + '<a href="#modal-media-youtube-' + jeux[i].idJeu + '" class="uk-icon-button  uk-margin-small-right" uk-icon="youtube" uk-toggle></a>'
                    + '<div id="modal-media-youtube-' + jeux[i].idJeu + '" class="uk-flex-top" uk-modal><div class="uk-modal-dialog uk-width-auto uk-margin-auto-vertical"><button class="uk-modal-close-outside" type="button" uk-close></button><iframe width="560" height="315" src="//www.youtube.com/embed/' + jeux[i].urlTrailer + '" frameborder="0" allowfullscreen uk-video></iframe></div></div></div></div></div></li>'))
                    $('#card-footer-jeu' + jeux[i].idJeu)
                    .append($('<a class="uk-icon-button uk-margin-small-right" uk-icon="pencil" id="btn_modif'+ jeux[i].idJeu + '"></a>'))
                    $("#btn_modif" + jeux[i].idJeu).on("click", function() {
                      modifJeu(jeux[i].idJeu)
                    });
                    $('#card-footer-jeu' + jeux[i].idJeu)
                    .append($('<a class="uk-icon-button uk-margin-small-right" uk-icon="trash" id="btn_del' + jeux[i].idJeu + '"></a>'))
                    $("#btn_del" + jeux[i].idJeu).on("click", function() {
                      check=window.confirm("Voulez vous vraiment supprimer ce jeu ?")
                      if(check){
                        delJeu(jeux[i].idJeu);
                      }
                    });
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
                      .append($('<li class="carteEditeur"><div class="uk-panel"><div class="uk-card uk-card-default"><div class="uk-card-header"><div class="uk-grid-small" uk-grid><div class="uk-width-auto"><img id="img" src="' + editeurs[i].logoEditeur + '"></div>'
                    + '<div class="uk-width-expand uk-text-center"><h3 class="uk-card-title uk-margin-remove-bottom">' + editeurs[i].nomEditeur + '</h3><p class="uk-margin-remove-top">' + editeurs[i].anneeCreation +'</p></div></div></div>'
                    + '<div id="card-footer-editeur' + editeurs[i].idEditeur + '"class="uk-card-footer uk-text-center">'
                    + '</div></div></div></div></li>'))
                      $('#card-footer-editeur' + editeurs[i].idEditeur)
                      .append($('<a class="uk-icon-button uk-margin-small-right" uk-icon="pencil" id="btn_modifEd'+ editeurs[i].idEditeur + '"></a>'))
                      $("#btn_modifEd" + editeurs[i].idEditeur).on("click", function() {
                      modifEditeur(editeurs[i].idEditeur)
                      });
                      $('#card-footer-editeur' + editeurs[i].idEditeur)
                      .append($('<a class="uk-icon-button  uk-margin-small-right lien" uk-icon="trash" uk-toggle id="btn_delEd' + editeurs[i].idEditeur + '"></a>'))
                      $("#btn_delEd" + editeurs[i].idEditeur).on("click", function() {
                        check=window.confirm("Voulez vous vraiment supprimer cet éditeur et les jeux qui y sont associés ?")
                        if (check){
                          delEditeur(editeurs[i].idEditeur);
                        }
                        refreshEditeurList();
                      });
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

  $("#tools #addJeu").on("click", formJeu);
  $("#tools #addEditeur").on("click", formEditeur);

  function Jeu(nomJeu, nomGenre, anneeJeu, nomEditeur, descriptionJeu, iconeJeu, imageJeu, urlTrailer){
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
              .append($('<div class="uk-column-1-2">'
               + '<div><label class="uk-form-label uk-label uk-width-1-2 uk-text-center" for="form-horizontal-text">Nom du Jeu</label><div class="uk-form-controls"><input class="uk-input nomJeu"  id="form-horizontal-text" type="text" placeholder="" value=""></div></div>'
               + '<div class="uk-margin-medium"><label class="uk-form-label uk-width-1-2 uk-label uk-text-center" for="form-horizontal-text">Genre du Jeu</label><div class="uk-form-controls"><input class="uk-input nomGenre" id="form-horizontal-text" type="text" placeholder="MOBA, Survie, ...  "></div></div>'
               + '</div>'))
              .append($('<div class="uk-column-1-2">'
               + '<div class="uk-margin-medium"><label class="uk-form-label uk-width-1-2 uk-label uk-text-center" for="form-horizontal-text">Icone du Jeu</label><div class="uk-form-controls"><input class="uk-input iconeJeu" id="form-horizontal-text" type="text" placeholder="Url de l\'icone ..."></div></div>'
               + '<div class="uk-margin-medium"><label class="uk-form-label uk-width-1-2 uk-label uk-text-center" for="form-horizontal-text">Image du Jeu</label><div class="uk-form-controls"><input class="uk-input imageduJeu" id="form-horizontal-text" type="text" placeholder="Url de l\'image ..."></div></div>'
               + '</div>'))
              .append($('<div class="uk-column-1-2">'
               + '<div class="uk-margin-medium"><label class="uk-form-label uk-width-1-2 uk-label uk-text-center" for="form-horizontal-text">Trailer du Jeu</label><div class="uk-form-controls"><input class="uk-input urlTrailer" id="form-horizontal-text" type="text" placeholder="Url du trailer ..."></div></div>'
               + '<div class="uk-margin-medium"><label class="uk-form-label uk-width-1-2 uk-label uk-text-center" for="form-horizontal-text">Description du Jeu</label><div class="uk-form-controls"><input class="uk-input descriptionJeu" id="form-horizontal-text" type="text" placeholder="Description du jeu ..."></div></div>'
               + '</div>'))
              .append($('<div class="uk-column-1-2 uk-margin-bottom">'
               +'<div><label class="uk-form-label uk-width-1-2 uk-label uk-text-center" for="form-horizontal-select">Éditeur du Jeu</label><div class="uk-form-controls"><select class="uk-select nomEditeur" id="form-horizontal-select">' + listeEditeurs  + '</select></div></div>'
               +'<div><label class="uk-form-label uk-width-1-2 uk-label uk-text-center" for="form-horizontal-text">Année de création du Jeu</label><div class="uk-form-controls"><input class="uk-input anneeJeu" id="form-horizontal-text" type="number" value="2019"></div></div>'
               + '</div>'))
              .append($('<input type="button" class="uk-button uk-button-primary" value="Sauvegarder le Jeu"><br>').on("click", saveNewJeu))
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
        $("#currentJeu .imageduJeu").val(),
        getId($("#currentJeu .urlTrailer").val())
      );
      $.ajax({
        url : "http://localhost:5000/jeux",
        type : 'POST',
        contentType : 'application/json',
        data : JSON.stringify(jeu),
        dataType : 'json',
        success: function(msg){
          refreshJeuList()
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
      s}


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
          refreshEditeurList();
          $("#currentEditeur").empty();
        },
        error: function(err){
          alert('Save Error');
          console.log(err)
        }
      });
    }

    function affiche(x) {
      console.log(x);
    }

    function getId(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
        return match[2];
      }  else {
          return 'error';
      }
    }

    function delJeu(id){
      $.ajax({
        url:"http://localhost:5000/jeux/" + id,
        type:'DELETE',
        dataType:'json',
        success:function(msg){
          window.alert("Le jeu a été supprimé ");
          refreshJeuList();
        }
      });
  }

  function delEditeur(id){
    $.ajax({
      url:"http://localhost:5000/editeurs/" + id,
      type:'DELETE',
      dataType:'json',
      success:function(msg){
        window.alert("L'éditeur a été supprimé");
        refreshEditeurList();
        refreshJeuList();
      }
    });
  }


  function modifJeu(idJeu) {
    var listeEditeurs = ''
    $.ajax({
      url: "http://localhost:5000/editeurs",
      type: "GET",
      dataType: "json",
      success: function (editeurs) {
        for (var i = 0; i < editeurs.length; i++) {
          if (editeurs[i].nomEditeur == idJeu.nomEditeur) {
            listeEditeurs += '<option autofocus>' + editeurs[i].nomEditeur + '</option>';
          }
          else {
            listeEditeurs += '<option>' + editeurs[i].nomEditeur + '</option>';
          }
        }
      },
      error: function (req, status, err) {
        console.log("Erreur lors du chargement des editeurs.");
      }
    });

    $.ajax({
      url: "http://localhost:5000/jeux/" + idJeu,
      type: "GET",
      dataType: "json",
      success: function (jeu) {
        $("#currentJeu").empty();
        $("#currentEditeur").empty();
        $("#currentJeu")
          .append($('<div class="container currentJeu uk-margin"><form class="uk-form-horizontal">'))
          .append($('<div class="uk-column-1-2">'
            + '<div><label class="uk-form-label uk-label uk-width-1-2 uk-text-center" for="form-horizontal-text">Nom du Jeu</label><div class="uk-form-controls"><input class="uk-input nomJeuUp"  id="form-horizontal-text" type="text" value="'+ jeu.nomJeu + '"></div></div>'
            + '<div class="uk-margin-medium"><label class="uk-form-label uk-width-1-2 uk-label uk-text-center" for="form-horizontal-text">Genre du Jeu</label><div class="uk-form-controls"><input class="uk-input nomGenreUp" id="form-horizontal-text" type="text" value="' + jeu.nomGenre + '"></div></div>'
            + '</div>'))
          .append($('<div class="uk-column-1-2">'
            + '<div class="uk-margin-medium"><label class="uk-form-label uk-width-1-2 uk-label uk-text-center" for="form-horizontal-text">Icone du Jeu</label><div class="uk-form-controls"><input class="uk-input iconeJeuUp" id="form-horizontal-text" type="text" value="' + jeu.iconeJeu + '"></div></div>'
            + '<div class="uk-margin-medium"><label class="uk-form-label uk-width-1-2 uk-label uk-text-center" for="form-horizontal-text">Image du Jeu</label><div class="uk-form-controls"><input class="uk-input imageduJeuUp" id="form-horizontal-text" type="text" value="' + jeu.imageJeu + '"></div></div>'
            + '</div>'))
          .append($('<div class="uk-column-1-2">'
            + '<div class="uk-margin-medium"><label class="uk-form-label uk-width-1-2 uk-label uk-text-center" for="form-horizontal-text">Trailer du Jeu</label><div class="uk-form-controls"><input class="uk-input urlTrailerUp" id="form-horizontal-text" type="text" value="' + jeu.urlTrailer + '"></div></div>'
            + '<div class="uk-margin-medium"><label class="uk-form-label uk-width-1-2 uk-label uk-text-center" for="form-horizontal-text">Description du Jeu</label><div class="uk-form-controls"><input class="uk-input descriptionJeuUp" id="form-horizontal-text" type="text" value="' + jeu.descriptionJeu + '"></div></div>'
            + '</div>'))
          .append($('<div class="uk-column-1-2 uk-margin-bottom">'
            + '<div><label class="uk-form-label uk-width-1-2 uk-label uk-text-center" for="form-horizontal-select">Éditeur du Jeu</label><div class="uk-form-controls"><select class="uk-select nomEditeurUp" id="form-horizontal-select">' + listeEditeurs + '</select></div></div>'
            + '<div><label class="uk-form-label uk-width-1-2 uk-label uk-text-center" for="form-horizontal-text">Année de création du Jeu</label><div class="uk-form-controls"><input class="uk-input anneeJeuUp" id="form-horizontal-text" type="number" value="' + jeu.anneeJeu + '"></div></div>'
            + '</div>'))
          .append($('<input type="button" class="uk-button uk-button-primary" value="Modifier le Jeu"><br>').on("click", function() {
            updateJeu(jeu.idJeu);
          }))
          .append($('</form></div>'));
      },
      error: function (req, status, err) {
        console.log("Erreur lors du chargement de la modif du jeu.");
      }
    });
  }

  function updateJeu(idJeu) {
    var jeu = new Jeu(
      $("#currentJeu .nomJeuUp").val(),
      $("#currentJeu .nomGenreUp").val(),
      $("#currentJeu .anneeJeuUp").val(),
      $("#currentJeu .nomEditeurUp").val(),
      $("#currentJeu .descriptionJeuUp").val(),
      $("#currentJeu .iconeJeuUp").val(),
      $("#currentJeu .imageduJeuUp").val(),
      getId($("#currentJeu .urlTrailerUp").val())
    );
    $.ajax({
      url: "http://localhost:5000/jeux/" + idJeu,
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify(jeu),
      dataType: 'json',
      success: function (msg) {
        refreshJeuList()
        $("#currentJeu").empty();
        alert('Jeu modifié');
      },
      error: function (err) {
        alert('Erreur');
        console.log(err)
      }
    });
  }


  function modifEditeur(idEditeur) {
    $.ajax({
      url: "http://localhost:5000/editeurs/" + idEditeur,
      type: "GET",
      dataType: "json",
      success: function (editeur) {
        $("#currentEditeur").empty();
        $("#currentJeu").empty();
        $("#currentEditeur")
        .append($('<div class="container currentEditeur uk-margin"><form class="uk-form-horizontal">'))

        .append($('<div><label class="uk-form-label uk-label uk-width-1-4 uk-text-center" for="form-horizontal-text">Nom du éditeur</label><div class="uk-form-controls"><input class="uk-input uk-width-1-2 nomEditeurUp"  id="form-horizontal-text" type="text" placeholder="Riot Games, Epic Games, ..." value="'+editeur.nomEditeur+'"></div></div>'))
        .append($('<div class="uk-margin-medium"><label class="uk-form-label uk-label uk-width-1-4 uk-text-center" for="form-horizontal-text">Année de création</label><div class="uk-form-controls"><input class="uk-input uk-width-1-2 anneeCreationUp" id="form-horizontal-text" type="number" value="'+editeur.anneeCreation+'"></div></div>'))
        .append($('<div class="uk-margin-medium"><label class="uk-form-label uk-label uk-width-1-4 uk-text-center" for="form-horizontal-text">Logo de l\'éditeur</label><div class="uk-form-controls"><input class="uk-input uk-width-1-2 logoEditeurUp" id="form-horizontal-text" type="text" placeholder="URL logo" value="'+editeur.logoEditeur+'"></div></div>'))

        .append($('<span><input type="button" class="uk-button uk-button-primary" value="Modifier l\'éditeur"><br></span>').on("click",function(){
          updateEditeur(editeur.idEditeur);
        } ))
        .append($('</form></div>'));
      },
      error: function (req, status, err) {
        console.log("Erreur lors du chargement de la modif de l'éditeur.");
      }
    });
  }

  function updateEditeur(idEditeur) {
    var editeur = new Editeur(
      $("#currentEditeur .nomEditeurUp").val(),
      $("#currentEditeur .anneeCreationUp").val(),
      $("#currentEditeur .logoEditeurUp").val(),
    );
    $.ajax({
      url: "http://localhost:5000/editeurs/" + idEditeur,
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify(editeur),
      dataType: 'json',
      success: function (msg) {
        refreshEditeurList()
        $("#currentEditeur").empty();
        alert('Editeur modifié');
      },
      error: function (err) {
        alert('Erreur');
        console.log(err)
      }
    });
  }


});
