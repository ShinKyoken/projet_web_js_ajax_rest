from flask import Flask, request, jsonify, render_template, redirect, url_for
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import *
from flask_uikit import UIkit
import os

app = Flask(__name__)

basedir = os.path.abspath(os.path.dirname(__file__))

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir,'BD_Jeux.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(app)
ma = Marshmallow(app)
UIkit(app)


class JEU(db.Model):
    idJeu          = db.Column(db.Integer, primary_key = True)
    nomJeu         = db.Column(db.String(100))
    nomGenre       = db.Column(db.String(100))
    anneeJeu       = db.Column(db.Integer)
    nomEditeur     = db.Column(db.String(100), db.ForeignKey("EDITEUR.nomEditeur"))
    descriptionJeu = db.Column(db.String(200))
    iconeJeu       = db.Column(db.String(100))
    imageJeu       = db.Column(db.String(100))
    urlTrailer     = db.Column(db.String(500))

class JeuSchema(ma.Schema):
    class Meta:
        fields = ("idJeu","nomJeu","nomGenre","anneeJeu","nomEditeur","descriptionJeu","iconeJeu","imageJeu","urlTrailer")

jeu_schema = JeuSchema()
jeux_schema = JeuSchema(many = True)


class EDITEUR(db.Model):
    nomEditeur    =  db.Column(db.String(100), primary_key = True)
    idEditeur     =  db.Column(db.Integer, unique = True, autoincrement = True)
    anneeCreation =  db.Column(db.Integer)

class EditeurSchema(ma.Schema):
    class Meta:
        fields = ("nomEditeur","idEditeur","anneeCreation")

editeur_schema = EditeurSchema()
editeurs_schema = EditeurSchema(many = True)

@app.route("/editeurs", methods=["POST"])
def add_editeur():
    nomEditeur    = request.json['nomEditeur']
    anneeCreation = request.json['anneeCreation']

    new_editeur = Editeur(username, email)

    db.session.add(new_editeur)
    db.session.commit()

    return jsonify(new_editeur)

@app.route("/editeurs", methods = ["GET"])
def get_editeur():
    all_editeurs = EDITEUR.query.all()
    result = editeurs_schema.dump(all_editeurs)
    return jsonify(result.data)

@app.route("/editeurs/<idEditeur>", methods = ["GET"])
def editeur_detail(idEditeur):
    editeur = EDITEUR.query.get(idEditeur)
    return editeur_schema.jsonify(editeur)

@app.route("/editeurs/<idEditeur>", methods = ["PUT"])
def editeur_update(idEditeur):
    editeur = EDITEUR.query.get(idEditeur)

    nomEditeur     = request.json['nomEditeur']
    anneeCreation  = request.json['anneeCreation']

    editeur.nomEditeur    = nomEditeur
    editeur.anneeCreation = anneeCreation

    db.session.commit()

    return editeur_schema.jsonify(editeur)

@app.route("/editeurs/<idEditeur>", methods = ["DELETE"])
def editeur_delete(idEditeur):
    editeur = EDITEUR.query.get(idEditeur)

    db.session.delete(editeur)
    db.session.commit()

    return editeur_schema.jsonify(editeur)

@app.route("/jeux", methods=["POST"])
def add_jeu():
    nomJeu         = request.json['nomJeu']
    nomGenre       = request.json['nomGenre']
    anneeJeu       = request.json['anneeJeu']
    nomEditeur     = request.json['nomEditeur']
    descriptionJeu = request.json['descriptionJeu']
    iconeJeu       = request.json['iconeJeu']
    imageJeu       = request.json['imageJeu']
    urlTrailer     = request.json['urlTrailer']


    new_jeu = JEU(
        nomJeu         = nomJeu,
        nomGenre       = nomGenre,
        anneeJeu       = anneeJeu,
        nomEditeur     = nomEditeur,
        descriptionJeu = descriptionJeu,
        iconeJeu       = iconeJeu,
        imageJeu       = imageJeu,
        urlTrailer     = urlTrailer)

    db.session.add(new_jeu)
    db.session.commit()

    return jeu_schema.jsonify(new_jeu)

@app.route("/jeux", methods = ["GET"])
def get_jeu():
    all_jeux = JEU.query.all()
    result = jeux_schema.dump(all_jeux)
    return jsonify(result.data)

@app.route("/jeux/<idJeu>", methods = ["GET"])
def jeu_detail(idJeu):
    jeu = JEU.query.get(idJeu)
    return jeu_schema.jsonify(jeu)

@app.route("/jeux/<idJeu>", methods = ["PUT"])
def jeu_update(idJeu):
    jeu = JEU.query.get(idJeu)

    nomJeu         = request.json['nomJeu']
    nomGenre       = request.json['nomGenre']
    anneeJeu       = request.json['anneeJeu']
    nomEditeur     = request.json['nomEditeur']
    descriptionJeu = request.json['descriptionJeu']
    iconeJeu       = request.json['iconeJeu']
    imageJeu       = request.json['imageJeu']
    urlTrailer     = request.json['urlTrailer']

    jeu.nomJeu         = nomJeu
    jeu.nomGenre       = nomGenre
    jeu.anneeJeu       = anneeJeu
    jeu.nomEditeur     = nomEditeur
    jeu.descriptionJeu = descriptionJeu
    jeu.iconeJeu       = iconeJeu
    jeu.imageJeu       = imageJeu
    jeu.urlTrailer     = urlTrailer

    db.session.commit()

    return jeu_schema.jsonify(jeu)

@app.route("/jeux/<idJeu>", methods = ["DELETE"])
def jeu_delete(idJeu):
    jeu = JEU.query.get(idJeu)

    db.session.delete(jeu)
    db.session.commit()

    return jeu_schema.jsonify(jeu)

@app.route("/")
def home():
    return render_template("jeux.html")


if __name__ == '__main__':
    app.run(debug = True)
