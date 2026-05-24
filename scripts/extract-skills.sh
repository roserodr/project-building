#!/bin/bash
set -e

# For UI elements like skill icons, if we don't have pal.dat we can try letting dc6png use its default palette.
# If we don't specify -p, dc6png defaults to its own ACT1/pal.dat. Wait, it says -p is required in the CLI but maybe we can bypass it if we use the API? Let's write a quick node script.
