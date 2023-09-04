
import app from './app.js';
import { Kafka, logLevel } from "kafkajs";

// https://kafkajs.github.io/confluent-schema-registry/docs/usage
import { SchemaRegistry, SchemaType } from '@kafkajs/confluent-schema-registry'

const registry = new SchemaRegistry({ 
    host: 'http://192.168.244.109:8081',
    retry: {
        maxRetryTimeInSecs: 5,
        initialRetryTimeInSecs: 0.1,
        factor: 0.2,
        multiplier: 2,
        retries: 3,
      },
 })


const clientId = "node-js-svc"
const brokers = ["192.168.244.109:9092"]
const defaultTopic = "streaming.transaction.singleEvent"
const defaultSubject = "streaming.transaction.singleEvent-id.co.bni.maverick.proto.kafka.TransferBiFast"

const kafka = new Kafka({ 
    clientId, 
    brokers,
    // logLevel: logLevel.DEBUG, 
})

const producer = kafka.producer()

const proto = async (value) => {
    try {
        console.log("--- construct PROTO ----")
        const myObject = {
            transactionId: String(Math.floor(Math.random() * 10000) + 1),
            expiryTime: String(Date.now()),
            scenario: String("scenario")
        }
        if (value) {
            myObject = JSON.parse(value);
        }
        
        console.log(myObject);
        const id = await registry.getLatestSchemaId(defaultSubject)
        console.log("ID subject ", id)
        const record = await registry.encode(id, myObject);
        return record;
    }
    catch (err) {
        console.error("could not write proto " + err);
    }
}

const produce = async (value, customTopic = null, customProto = null) => {
	await producer.connect()

    if (customProto) {
        value = await proto(value);
        console.log("proto decode ", await registry.decode(value))
    }
    let topic = customTopic === null ? defaultTopic : customTopic;
    try {
        let id = String(Math.floor(Math.random() * 10000) + 1);
        await producer.send({
            topic,
            messages: [
                {
                    key: id,
                    value: value,
                },
            ],
        })

        console.log("writes: ", value, ", to: ", id);
    } catch (err) {
        console.error("could not write message " + err);
    }
}

app.get('/test', (req, res, next) => {
    let val = req.query.value;
    let topic = req.query.topic;

    produce(String(val), topic).catch((err) => {
        console.error("error in producer: ", err)
    })
    return res.status(200).send(val);
})

app.post('/test', (req, res, next) => {
    let val = req.body;
    let topic = req.query.topic;
    
    produce(JSON.stringify(val), topic).catch((err) => {
        console.error("error in producer: ", err)
    })
    return res.status(200).send(val);
})


app.post('/test/proto', (req, res, next) => {
    let val = req.body;
    let topic = req.query.topic;
    let subject = req.query.proto;
    
    produce(JSON.stringify(val), topic, subject).catch((err) => {
        console.error("error in producer: ", err)
    })
    return res.status(200).send(val);
})