#!/usr/bin/make

SHELL := /bin/bash

BUILD_DIR = "build"

CLOSURE_COMPILER = "${BUILD_DIR}/google-compiler-20100918.jar"

MINJAR ?= java -jar ${CLOSURE_COMPILER}

JS_DIR = javascript
JS_SRC_DIR = ${JS_DIR}/src

RAZOSS_API_BASE_JS_FILES = \
    ${JS_SRC_DIR}/rapi-0.1.js\
    ${JS_SRC_DIR}/razoss_api.js

RAZOSS_API_JS_FILE = ${JS_DIR}/razoss_api.js
RAZOSS_API_MINIFIED_JS_FILE = ${JS_DIR}/razoss_api.min.js

all: ${RAZOSS_API_MINIFIED_JS_FILE}
	@@echo "Razoss dock build complete"

${RAZOSS_API_JS_FILE}: ${RAZOSS_API_BASE_JS_FILES}
	@@echo "Building razoss api (${RAZOSS_API_JS_FILE})"

	@@cat ${RAZOSS_API_BASE_JS_FILES} > ${RAZOSS_API_JS_FILE}

${RAZOSS_API_MINIFIED_JS_FILE}: ${RAZOSS_API_JS_FILE}
	@@echo "Minifying razoss api (${RAZOSS_API_MINIFIED_JS_FILE})"

	@@${MINJAR} --js ${RAZOSS_API_JS_FILE} --warning_level QUIET --js_output_file ${RAZOSS_API_MINIFIED_JS_FILE}.tmp
	@@cat ${RAZOSS_API_MINIFIED_JS_FILE}.tmp >> ${RAZOSS_API_MINIFIED_JS_FILE}
	@@rm -f ${RAZOSS_API_MINIFIED_JS_FILE}.tmp
