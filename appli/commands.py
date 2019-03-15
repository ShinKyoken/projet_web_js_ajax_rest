import click
from .app import app, db

@app.cli.command()
def syncdb():
    db.create_all()
