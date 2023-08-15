#!/bin/bash

rm -rf ./lib &&
	npm run build &&
	npm publish
