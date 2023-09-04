# Node JS Producer Service

### API

[GET] /test?value=(required)&topic=(optional)

```
curl --location 'http://localhost:3000/test?value=apri&topic=test' \
--header 'Cookie: token=60ab7270009bb239be67e50c87971bec71dccbc72dc49cd96865db29c233b3f4' \
--data ''
```

[POST] /test?topic=(optional)

```
curl --location 'http://localhost:3000/test?topic=test' \
--header 'Content-Type: application/json' \
--header 'Cookie: token=60ab7270009bb239be67e50c87971bec71dccbc72dc49cd96865db29c233b3f4' \
--data '{
    "data": "apri"
}'
```