#!/bin/bash
cd /home/kavia/workspace/code-generation/streamview-media-platform-221779-221790/streaming_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

