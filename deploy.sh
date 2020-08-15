echo "Compiling application"
ng build --prod --aot
cd dist/nutriconnect
echo "Creating application.zip"
zip -r application.zip *
echo "Uploading application.zip"
curl -s --location --request POST 'https://ciplanutriconnect.in/upload.php' --form 'upload_file=@application.zip'
echo ". Upload Completed"
