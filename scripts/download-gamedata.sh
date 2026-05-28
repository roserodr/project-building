#!/bin/bash
set -e

REMOTE="r2"
BUCKET="project-building"
DEST="gamedata"

if [ -d "$DEST" ] && [ "$(ls -A $DEST)" ]; then
  echo "gamedata/ already exists, skipping download."
  exit 0
fi

echo "Downloading game data from R2..."
# Update RCLONE path if needed for your system
RCLONE="rclone"
if ! command -v rclone &> /dev/null; then
  # Common Windows/WinGet install location
  RCLONE="$LOCALAPPDATA/Microsoft/WinGet/Packages/Rclone.Rclone_Microsoft.Winget.Source_8wekyb3d8bbwe/rclone-v1.74.2-windows-amd64/rclone.exe"
fi

"$RCLONE" sync "$REMOTE:$BUCKET" "$DEST"
echo "Done."
