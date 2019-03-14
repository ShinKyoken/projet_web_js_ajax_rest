from .app import db

"""
Création de la base de données.
"""

class JEU(db.Model):
    nomJeu         = db.Column(db.String(100), primary_key = True)
    nomGenre       = db.Column(db.String(100))
    anneeJeu       = db.Column(db.Integer)
    nomEditeur     = db.Column(db.String(100), db.ForeignKey("EDITEUR.nomEditeur"))
    descriptionJeu = db.Column(db.String(200))
    iconeJeu       = db.Column(db.String(100))
    imageJeu       = db.Column(db.String(100))
    urlTrailer     = db.Column(db.String(500))

class EDITEUR(db.Model):
    nomEditeur    =  db.Column(db.String(100), primary_key = True)
    anneeCreation =  db.Column(db.Integer)


"""
Les requètes sur la base de données.
"""

def get_Jeu_by_Name(nomJeu):
    return JEU.query.filter_by(nomJeu = nomJeu).one()

def get_All_Jeux_by_Genre(nomGenre):
    return JEU.query.filter_by(idGenre = idGenre).all()

def get_All_Jeux_by_Editeur(nomEditeur):
    return JEU.query.filter_by(nomEditeur).all()

def get_All_Jeux_by_Annee(annee):
    return JEU.query.filter_by(anneeJeu = annee).all()

def get_All_Jeux():
    return JEU.query.all()

def get_All_Editeurs():
    return EDITEUR.query.all()
