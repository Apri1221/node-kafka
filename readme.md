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

[POST] /test?topic=(required)&proto=(required)
```
curl --location 'http://localhost:3000/test/proto?topic=streaming.transaction.singleEvent&proto=streaming.transaction.singleEvent-id.co.bni.maverick.proto.kafka.TransferBiFast' \
--header 'Content-Type: application/json' \
--header 'Cookie: token=60ab7270009bb239be67e50c87971bec71dccbc72dc49cd96865db29c233b3f4' \
--data '{
    "transactionId": "1231413",
    "expiryTime": "2023-12-12",
    "scenario": "scenario"
}'
```