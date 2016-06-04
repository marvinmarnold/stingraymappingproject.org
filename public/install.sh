#!/bin/sh

# This is the StingWatch install script!
# This file was copied from the Meteor template install.meteor.com
#
# Are you looking at this in your web browser, and would like to install Stingwatch?
#
# MAC AND LINUX:
#   Just open up your terminal and type:
#
#     curl https://stingraymappingproject.org/install.sh | sh
#
#   StingWatch currently supports:
#    - Mac: OS X 10.7 and above
#    - Linux: x86 and x86_64 systems
#
# WINDOWS:
# Not supported

# We wrap this whole script in a function, so that we won't execute
# until the entire script is downloaded.
# That's good because it prevents our output overlapping with curl's.
# It also means that we can't run a partially downloaded script.
# We don't indent because it would be really confusing with the heredocs.
run_it () {

# This always does a clean install of the latest version of StingWatch into your
# ~/.stingwatch, replacing whatever is already there. (~/.stingwatch is only a cache of
# packages and package metadata; no personal persistent data is stored there.)

RELEASE="0.0.0.1"

# Now, on to the actual installer!

## NOTE sh NOT bash. This script should be POSIX sh only, since we don't
## know what shell the user has. Debian uses 'dash' for 'sh', for
## example.

PREFIX="/usr/local"

set -e
set -u

# Let's display everything on stderr.
exec 1>&2

echo "Installing StingWatch ${RELEASE}..."

UNAME=$(uname)
# Check to see if it starts with MINGW.
if [ "$UNAME" ">" "MINGW" -a "$UNAME" "<" "MINGX" ] ; then
    echo "Sorry Windows is not currently supported"
    exit 1
fi
if [ "$UNAME" != "Linux" -a "$UNAME" != "Darwin" ] ; then
    echo "Sorry, this OS is not supported yet via this installer."
    echo "For more details on supported platforms, see https://www.meteor.com/install"
    exit 1
fi

if [ "$UNAME" = "Darwin" ] ; then
  ### OSX ###
  if [ "i386" != "$(uname -p)" -o "1" != "$(sysctl -n hw.cpu64bit_capable 2>/dev/null || echo 0)" ] ; then
    # Can't just test uname -m = x86_64, because Snow Leopard can
    # return other values.
    echo "Only 64-bit Intel processors are supported at this time."
    exit 1
  fi

  PLATFORM="os.osx.x86_64"
elif [ "$UNAME" = "Linux" ] ; then
  ### Linux ###
  LINUX_ARCH=$(uname -m)
  if [ "${LINUX_ARCH}" = "i686" ] ; then
    PLATFORM="os.linux.x86_32"
  elif [ "${LINUX_ARCH}" = "x86_64" ] ; then
    PLATFORM="os.linux.x86_64"
  else
    echo "Unusable architecture: ${LINUX_ARCH}"
    echo "StingWatch only supports i686 and x86_64 for now."
    exit 1
  fi
fi

trap "echo Installation failed." EXIT

# If you already have a tropohouse/warehouse, we do a clean install here:
if [ -e "$HOME/.stingwatch" ]; then
  echo "Removing your existing StingWatch installation."
  # Need sudo because NPM modules installed with sudo
  sudo rm -rf "$HOME/.stingwatch"
fi

cd
mkdir .stingwatch
cd .stingwatch

git clone git@github.com:marvinmarnold/stingwatch.git
cd stingwatch

# Install NPM packages
sudo meteor npm install --save react react-addons-pure-render-mixin react-dom react-hammerjs react-router twitter

# Setup location for packages
mkdir packages
cd packages

# Link to Bootstrap
git clone git@github.com:marvinmarnold/bootstrap.git
cd bootstrap
git checkout stingwatch
cd ..

git clone git@github.com:marvinmarnold/cordova-plugin-telephony.git
git clone git@github.com:marvinmarnold/meteor-device-id.git
git clone git@github.com:marvinmarnold/meteor-imsi-catcher-catcher.git
git clone git@github.com:marvinmarnold/meteor-reactive-local-store.git
cd ..

echo "Copy over settings"
cp settings-example.json settings.json

chmod +x stingwatch.sh
echo "Setup complete. Please register with Mapbox and Twitter. Fill in 'settings.json' with keys."
echo "To run 'cd .stingwatch && ./stingwatch'"

trap - EXIT
}

run_it
