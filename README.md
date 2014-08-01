Testmunk documentation
======================

This is Testmunk's documentation, you build it with `sphinx`.

Right now I am copying the built theme into this repo and pushing it.
In the future it might be advisable to set the built theme folder from
the theme repo as a git subtree of this one. If you do that, make sure
to subtree only the built theme instead of the whole theme repo, or it 
will cause problems with Read The Docs.

How to edit
-----------

Clone the repository and edit the `.rst` files. They use a language
called ReStructured Text. Make sure to read the Important Notes section 
in the [Testmunk Theme](https://github.com/testmunk/sphinx_testmunk_theme)
reademe file before editing. Also take into account the current structure 
of the documents, and the symbols that are being used to represent the 
hierarchy of that structure.

How to build
------------

On Terminal, `cd` into a clone of this repository, and run `make clean` to
remove the results of previous builds (important to get an accurate result)
and then `make html` to build a new copy that gets stored in the `_build`
directory.

How to deploy
-------------

As soon as you push the updated version to GitHub, Read The Docs will
automatically download, build, and release the new version, so make sure 
that you push only working versions of the documentation to the master
branch, as they will get released to the public IMMEDIATELY.
