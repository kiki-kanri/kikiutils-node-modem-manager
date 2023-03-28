#!/bin/sh

rm -rf ./lib
npm run build
npm publish
