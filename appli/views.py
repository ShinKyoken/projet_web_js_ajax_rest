from .app import app
from .models import *
from flask import render_template, redirect, url_for

@app.route("/")
def home():
    """
    Redirige vers l'accueil du site.
    """
    return render_template(
        "jeux.html",
        listeJeux = get_All_Jeux(),
        editeurs = get_All_Editeurs())
