
import app from './app.js';
import { Kafka, logLevel } from "kafkajs";


const clientId = "node-js-svc"
const brokers = ["192.168.244.109:9092"]
const defaultTopic = "streaming.transaction.singleEvent"

const kafka = new Kafka({ 
    clientId, 
    brokers,
    logLevel: logLevel.DEBUG, 
})

const producer = kafka.producer()


const produce = async (value, customTopic = null) => {
	await producer.connect()
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
