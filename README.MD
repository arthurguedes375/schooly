# Schooly

## Tokens Keys Generation:
```
ssh-keygen -t rsa -b 4096 -m PEM -f ${filename}.key
openssl rsa -in ${filename}.key -pubout -outform PEM -out ${filename}.key.pub
```