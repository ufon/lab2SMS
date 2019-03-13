#!/bin/bash

# android
perl -0777 -i -pe 's/(?mi-s)(private static final int DEFAULT_PORT = 8082;)/ private static final int DEFAULT_PORT = 8083;/g' "./node_modules/realm/android/src/main/java/io/realm/react/RealmReactModule.java"

# ios
perl -0777 -i -pe 's/(?mi-s)(#define WEB_SERVER_PORT 8082)/#define WEB_SERVER_PORT 8083/g' "./node_modules/realm/android/src/main/java/io/realm/react/RealmReactModule.java"