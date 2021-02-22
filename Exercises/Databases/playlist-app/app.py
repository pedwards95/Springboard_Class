# python -m venv venv
# source venv/Scripts/activate
# pip install pylint
# pip install ipython
# pip install flask
# pip install flask-wtf
# pip install flask_debugtoolbar
# pip install pylint-flask
# pip install psycopg2-binary
# pip install flask-sqlalchemy
# pip install pylint-sqlalchemy
# pip install pylint_flask_sqlalchemy
# pip install sqlalchemy-utils
# pip install python-dotenv
#    then make a .flaskenv in root directory
# pip install email_validator

# pip freeze > requirements.txt

#    flask run
# if app is not named app.py, use :
#    FLASK_APP=app_name.py flask run


from flask import Flask, redirect, render_template
from flask_debugtoolbar import DebugToolbarExtension

from models import db, connect_db, Playlist, Song, PlaylistSong
from forms import NewSongForPlaylistForm, SongForm, PlaylistForm

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///playlist-app'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)
db.create_all()

app.config['SECRET_KEY'] = "I'LL NEVER TELL!!"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

debug = DebugToolbarExtension(app)


@app.route("/")
def root():
    """Homepage: redirect to /playlists."""

    return redirect("/playlists")


##############################################################################
# Playlist routes


@app.route("/playlists")
def show_all_playlists():
    """Return a list of playlists."""

    playlists = Playlist.query.all()
    return render_template("playlists.html", playlists=playlists)


@app.route("/playlists/<int:playlist_id>")
def show_playlist(playlist_id):
    """Show detail on specific playlist."""

    playlist = Playlist.query.get_or_404(playlist_id)

    return render_template("playlist.html",  playlist=playlist)


@app.route("/playlists/add", methods=["GET", "POST"])
def add_playlist():
    """Handle add-playlist form:

    - if form not filled out or invalid: show form
    - if valid: add playlist to SQLA and redirect to list-of-playlists
    """

    form = PlaylistForm()
    if form.validate_on_submit():
        name = form.name.data
        description = form.description.data

        playlist = Playlist(name = name, description = description)
        db.session.add(playlist)
        db.session.commit()

        return redirect("/playlists")

    return render_template("new_playlist.html",  form=form)


##############################################################################
# Song routes


@app.route("/songs")
def show_all_songs():
    """Show list of songs."""

    songs = Song.query.all()
    return render_template("songs.html", songs=songs)


@app.route("/songs/<int:song_id>")
def show_song(song_id):
    """return a specific song"""

    song = Song.query.get_or_404(song_id)

    return render_template("song.html",  song=song)


@app.route("/songs/add", methods=["GET", "POST"])
def add_song():
    """Handle add-song form:

    - if form not filled out or invalid: show form
    - if valid: add playlist to SQLA and redirect to list-of-songs
    """

    form = SongForm()
    if form.validate_on_submit():
        title = form.title.data
        artist = form.artist.data

        song = Song(title = title, artist = artist)
        db.session.add(song)
        db.session.commit()

        return redirect("/songs")

    return render_template("new_song.html",  form=form)


@app.route("/playlists/<int:playlist_id>/add-song", methods=["GET", "POST"])
def add_song_to_playlist(playlist_id):
    """Add a playlist and redirect to list."""

    playlist = Playlist.query.get_or_404(playlist_id)
    form = NewSongForPlaylistForm()

    curr_on_playlist = [s.id for s in playlist.songs]
    form.song.choices = db.session.query(Song.id, Song.title).filter(Song.id.notin_(curr_on_playlist)).all()

    if form.validate_on_submit():

        song = form.song.data

        playListLink = PlaylistSong(playlist_id = playlist_id, song_id = song)
        db.session.add(playListLink)
        db.session.commit()

        return redirect(f"/playlists/{playlist_id}")

    return render_template("add_song_to_playlist.html", playlist=playlist, form=form)