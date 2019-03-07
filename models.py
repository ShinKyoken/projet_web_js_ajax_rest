from .app import db

"""
Création de la base de données.
"""

class JEU(db.Model):
    nomJeu       = db.Column(db.String(100), primary_key = True)
    imageJeu     = db.Column(db.String(100))
    anneeJeu     = db.Column(db.Integer)
    nomGenre      = db.Column(db.Integer)
    nomEditeur    = db.Column(db.String(100), db.ForeignKey("EDITEUR.nomEditeur"))

class EDITEUR(db.Model):
    nomEditeur    =  db.Column(db.String(100), primary_key = True)
    anneeCreation =  db.Column(db.Integer)
    CA            =  db.Column(db.Integer)


"""
Les requètes sur la base de données.
"""

def get_Jeu_by_Name(nomJeu):
    return JEU.query.filter_by(nomJeu = nomJeu).one()

def get_All_Jeu_by_Genre(nomGenre):
    return JEU.query.filter_by(idGenre = idGenre).all()

def get_All_Jeu_by_Editeur(nomEditeur):
    return JEU.query.filter_by(nomEditeur).all()

def get_All_Jeu_by_Annee(annee):
    return JEU.query.filter_by(anneeJeu = annee).all()
