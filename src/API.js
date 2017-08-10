import {HTTPS_API_BASE, WS_API_BASE} from './config.js'
import request from 'superagent'
import _ from 'lodash'
import autobahn from 'autobahn'





//creates session promise to store session object
const wsSessionPromise = new Promise((resolve, reject)=>{
    try {
        const connection = new autobahn.Connection({
            url: WS_API_BASE,
            realm: "realm1"
        })
        connection.onopen = function (session) {
            console.log("Websocket connection opened")
            resolve(session)
        }
        connection.onclose = function () {
            console.log("Websocket connection closed")
        }
        connection.open()
    }
    catch (e){
        reject(e)
    }
})



//fetches all symbols from the API synchronously
export function loadSymbols(){
    return new Promise((resolve, reject) => {
        request
            .get(HTTPS_API_BASE)
            .query({command: "returnCurrencies"})
            .end((err, response) => {
                if(err){
                    reject(err)
                } else {
                    const symbols = _.keys(response.body)
                    if(!symbols || !symbols.length){
                        reject("invalid response")
                    } else {
                        resolve(symbols)
                    }
                }
            })
    })
}

var sub1
//subscribes to the ticker func with provided callback
export async function subscribeToTicker(callback){
    const session = await wsSessionPromise
    session.subscribe('ticker', callback).then(
        function (subscription) {
            sub1 = subscription;
        }
    )
    console.log(`subscibed to ticker`)
}

export async function unSubscribeToTicker(callback){
    const session = await wsSessionPromise
    session.unsubscribe(sub1).then(
        function (gone) {
            console.log("successfully unsubscribed")
        },
        function (error) {
            console.log("unsubscribe failed")
        }
    );
}
