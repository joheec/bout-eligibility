yarn build:ios
tar -xvzf your-app.tar.gz
Sign your-app.app with iResign
mkdir Payload
mv your-app.app into Payload/
compress Payload and rename
Change exchange from .zip to .ipa

yarn build:android
Print keystore info: expo fetch:android:keystore
Generate Facebook hash: keytool -exportcert -alias <KEY_ALIAS> -keystore <PATH_TO_KEYSTORE> | openssl sha1 -binary | openssl base64
Enter hash: https://developers.facebook.com/docs/facebook-login/android?sdk=fbsdk
Print Facebook hash: expo fetch:android:hashes
Enter hash from Facebook Key Hash to https://developers.facebook.com/docs/facebook-login/android?sdk=fbsdk
